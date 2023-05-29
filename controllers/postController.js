const { json } = require("body-parser");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Location = require("../models/Location");
const jwt = require("jsonwebtoken");
const { error } = require("console");

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
        res.status(400).json({ errors: message });
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
        res.status(400).json({ errors: err.message });
    }
}