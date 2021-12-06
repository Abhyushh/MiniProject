exports.getUserId = () => {
    const spotifyApi = require('../spotifyApi').getAPI();

    spotifyApi.getMe()
        .then(function (data) {
            console.log('Some information about the authenticated user', data.body);
            return data.body.id;
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}