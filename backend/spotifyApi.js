let SpotifyWebApi;
let spotifyApi;
var spotify_client_id = 'be0c50a82d074482896764e825550c95';
var spotify_client_secret = '6f0194cd5f114b4f940307b920ddfaa8'
var spotify_redirect_uri = 'http://localhost:5000/id';

module.exports = {
    init: () => {
        SpotifyWebApi = require('spotify-web-api-node');

        spotifyApi = new SpotifyWebApi({
            clientId: spotify_client_id,
            clientSecret: spotify_client_secret,
            redirectUri: spotify_redirect_uri
        });
        return spotifyApi;
    },
    getAPI: () => {
        if (!spotifyApi) {
            throw new Error('Not initialized!')
        }
        return spotifyApi;
    }
}