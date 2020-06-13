import React from "react";
import "./App.css";

import Spotify from "spotify-web-api-js";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import FadeIn from "react-fade-in";

import CurrentSong from "./components/CurrentSong/CurrentSong";
import PLLibrary from "./components/PLLibrary/PLLibrary";
import KeyCalculator from "./utils/KeyCalculator";

import Axios from "axios";

const spotifyWebApi = new Spotify();

let prodServer = "https://keytrack.herokuapp.com/";
let localServer = "http://localhost:8888/";

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
      showPlaylists: false,
      showKeyCalculator: false,
      pllibrary: null,
    };

    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.openKeyCalculator = this.openKeyCalculator.bind(this);

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
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    console.log("Hash Params: ");
    console.log(hashParams);

    document.cookie = `access_token=${hashParams.access_token}`;
    document.cookie = `refresh_token=${hashParams.refresh_token}`;
    return hashParams;

    // For use in production server

    /*
    var urlString = window.location.href;
    var url = new URL(urlString);
    var a_token = new URLSearchParams(url.search).get("access_token");
    var r_token = new URLSearchParams(url.search).get("refresh_token");

    document.cookie = `a_token=${a_token}`;
    document.cookie = `r_token=${r_token}`;
    return { access_token: a_token, refresh_token: r_token };*/
  }

  getUserPlaylists() {
    spotifyWebApi.getUserPlaylists(this.state.user_id).then((response) => {
      console.log(response);
      this.setState({
        showPlaylists: !this.state.showPlaylists,
        pllibrary: response,
      });
    });
  }

  openKeyCalculator() {
    this.setState({
      showKeyCalculator: !this.state.showKeyCalculator,
    });
  }

  render() {
    return (
      <div className="App m-div">
        <FadeIn transitionDuration={1000}>
          <a href={localServer}>
            <GreenButton
              variant="contained"
              color="primary"
              style={
                this.state.loggedIn
                  ? null
                  : { animation: "float 1s ease-in-out infinite" }
              }
            >
              Login with Spotify
            </GreenButton>
          </a>

          <div className="m-div">
            Logged in as: <b>{this.state.user_name}</b>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={this.state.showPlaylists ? 4 : 12}>
              <div className="current-song m-div">
                <CurrentSong token={this.state.access_token} />
              </div>
              <div className="m-div">
                <Button
                  variant="contained"
                  onClick={this.getUserPlaylists}
                  disabled={!this.state.loggedIn}
                >
                  {this.state.showPlaylists
                    ? "Close Playlist Library"
                    : "Open Playlist Library"}
                </Button>
              </div>

              <div className="m-div">
                <Button variant="contained" onClick={this.openKeyCalculator}>
                  Key Calculator
                </Button>
              </div>

              <div className="m-div">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    console.log("logging out");
                    console.log("Cookies: ");
                    alert(document.cookie);
                  }}
                  disabled={!this.state.loggedIn}
                >
                  Log Out
                </Button>
              </div>
            </Grid>

            {this.state.showPlaylists ? (
              <Grid item xs={8}>
                <FadeIn transitionDuration={1000}>
                  <PLLibrary
                    token={this.state.access_token}
                    pllibrary={this.state.pllibrary}
                  />
                </FadeIn>
              </Grid>
            ) : null}
          </Grid>
          {this.state.showKeyCalculator ? (
            <FadeIn transitionDuration={1000}>
              <KeyCalculator
                open={this.state.showKeyCalculator}
                onClose={this.openKeyCalculator}
              />
            </FadeIn>
          ) : null}
          <div className="m-div">
            <Typography variant="overline">Powered by Spotify</Typography>
          </div>
          <div className="m-div">
            <Typography variant="caption">Made by Tam Nguyen</Typography>
          </div>
        </FadeIn>
      </div>
    );
  }
}

export default App;
