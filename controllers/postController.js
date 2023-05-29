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

const getLocationData = (place_id) => {
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Ctypes%2Cformatted_address%2Ceditorial_summary&key=${process.env.GOOGLE_MAPS_API_KEY}&languages=id`,
      headers: { }
    };

    var photo = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photos&key=${process.env.GOOGLE_MAPS_API_KEY}&languages=id`,
        headers: { }
    };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    // axios(photo)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    // })
    .catch(function (error) {
        console.log(error);
    });
};

getLocationData("ChIJN1t_tDeuEmsRUsoyG83frY4");

module.exports.get_list_location = async (req,res) => {
    Location.find({}).then((postObject) => {
        res.status(200).json(postObject);
    }).catch((err) => res.status(400).json({ error: err.message, status: 400}));
}

module.exports.create_location = async (req,res) => {
    const { gmapsID } = req.body;
    try {
        const location = await Location.create({gmapsID});
        res.status(200).json({ locationID: location._id });
    } catch (err) {
        const message = errorHandler(err);
        res.status(400).json({ error: message });
    }
}

module.exports.create_comment = async (req,res) => {
    const { locationID, userID, starRating, comment } = req.body;
    try {
        await User.findOneAndUpdate({_id:userID}, {$inc : {"comments": 1}});
        const newComment = await Comment.create({userID, starRating, comment});
        const location = await Location.findOneAndUpdate({_id:locationID}, {$push : {"commentsID": newComment._id}});
        res.status(200).json({ locationID: location._id });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}