const User = require("../models/user");

exports.start = (req, res) => {
    res.redirect('/login');
}

exports.dashboard = (req, res) => {
    res.redirect('/playlist');
}

exports.playlists = (req, res) => {
    const Id = User.getUserId();
    const spotifyApi = require('../spotifyApi').getAPI();

    spotifyApi.getUserPlaylists(Id)
        .then(function (data) {
            console.log('Retrieved playlists', data.body);
            res.send(data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}