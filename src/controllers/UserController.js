const { UserModel } = require("../models/UserModel.js");

//log in
const getUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    UserModel.findOne({
        username: username
    }).then((doc) => {
        if (!doc) {
            return res.json({
                Auth: "User not found"
            });
        }
        if (password === doc.password) {
            let options = {
                maxAge: 1000 * 60 * 15,
                httpOnly: true,
            }
            res.cookie('Auth', 'True', options)
            return res.json({
                Auth: "Success",
                user: doc
            });
        } else {
            res.json({
                Auth: "Username or password incorrect"
            });
        }
    });
};

//sign-up
const createUser = async (req, res) => {
    const {
        username,
        password,
        email,
        telegram
    } = req.body;

    const newUser = new UserModel({
        username: username,
        password: password,
        email: email,
        telegram: telegram
    });
    try {
        await newUser.save()

        let options = {
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
        }

        res.cookie('Auth', 'True', options)
        res.json({ Auth: "Success" })
    } catch (error) {
        res.json({ Auth: "Failure" })
    }
};

module.exports = { getUser, createUser }
