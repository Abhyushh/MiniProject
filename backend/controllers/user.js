const User = require("../models/user");
const SpotifyToYoutube = require('spotify-to-youtube');
const YoutubeMusicApi = require('youtube-music-api')

var request = require('request');


const api = new YoutubeMusicApi()
let playlistId;

exports.start = (req, res) => {
    res.redirect('/login');
}

exports.dashboard = (req, res) => {
    res.redirect("http://localhost:3000")
}


// }
exports.postPlaylist = (req, res, next) => {
    const Id = User.getUserId();
    const spotifyApi = require('../spotifyApi').getAPI();
    const spotifyToYoutube = SpotifyToYoutube(spotifyApi)
    api.initalize();
    const pId = req.body.id;
    const playlistName = req.body.name;
    console.log(playlistId);
    console.log(playlistName);
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
            'Authorization': 'Bearer ya29.a0ARrdaM-m_h0-o_B1PPV8U6iUuu3IrbgZJjrsD5qC8_GOavHAscVWquMZAvqGQgNh7IcpAY0O5auxNGFkx9LCWLpeKeNIa0Y1DpWub9rvvf2X9wzYYE8bAFChi34_yhJAvg3bWel0vvDm7jgye9vAHAFkOs6K',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: mydata
    }, function (error, response, body) {
        console.log(response.body.id);
        console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
        playlistId = response.body.id;
        console.log(playlistId);
    });

    spotifyApi.getPlaylistTracks(pId)
        .then(
            async function (song) {
                console.log("SONGSSSSS")
                var songs = song.body.items;
                console.log(songs.length);
                for (var j = 0; j < Number(songs.length); j++) {
                    console.log("hererererere")
                    console.log('The playlist contains these tracks', songs[j].track.id);
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
                            'Authorization': 'Bearer ya29.a0ARrdaM-m_h0-o_B1PPV8U6iUuu3IrbgZJjrsD5qC8_GOavHAscVWquMZAvqGQgNh7IcpAY0O5auxNGFkx9LCWLpeKeNIa0Y1DpWub9rvvf2X9wzYYE8bAFChi34_yhJAvg3bWel0vvDm7jgye9vAHAFkOs6K',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: songData
                    }, function (error, response, body) {
                        console.log(response);
                        console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                    });

                }
                console.log("therereeeeee")
            },
            function (err) {
                console.log('Something went wrong!', err);
            }
        );
}

exports.playlists = async (req, res) => {
    const Id = User.getUserId();
    const spotifyApi = require('../spotifyApi').getAPI();
    const spotifyToYoutube = SpotifyToYoutube(spotifyApi)
    api.initalize();

    spotifyApi.getUserPlaylists(Id)
        .then(function (data) {
            var playlists = data.body.items;
            for (var i = 0; i < 1; i++) {
                console.log("NAME:::::")
                console.log(playlists[i].name)
                var mydata = {
                    'snippet': {
                        "title": playlists[i].name,
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
                        'Authorization': 'Bearer ya29.a0ARrdaM843zq0EWRMpJTtTEuudB0BQAzLECrwNiQ4IydX7J8SL03viiyy9HOngbheVG_0lEORSejk2hoMrOKO6R_WDwm3ksNS2dmoMtq0bqTP_SzaVb76NVvVwquWUBU_wokNoGkvHZSI7XyrJDIL2pD-iPQk',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: mydata
                }, function (error, response, body) {
                    console.log(response.body.id);
                    console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                    playlistId = response.body.id;
                    console.log(playlistId);
                });

                spotifyApi.getPlaylistTracks(playlists[i].id)
                    .then(
                        async function (song) {
                            console.log("SONGSSSSS")
                            var songs = song.body.items;
                            console.log(songs.length);
                            for (var j = 0; j < Number(songs.length); j++) {
                                console.log("hererererere")
                                console.log('The playlist contains these tracks', songs[j].track.id);
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
                                        'Authorization': 'Bearer ya29.a0ARrdaM843zq0EWRMpJTtTEuudB0BQAzLECrwNiQ4IydX7J8SL03viiyy9HOngbheVG_0lEORSejk2hoMrOKO6R_WDwm3ksNS2dmoMtq0bqTP_SzaVb76NVvVwquWUBU_wokNoGkvHZSI7XyrJDIL2pD-iPQk',
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: songData
                                }, function (error, response, body) {
                                    console.log(response);
                                    console.log("{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
                                });

                            }
                            console.log("therereeeeee")
                        },
                        function (err) {
                            console.log('Something went wrong!', err);
                        }
                    );
            }
            res.send("DONE");
        }, function (err) {
            console.log('Something went wrong!', err);
        });
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
