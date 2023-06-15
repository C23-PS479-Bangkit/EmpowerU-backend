const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    gmapsID: {
        type: String,
        required: [true, "Please enter a location ID"],
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique : true
    }
    ,
    starRating: {
        type: Number,
        default: 0
    },
    commentsID: [{
        type: mongoose.Schema.Types.ObjectId, ref: "comment"
    }],
    impression: {
        type: String,
        default: "Netral"
    },
    impressionCount: {
        type: Number,
        default: 0
    }
    ,
    address: {
        type: String,
        required: true
    },
    types: {
        type: String,
        required: true,
        default: "No type"
    },
    urlPhoto : {
        type: String,
        default: "No Photos"
    }
})

const Location = mongoose.model("location", locationSchema);

module.exports = Location;