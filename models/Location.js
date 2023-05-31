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
    }
})

const Location = mongoose.model("location", locationSchema);

module.exports = Location;