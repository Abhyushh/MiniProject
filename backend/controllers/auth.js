const fileHandling = require('../utils/fileHandling');
const User = require('../models/user');
const queryString = require('querystring');
const request = require('request');

var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var stateKey = 'spotify_auth_state';
var SPOTIFY_FILE_NAME = 'spotify_app_data.txt';
var spotify_client_id = 'be0c50a82d074482896764e825550c95';
var spotify_client_secret = '6f0194cd5f114b4f940307b920ddfaa8'
var spotify_redirect_uri = 'http://localhost:5000/id';

// let auth_token;
let oauth2Client;
var SCOPES = ['https://www.googleapis.com/auth/youtube'];
var TOKEN_DIR = './credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

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
                getToken(res);
            } else {
                res.redirect('/' +
                    queryString.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
}

exports.loginGoogle = (req, res, next) => {
    var val = req.query.code;
    oauth2Client.getToken(val, function (err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        oauth2Client.credentials = token;
        console.log("HERERERERERERERERERERERERERERE")
        console.log(token);
        process.env['AUTH'] = token.access_token;
        // auth_token = token.access_token;
        console.log(process.env.AUTH);
        storeToken(token);
        // callback(oauth2Client);
        console.log("TO DASHBOARDDDD")
        res.redirect('/dashboard');
    });

    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    // rl.question('Enter the code from that page here: ', function (code) {
    //     rl.close();
    //     oauth2Client.getToken(val, function (err, token) {
    //         if (err) {
    //             console.log('Error while trying to retrieve access token', err);
    //             return;
    //         }
    //         oauth2Client.credentials = token;
    //         console.log("HERERERERERERERERERERERERERERE")
    //         console.log(token);
    //         auth_token = token.access_token;
    //         storeToken(token);
    //         callback(oauth2Client);
    //         console.log("TO DASHBOARDDDD")
    //         res.redirect('/dashboard');
    //     });
    // });
}

function getToken(res) {
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the YouTube API.
        console.log(JSON.parse(content));
        authorize(JSON.parse(content), getChannel, res);
    });
}

function authorize(credentials, callback, res) {
    var clientSecret = credentials.web.client_secret;
    var clientId = credentials.web.client_id;
    var redirectUrl = 'http://localhost:5000/callback';
    oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback, res);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client, res);
        }
    });
}

function getNewToken(oauth2Client, callback, res) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    res.redirect(authUrl);
    // rl.question('Enter the code from that page here: ', function (code) {
    //     rl.close();
    //     oauth2Client.getToken(code, function (err, token) {
    //         if (err) {
    //             console.log('Error while trying to retrieve access token', err);
    //             return;
    //         }
    //         oauth2Client.credentials = token;
    //         console.log("HERERERERERERERERERERERERERERE")
    //         console.log(token);
    //         auth_token = token.access_token;
    //         storeToken(token);
    //         callback(oauth2Client);
    //     });
    // });
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    });
}

function getChannel(auth, res) {
    var service = google.youtube('v3');
    service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('No channel found.');
        } else {
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                'it has %s views.',
                channels[0].id,
                channels[0].snippet.title,
                channels[0].statistics.viewCount);
            res.redirect('/dashboard');
        }
    });
}

exports.auth_token = { auth_token: process.env.AUTH };