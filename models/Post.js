const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    locationID: {
        type: String,
        required: [true, "Please enter a location ID"],
        unique: true,
        lowercase: true,
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

const Post = mongoose.model("post", postSchema);

module.exports = Post;