const express = require("express")
const path = require('path')
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config();
const { createUser, getUser } = require("./src/controllers/UserController.js")
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
app.use(cors());

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connected!")
    })
    .catch((err) => {
        console.log(err);
    });


app.get("/", (req, res) => {
    res.redirect("/login")
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, './Login.html'))
})

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, './Register.html'))
})

app.get("/home", (req, res) => {
    const { Auth } = req.cookies
    if (Auth) {
        res.sendFile(path.join(__dirname, './Dashboard.html'))
    } else {
        res.redirect("/login")
    }

})

app.get("/topup", (req, res) => {
    const { Auth } = req.cookies
    if (Auth) {
        res.sendFile(path.join(__dirname, './Topup.html'))
    } else {
        res.redirect("/login")
    }
})

app.get("/store", (req, res) => {
    const { Auth } = req.cookies
    if (Auth) {
        res.sendFile(path.join(__dirname, './Store.html'))
    } else {
        res.redirect("/login")
    }
})

app.post("/user/create", createUser);
app.post("/user/get", getUser);

app.listen(3001, () => {
    console.log(`Server Listening on ${PORT}`)
})
