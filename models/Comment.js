const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, "Please enter a User ID"],
        unique: true
    },
    starRating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;