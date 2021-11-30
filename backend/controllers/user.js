exports.dashboard = (req, res) => {
    res.redirect('/login');
}

exports.playlists = (req, res) => {
    const spotifyApi = require('../spotifyApi').getAPI();

    spotifyApi.getUserPlaylists('neshtek')
        .then(function (data) {
            console.log('Retrieved playlists', data.body);
            res.send(data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}