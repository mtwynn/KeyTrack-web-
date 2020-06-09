import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import Spotify from "spotify-web-api-js";

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
  root: {
    maxWidth: "13rem",
    backgroundColor: "#191414",
    display: "inline-block",
  },
  media: {
    height: "11rem",
    width: "11rem",
  },
  margin: {
    margin: theme.spacing(1),
  },
  center: {
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
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
}));

let CurrentSong = (props) => {
  let [name, setName] = React.useState("Nothing currently playing");
  let [key, setKey] = React.useState("");
  let [bpm, setBpm] = React.useState("");
  let [mode, setMode] = React.useState(-1);
  let [image, setImage] = React.useState("");

  let keyMap = {
    0: "C",
    1: "C#/Db",
    2: "D",
    3: "D#/Eb",
    4: "E",
    5: "F",
    6: "F#/Gb",
    7: "G",
    8: "G#/Ab",
    9: "A",
    10: "A#/Bb",
    11: "B",
  };

  let camelotWheelMap = {};

  const classes = useStyles();
  const spotifyWebApi = new Spotify();
  spotifyWebApi.setAccessToken(props.token);

  const getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
      try {
        spotifyWebApi
          .getAudioAnalysisForTrack(response.item.id)
          .then((response) => {
            console.log(response);
            setBpm(Math.round(response.track.tempo));
            setKey(keyMap[response.track.key]);
            setMode(response.track.mode);
          });
        setName(
          response === "" ? "Nothing currently playing" : response.item.name
        );
        setImage(response === "" ? null : response.item.album.images[0].url);
      } catch (error) {
        if (error instanceof TypeError) {
          setName("Nothing currently playing");
        }
      }
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={image} />

        <CardContent>
          <Typography className={classes.text}>{name}</Typography>
          <Typography variant="h3" className={classes.text}>
            {key}
          </Typography>
          <Typography variant="h5" className={classes.text}>
            {mode !== -1 ? (mode === 1 ? "Major" : "Minor") : ""}
          </Typography>
          <br />
          <Typography variant="h6" className={classes.text}>
            {bpm ? `${bpm} BPM` : null}
          </Typography>
        </CardContent>
        <CardActions className={classes.center}>
          <GreenButton
            variant="contained"
            color="primary"
            onClick={getNowPlaying}
            className={classes.margin}
            disabled={props.token ? false : true}
          >
            Current Song
          </GreenButton>
        </CardActions>
      </Card>
      <div></div>
    </>
  );
};

CurrentSong.propTypes = {
  api: PropTypes.object,
};

export default CurrentSong;
