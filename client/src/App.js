import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Spotify from "spotify-web-api-js";
import { Button, Typography, makeStyles, withStyles } from "@material-ui/core";

import CurrentSong from "./components/CurrentSong/CurrentSong";

import Axios from "axios";

const spotifyWebApi = new Spotify();

const GreenButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#1ED760",
    "&:hover": {
      backgroundColor: "#1DB954",
    },
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

class App extends React.Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();

    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "Nothing currently playing",
        image: null,
      },
      user_id: "",
      access_token: "",
      user_name: "",
    };

    this.getUserPlaylists = this.getUserPlaylists.bind(this);

    if (params.access_token) {
      console.log("Access token accepted");
      spotifyWebApi.setAccessToken(params.access_token);

      Axios.get(
        `https://api.spotify.com/v1/me?access_token=${params.access_token}`
      ).then((user) => {
        console.log("User id: " + user.data.id);
        console.log(user);
        this.setState({
          user_id: user.data.id,
          access_token: params.access_token,
          user_name: user.data.display_name,
        });
      });
    }
  }

  getHashParams() {
    /*
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    console.log("Hash Params: ");
    console.log(hashParams);
    return hashParams;*/

    var urlString = window.location.href;
    var url = new URL(urlString);
    var a_token = new URLSearchParams(url.search).get("access_token");
    var r_token = new URLSearchParams(url.search).get("refresh_token");
    return { access_token: a_token, refresh_token: r_token };
  }

  getUserPlaylists() {
    spotifyWebApi.getUserPlaylists(this.state.user_id).then((response) => {
      console.log("Playlists: ");
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <a href="https://keytrack.herokuapp.com/">
          <GreenButton variant="contained" color="primary">
            Login with Spotify
          </GreenButton>
        </a>

        <div>
          Logged in as: <b>{this.state.user_name}</b>
        </div>
        <div className="current-song">
          <CurrentSong token={this.state.access_token} />
        </div>
        <div>
          <Button variant="contained" onClick={this.getUserPlaylists}>
            List All Playlists
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const url = "https://www.spotify.com/logout/";
              const spotifyLogoutWindow = window.open(
                url,
                "Spotify Logout",
                "width=700,height=500,top=40,left=40"
              );
              setTimeout(() => spotifyLogoutWindow.close(), 2000);
            }}
          >
            Log Out
          </Button>
        </div>
        <div>
          <Typography variant="overline">Powered by Spotify</Typography>
        </div>
        <div>
          <Typography variant="caption">Made by Tam Nguyen</Typography>
        </div>
      </div>
    );
  }
}

export default App;
