const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const dbUri = 'mongodb+srv://akshat:neelon123@miniproject.ljwee.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { post } = require("request");

const app = express();
const PORT = process.env.PORT || 5000;

const spotifyApi = require('./spotifyApi').init();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);

app.listen(PORT, function () {
    console.log("Started");
});