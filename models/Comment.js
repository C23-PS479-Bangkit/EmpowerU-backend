const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter a User ID"],
        ref: "user"
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

commentSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('location').remove({ commentsID: this._id }, next);
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;