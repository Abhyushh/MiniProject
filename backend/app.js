const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
var exec = require('child_process').exec;

require('dotenv').config();

const dbUri = 'mongodb+srv://akshat:neelon123@miniproject.ljwee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { post } = require("request");

const app = express();
const store = new mongodbStore({
    uri: dbUri,
    collection: 'sessions'
});
const PORT = process.env.PORT || 5000;

const spotifyApi = require('./spotifyApi').init();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(cookieParser());
app.use(
    session({
        secret: 'secret key',
        resave: false,
        saveUninitialized: false,
        store: store
    }));

app.use(authRoutes);
app.use(userRoutes);

app.listen(PORT, function () {
    console.log("Started");
});





    // var mydata = {
    //     'snippet': {
    //         "title": "Sample API",
    //         "description": "playlist description.",
    //         "tags": [
    //             "sample playlist",
    //             "API call"
    //         ],
    //         "defaultLanguage": "en"
    //     },
    //     'status': {
    //         "privacyStatus": "private"
    //     }
    // }
    // request({
    //     url: "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=AIzaSyAl072P4hhA0cJXgJnMsITJ_LKtH1KZXXY",
    //     method: "POST",
    //     json: true,
    //     headers: {
    //         'Authorization': 'Bearer ya29.a0ARrdaM843zq0EWRMpJTtTEuudB0BQAzLECrwNiQ4IydX7J8SL03viiyy9HOngbheVG_0lEORSejk2hoMrOKO6R_WDwm3ksNS2dmoMtq0bqTP_SzaVb76NVvVwquWUBU_wokNoGkvHZSI7XyrJDIL2pD-iPQk',
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: mydata
    // }, function (error, response, body) {
    //     console.log(response);
    // });