const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

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
        });
    })
    .catch(err => {
        console.log('Error')
    });