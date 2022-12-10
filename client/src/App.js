import React from "react";
import "./App.css";

import Spotify from "spotify-web-api-js";
import {
  Button,
  Chip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from "@material-ui/core";

import { Build, Receipt, SettingsApplications } from "@material-ui/icons";
import FadeIn from "react-fade-in";

import changelog from "./changelog.js";
import CurrentSong from "./components/CurrentSong/CurrentSong";
import PLLibrary from "./components/PLLibrary/PLLibrary";
import KeyCalculator from "./utils/KeyCalculator";

import Axios from "axios";

const spotifyWebApi = new Spotify();

let isProduction = process.env.NODE_ENV === "production";

let server = isProduction
  ? "https://key-track2.herokuapp.com/"
  : "http://localhost:8888/";

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
      openChangelog: false,
      showSessionExpiryDialog: false,
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

  componentDidMount() {
    if (this.state.loggedIn) {
      setTimeout(() => {
        this.setState({
          showSessionExpiryDialog: true,
        });
      }, 3600 * 1000);
    }
  }

  getHashParams() {
    let hashParams = {};
    if (isProduction) {
      // For use in production server
      var urlString = window.location.href;
      var url = new URL(urlString);
      var a_token = new URLSearchParams(url.search).get("access_token");
      var r_token = new URLSearchParams(url.search).get("refresh_token");

      document.cookie = `a_token=${a_token}`;
      document.cookie = `r_token=${r_token}`;
      hashParams = { access_token: a_token, refresh_token: r_token };
    } else {
      // For use in local server
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }

      document.cookie = `access_token=${hashParams.access_token}`;
      document.cookie = `refresh_token=${hashParams.refresh_token}`;
    }
    return hashParams;
  }

  async getUserPlaylists() {
    let allPlaylists = [];
    let offset = 50;
    let response = await spotifyWebApi.getUserPlaylists(this.state.user_id, {
      limit: 50,
      offset: 0,
    });
    allPlaylists = response.items;

    let next = response.next;
    while (next !== null) {
      let nextGroup = await spotifyWebApi.getUserPlaylists(this.state.user_id, {
        limit: 50,
        offset: offset,
      });
      allPlaylists = allPlaylists.concat(nextGroup.items);
      next = nextGroup.next;
      offset += 50;
    }

    this.setState({
      showPlaylists: !this.state.showPlaylists,
      pllibrary: allPlaylists,
    });
  }

  openKeyCalculator() {
    this.setState({
      showKeyCalculator: !this.state.showKeyCalculator,
    });
  }

  handleCloseChangelog() {
    this.setState({
      openChangelog: false,
    });
  }

  handleCloseSessionExpiryDialog() {
    this.setState({
      showSessionExpiryDialog: false,
    });
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
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
    });
    window.location = window.location.href.split("/")[0];
  }

  render() {
    return (
      <div className="App m-div">
        <FadeIn transitionDuration={1000}>
          {this.state.loggedIn ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleLogout.bind(this)}
              disabled={!this.state.loggedIn}
            >
              Log Out
            </Button>
          ) : (
            <GreenButton
              variant="contained"
              color="primary"
              style={
                this.state.loggedIn
                  ? { cursor: "none" }
                  : { animation: "float 1s ease-in-out infinite" }
              }
              disabled={this.state.loggedIn}
              onClick={() => {
                if (!this.state.loggedIn) {
                  window.location.href = server;
                }
              }}
            >
              Login with Spotify
            </GreenButton>
          )}

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
            </Grid>

            {this.state.showPlaylists ? (
              <Grid item xs={8}>
                <FadeIn transitionDuration={1000}>
                  <PLLibrary
                    token={this.state.access_token}
                    pllibrary={this.state.pllibrary}
                    userId={this.state.user_id}
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
          {this.state.showPlaylists && (
            <>
              <Chip
                label={"v" + changelog[0].version}
                className="version-label"
              />

              <Chip
                className="changelog"
                style={{ padding: "0.3rem" }}
                icon={<Receipt />}
                label="Changelog"
                onClick={() => {
                  this.setState({
                    openChangelog: true,
                  });
                }}
              />
            </>
          )}
        </FadeIn>

        {!this.state.showPlaylists && (
          <>
            <Chip
              label={"v" + changelog[0].version}
              className="version-label"
            />

            <Chip
              className="changelog"
              style={{ padding: "0.3rem" }}
              icon={<Receipt />}
              label="Changelog"
              onClick={() => {
                this.setState({
                  openChangelog: true,
                });
              }}
            />
          </>
        )}
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.openChangelog}
          onClose={this.handleCloseChangelog.bind(this)}
        >
          <DialogTitle>Changelog</DialogTitle>
          <DialogContent>
            {changelog.map((entry) => {
              return (
                <DialogContentText key={entry.version}>
                  <div>
                    <Typography className="changelog-entry-header" variant="h6">
                      v{entry.version}
                    </Typography>
                    <Typography
                      className="changelog-entry-header"
                      variant="button"
                    >
                      {entry.date}
                    </Typography>
                  </div>
                  <List dense={true}>
                    {entry.changes.map((element) => {
                      return (
                        <ListItem>
                          <ListItemIcon>
                            {element.type === "bugfix" ? (
                              <Build />
                            ) : (
                              <SettingsApplications />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={element.desc} />
                        </ListItem>
                      );
                    })}
                  </List>
                </DialogContentText>
              );
            })}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCloseChangelog.bind(this)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog maxWidth="md" open={this.state.showSessionExpiryDialog}>
          <DialogTitle>Oops!</DialogTitle>
          <DialogContent>
            Your Spotify session has expired. You can refresh your session for
            another hour by logging in again.
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLogout.bind(this)} variant="outlined">
              Logout
            </Button>
            <Button
              onClick={() => {
                window.location.href = server;
              }}
              style={{
                backgroundColor: "#1ED760",
              }}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
