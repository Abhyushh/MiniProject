const express = require("express");
const { exec } = require('child_process');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

const spotifyApi = require('./spotifyApi').init();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(cookieParser());

app.use(authRoutes);
app.use(userRoutes);

app.listen(PORT, function () {
    console.log("Started");
});