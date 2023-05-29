const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a location name"],
        unique: true,
        lowercase: true,
    },
    gMapsID: {
        type: String,
        required: [true, "Please enter an GMapsID"],
        lowercase: true,
        unique: true
    },
})



const Location = mongoose.model("location", locationSchema);

module.exports = Location;