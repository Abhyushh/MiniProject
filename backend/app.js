const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var exec = require('child_process').exec;

require('dotenv').config();

const dbUri = 'mongodb+srv://akshat:neelon123@miniproject.ljwee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const store = new mongodbStore({
    uri: dbUri,
    collection: 'sessions'
});
const PORT = process.env.PORT || 3000;

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

mongoose
    .connect(dbUri)
    .then((result) => {
        app.listen(PORT, function () {
            console.log("Started");
            var cmd = "curl --request POST \"https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyAl072P4hhA0cJXgJnMsITJ_LKtH1KZXXY\" --header \"Authorization: Bearer ya29.a0ARrdaM94X0w3PAjvGW0Kldj9v9efwQ3gtLm8WSAzAZ8TPBdH8LmSfYRaFnW3VddLrJW6Hs-GDma-jw6b9l0NQwr-SZ30FAPl8JR4Sx0VFMqltWlHOLDcmVMi7PZ74yOCvczoaet8CDbJeszeflfAMAT_GFsa\" --header \"Accept: application/json\" --header \"Content-Type: application/json\" --data \"{\"snippet\":{\"playlistId\":\"PLMaKtiWvVa6RUdZHxFss1KTlsToNisnhf\",\"position\":0,\"resourceId\":{\"kind\":\"youtube#video\",\"videoId\":\"LRt6TdSvHag\"}}}\" --compressed";
            child = exec(cmd, function (error, stdout, stderr) {

                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);

                if (error !== null) {
                    console.log('exec error: ' + error);
                }

            });
        });
    })
    .catch(err => {
        console.log('Error')
    });