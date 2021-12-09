const User = require("../models/user");
const SpotifyToYoutube = require('spotify-to-youtube');
const YoutubeMusicApi = require('youtube-music-api')


const api = new YoutubeMusicApi()

exports.start = (req, res) => {
    res.redirect('/login');
}

exports.dashboard = (req, res) => {
    res.redirect('/playlist');
}

exports.playlists = async (req, res) => {
    const Id = User.getUserId();
    const spotifyApi = require('../spotifyApi').getAPI();
    const spotifyToYoutube = SpotifyToYoutube(spotifyApi)
    api.initalize();

    spotifyApi.getUserPlaylists(Id)
        .then(function (data) {
            // console.log('Retrieved playlists', data.body);
            var playlists = data.body.items;
            // res.send(data.body);
            for (var i = 0; i < 1; i++) {
                console.log("NAME:::::")
                console.log(playlists[i].name)
                spotifyApi.getPlaylistTracks(playlists[i].id)
                    .then(
                        async function (song) {
                            console.log("SONGSSSSS")
                            var songs = song.body.items;
                            console.log(songs.length);
                            for (var j = 0; j < Number(songs.length); j++) {
                                // console.log(data.body);
                                console.log("hererererere")
                                console.log('The playlist contains these tracks', songs[j].track.id);
                                console.log('The playlist contains these tracks', songs[j].track.name);
                                var track_id = await spotifyToYoutube(songs[j].track.id)
                                

                            }
                            console.log("therereeeeee")
                        },
                        function (err) {
                            console.log('Something went wrong!', err);
                        }
                    );
            }
        }, function (err) {
            console.log('Something went wrong!', err);
        });

    // spotifyApi.getTracks(['3djNBlI7xOggg7pnsOLaNm']).then(function (data) {
    //     console.log("SPOTifyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    //     console.log(data.body);
    // })

    // spotifyApi.getPlaylistTracks('1zoO60ESBlwIBQvy04Svnq')
    //     .then(
    //         function (data) {
    //             console.log("PLAYYYYYLISTSSSSSSSSSSSSSSSSD")
    //             console.log('The playlist contains these tracks', data.body.items[0].track.id);
    //             console.log('The playlist contains these tracks', data.body.items[0].track.name);
    //         },
    //         function (err) {
    //             console.log('Something went wrong!', err);
    //         }
    //     );

    const id = await spotifyToYoutube('3BQHpFgAp4l80e1XslIjNI')
    console.log("U GET THE ID");
    console.log(id);

    api.search(id).then((result) => {
        console.log("RESULT IS HERE YHGFDSGFDGFSFDDDDDDDDD");
        console.log(result);
    })
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

function getPlaylistSongs(params) {

}