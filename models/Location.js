const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    gmapsID: {
        type: String,
        required: [true, "Please enter a location ID"],
        unique: true
    },
    starRating: {
        type: Number,
        default: 0
    },
    commentsID: [{
        id: String
    }],
    impression: {
        type: String,
        default: "Netral"
    }
})

const Location = mongoose.model("location", locationSchema);

module.exports = Location;