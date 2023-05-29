const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        lowercase: true,
        validate: [isEmail, "Email is not valid!"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Minimum password length is 6 characters!"]
    }, 
    comments: {
        type: Number,
        default: 0
    }
})


userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// create static method into user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if (user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        } else {
            throw Error("Password is incorrect!");
        }
    } else {
        throw Error('Username is incorrect!');
    }
};

const User = mongoose.model("user", userSchema);

module.exports = User;