const { json } = require("body-parser");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { error } = require("console");

const errorHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email:"",
        password: ""
    }

    if (err.message === "Email is incorrect!") {
        errors.email = "Email not registered!"
    }

    if (err.message === "Password is incorrect!") {
        errors.password = "Password is invalid!"
    }

    if (err.code == 11000){
        errors.email = "Email is already exist!";
        return errors;
    }

    if (err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};

const maxAge = 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "akbar secret", {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req,res) => {
    res.render('signup');
};
module.exports.login_get = (req,res) => {
    res.render('login');
};
module.exports.signup_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    } catch (err) {
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
    // res.send('signup');
};
module.exports.login_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge : maxAge * 1000});
        res.status(200).json({user: user._id});
    } catch (error) {
        const errors = errorHandler(error);
        res.status(400).json({errors});
    }
};

module.exports.logout_get = (req,res) => {
    res.cookie('jwt', "", {maxAge: 1});
    res.redirect("/login");
}