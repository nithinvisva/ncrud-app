const Users = require('../models/users')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    const foundUser = await Users.findOne({ email })
    if (foundUser) {
        if (bcrypt.compare(password, foundUser.password)) {
            const token = jwt.sign(
                { userId: foundUser._id, email: foundUser.email },
                "secrectKey",
                { expiresIn: "1h" }
            );
            res.send({ message: "loggedIn", data: { userId: foundUser._id, email: foundUser.email, token: token } })
        } else {
            res.status(403).send({ error: "Incorrect Password" })
        }
    } else {
        res.status(403).send({ error: "Incorrect User" })
    }
}
async function auth(req, res, next) {
    var token = req.headers?.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        res.status(200).send({ isloggedIn: false, message: "Error! Token was not provided." });
    } else {
        try {
            const decodedToken = jwt.verify(token, "secrectKey");
            res.status(200).json({
                isloggedIn: true, data: {
                    userId: decodedToken.userId,
                    email: decodedToken.email
                }
            });
        } catch (err) {
            res.status(500).send({message: err})
        }
    }
}


async function register(req, res, next) {
    const salt = await bcrypt.genSalt(10);
    let user = new Users({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    })
    user.save().then((data) => {
        res.send({ success: "Saved Record" })
    })
}

module.exports.login = login
module.exports.register = register
module.exports.auth = auth
