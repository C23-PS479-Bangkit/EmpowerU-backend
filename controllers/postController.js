const { json } = require("body-parser");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Location = require("../models/Location");
var axios = require('axios');
require('dotenv').config();

const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {
        location: "",
    }

    if (err.code == 11000) {
        errors.location = "Location is already exist!";
        return errors;
    }

    return errors;
};

const getLocationData = async (place_id) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Ctypes%2Cformatted_address%2Ceditorial_summary%2Cphotos&key=${process.env.GOOGLE_MAPS_API_KEY}&languages=id`,
        headers: {}
    };

    return await axios(config)
        .then(function (response) {
            const { result } = response.data;
            // console.log(result);
            return result;
        });
};

// create static method into location
const countRating = async function (location) {
    let totalRating = 0;
    const GMapsID = location.gmapsID;
    const listComment = location.commentsID;
    for (let i = 0; i < listComment.length; i++) {
        const comment = await Comment.findById(listComment[i]._id);
        if (comment == null) {
            await Location.findOneAndUpdate({ _id: location._id }, { $pull: { commentsID: listComment[i]._id } });
            continue;
        }
        totalRating += comment.starRating;
    }
    const result = totalRating / listComment.length;
    if (listComment.length == 0) {
        await Location.findOneAndUpdate({ "gmapsID": GMapsID }, { starRating: 0 });
        return 0;
    }
    await Location.findOneAndUpdate({ "gmapsID": GMapsID }, { starRating: result });
    return result;
};

module.exports.get_list_location = async (req, res) => {
    try {
        let listLocation = [];
        var myCursor = await Location.find({});
        for (let i = 0; i < myCursor.length; i++) {
            countRating(myCursor[i]);
            const { starRating, impression, address, name, types, urlPhoto } = await Location.findOne({ gmapsID: myCursor[i].gmapsID })
            listLocation.push({
                address: address,
                name: name,
                type: types,
                rating: starRating,
                GMapsID: myCursor[i].gmapsID,
                impression: impression,
                urlPhoto: urlPhoto
            });
        }
        res.status(200).json({ status: 200, listLocation: listLocation });
    } catch (err) {
        if (err.code == null) {
            res.status(400).json({ error: "No location data found!" })
        } else {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports.create_location = async (req, res) => {
    const { GMapsID } = req.body;
    try {
        const { name, formatted_address, types, photos } = await getLocationData(GMapsID);
        let urlString = "No Photos";
        if (photos != null) {
            urlString = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photos[0].photo_reference}&key=INSERT_GMAPS_API_KEY`;
        }
        console.log(formatted_address)
        const location = await Location.create({ gmapsID: GMapsID, name: name, address: formatted_address, types: types[0], urlPhoto: urlString });
        res.status(200).json({ locationID: location._id });
    } catch (err) {
        const message = errorHandler(err);
        if (err.code == null) {
            res.status(400).json({ error: "No location data found with corellated GMapsID/Service is unavailable" })
        } else {
            res.status(400).json({ error: message });
        }
    }
}

module.exports.get_location = async (req, res) => {
    const GMapsID = req.query.GMapsID;
    try {
        const locationObject = await Location.findOne({ "gmapsID": GMapsID });
        countRating(locationObject);
        res.status(200).json({ address: locationObject.address, name: locationObject.name, type: locationObject.types, rating: locationObject.starRating, impression: locationObject.impression });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.create_comment = async (req, res) => {
    const { GMapsID, userID, starRating, comment } = req.body;
    try {
        const userUpdate = await User.findOneAndUpdate({ _id: userID }, { $inc: { "comments": 1 } });
        const newComment = await Comment.create({ userID: userUpdate._id, username: userUpdate.username, starRating: starRating, comment: comment });
        const location = await Location.findOneAndUpdate({ gmapsID: GMapsID }, { $push: { "commentsID": newComment._id } });
        res.status(200).json({ GMapsID: location.gmapsID });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}


module.exports.get_list_comment = async (req, res) => {
    const GMapsID = req.query.GMapsID;
    try {
        const locationObject = await Location.findOne({ "gmapsID": GMapsID });
        const result = await Comment.find({ "_id": { $in: locationObject.commentsID } }, { _id: 0, __v: 0, userID: 0 });
        res.status(200).json({ result });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
};


