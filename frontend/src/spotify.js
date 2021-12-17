// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "230be2f46909426b8b80cac36446b52a";
const redirectUri = "http://localhost:3000/callback";
const scopes = [
    // "playlist-read-private",
    // "playlist-read-collaborative",
    // "playlist-modify-public",
    // "user-read-recently-played",
    // "playlist-modify-private",
    // "ugc-image-upload",
    // "user-follow-modify",
    // "user-follow-read",
    // "user-library-read",
    // "user-library-modify",
    // "user-read -private",
    // "user-read-email",
    // "user-top-read",
    // "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;
