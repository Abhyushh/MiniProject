const fileHandling = require('../utils/fileHandling');
const User = require('../models/user');
const queryString = require('querystring');
const request = require('request');

var stateKey = 'spotify_auth_state';
var SPOTIFY_FILE_NAME = 'spotify_app_data.txt';
var spotify_client_id = 'be0c50a82d074482896764e825550c95';
var spotify_client_secret = '6f0194cd5f114b4f940307b920ddfaa8'
var spotify_redirect_uri = 'http://localhost:5000/id';

exports.getLogin = (req, res, next) => {
    console.log("Attempting to log in");

    var state = fileHandling.generateRandomString(16);
    res.cookie(stateKey, state);

    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: spotify_client_id,
            scope: scope,
            redirect_uri: spotify_redirect_uri,
            state: state,
            show_dialog: true
        }));
}

exports.getAccessToken = (req, res, next) => {
    console.log("RUNNINGGGGG")
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    const spotifyApi = require('../spotifyApi').getAPI();

    if (state == null || state != storedState) {
        res.redirect('/#' +
            queryString.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: spotify_redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token;
                var refresh_token = body.refresh_token;

                fileHandling.clearFile(SPOTIFY_FILE_NAME);
                fileHandling.saveToFile(SPOTIFY_FILE_NAME, 'access_token', access_token);

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                request.get(options, function (error, response, body) {
                    console.log(body);
                    fileHandling.saveToFile(SPOTIFY_FILE_NAME, 'user_id', body.id);
                });

                console.log("Logged In Successfully");
                spotifyApi.setAccessToken(access_token);
                console.log("DONEEEEEEE_______________________HEERERERERERERERERER")
                res.redirect('/dashboard');
            } else {
                res.redirect('/' +
                    queryString.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
}