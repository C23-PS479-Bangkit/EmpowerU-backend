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
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Ctypes%2Cformatted_address%2Ceditorial_summary&key=${process.env.GOOGLE_MAPS_API_KEY}&languages=id`,
        headers: {}
    };

    var photo = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photos&key=${process.env.GOOGLE_MAPS_API_KEY}&languages=id`,
        headers: {}
    };

    return await axios(config)
        .then(function (response) {
            const { result } = response.data;
            return result;
        });
};

module.exports.get_list_location = async (req, res) => {
    try {
        let listLocation = [];
        var myCursor = await Location.find({});
        for (let i = 0; i < myCursor.length; i++) {
            const result = await getLocationData(myCursor[i].gmapsID);
            const { formatted_address, name, types } = result;
            listLocation.push({
                address: formatted_address,
                name: name,
                type: types,
                GMapsID: myCursor[i].gmapsID
            });
        }
        res.status(200).json({ status: 200, listLocation: listLocation });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.create_location = async (req, res) => {
    const { gmapsID } = req.body;
    try {
        const location = await Location.create({ gmapsID });
        res.status(200).json({ locationID: location._id });
    } catch (err) {
        const message = errorHandler(err);
        res.status(400).json({ error: message });
    }
}

module.exports.create_comment = async (req, res) => {
    const { locationID, userID, starRating, comment } = req.body;
    try {
        await User.findOneAndUpdate({ _id: userID }, { $inc: { "comments": 1 } });
        const newComment = await Comment.create({ userID, starRating, comment });
        const location = await Location.findOneAndUpdate({ _id: locationID }, { $push: { "commentsID": newComment._id } });
        res.status(200).json({ GMapsID: location.gmapsID });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}

module.exports.get_location = async (req, res) => {
    const  GMapsID  = req.query.GMapsID;
    try {
        const location = await getLocationData(GMapsID);
        const { formatted_address, name, types } = location;
        res.status(200).json({ address: formatted_address, name: name, type: types });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}

