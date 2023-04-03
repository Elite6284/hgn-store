const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telegram: String
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = { UserModel }
