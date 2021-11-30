import React, { Component } from "react";

import SideBar from "./Component/Navbar/Sidebar";
import Footer from "./Component/Footer/footer";
import "./App.css";

class App extends Component {
  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=52f840191bd94b479159c11b8a64cada&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    } else {

    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <SideBar />
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
export default App;