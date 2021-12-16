const User = require("../models/user");
const SpotifyToYoutube = require('spotify-to-youtube');
const YoutubeMusicApi = require('youtube-music-api')

var fs = require('fs');

var request = require('request');

var auth_token = '';
const api = new YoutubeMusicApi()
let playlistId;

function getToken() {
    fs.readFile('../credentials/youtube-nodejs-quickstart.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the YouTube API.
        console.log(content.access_token);
        auth_token = content.access_token;
    });
}

exports.start = (req, res) => {
    res.redirect('/login');
}

exports.dashboard = (req, res) => {
    res.redirect("http://localhost:3000")
}


// }
exports.postPlaylist = (req, res, next) => {
    console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    getToken();
    const Id = User.getUserId();
    const spotifyApi = require('../spotifyApi').getAPI();
    const spotifyToYoutube = SpotifyToYoutube(spotifyApi)
    api.initalize();
    const pId = req.body.id;
    const playlistName = req.body.name;
    // console.log(playlistId);
    console.log("NAME:::::")
    console.log(playlistName)
    var mydata = {
        'snippet': {
            "title": playlistName,
            "description": "playlist description.",
            "tags": [
                "sample playlist",
                "API call"
            ],
            "defaultLanguage": "en"
        },
        'status': {
            "privacyStatus": "private"
        }
    }
    request({
        url: "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=AIzaSyAl072P4hhA0cJXgJnMsITJ_LKtH1KZXXY",
        method: "POST",
        json: true,
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: mydata
    }, function (error, response, body) {
        // console.log(response.body.id);
        // console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
        playlistId = response.body.id;
        // console.log(playlistId);
    });

    spotifyApi.getPlaylistTracks(pId)
        .then(
            async function (song) {
                console.log("SONGSSSSS")
                var songs = song.body.items;
                // console.log(songs.length);
                for (var j = 0; j < Number(songs.length); j++) {
                    console.log("hererererere")
                    // console.log('The playlist contains these tracks', songs[j].track.id);
                    console.log('The playlist contains these tracks', songs[j].track.name);
                    var track_id = await spotifyToYoutube(songs[j].track.id)

                    var songData = {
                        "snippet": {
                            "playlistId": playlistId,
                            "position": 0,
                            "resourceId": {
                                "kind": "youtube#video",
                                "videoId": track_id
                            }
                        }
                    }

                    request({
                        url: "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyAl072P4hhA0cJXgJnMsITJ_LKtH1KZXXY",
                        method: "POST",
                        json: true,
                        headers: {
                            'Authorization': `Bearer ${auth_token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: songData
                    }, function (error, response, body) {
                        // console.log(response);
                        // console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                    });

                }
                console.log("therereeeeee")
            },
            function (err) {
                console.log('Something went wrong!', err);
            }
        );
}

exports.search = async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query;
        const url = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;

        const response = await axios.get(url);
        const titles = response.data.items.map((item) => item.snippet.title);

        res.send(titles);
    } catch (err) {
        next(err);
    }

}