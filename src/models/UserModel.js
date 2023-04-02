const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    telegram: String
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = { UserModel }