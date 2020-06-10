import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
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
  let [key, setKey] = React.useState(null);
  let [camelot, setCamelot] = React.useState(null);
  let [openKey, setOpenKey] = React.useState(null);
  let [bpm, setBpm] = React.useState("");
  let [mode, setMode] = React.useState(-1);
  let [image, setImage] = React.useState("");

  let keyMap = {
    0: {
      key: "C",
      camelot: {
        0: "5A",
        1: "8B",
      },
      open: {
        0: "10m",
        1: "1d",
      },
    },
    1: {
      key: "C#/Db",
      camelot: {
        0: "12A",
        1: "3B",
      },
      open: {
        0: "5m",
        1: "8d",
      },
    },
    2: {
      key: "D",
      camelot: {
        0: "7A",
        1: "10B",
      },
      open: {
        0: "12m",
        1: "3d",
      },
    },
    3: {
      key: "D#/Eb",
      camelot: {
        0: "2A",
        1: "5B",
      },
      open: {
        0: "7m",
        1: "10d",
      },
    },
    4: {
      key: "E",
      camelot: {
        0: "9A",
        1: "12B",
      },
      open: {
        0: "2m",
        1: "5d",
      },
    },
    5: {
      key: "F",
      camelot: {
        0: "4A",
        1: "7B",
      },
      open: {
        0: "9m",
        1: "12d",
      },
    },
    6: {
      key: "F#/Gb",
      camelot: {
        0: "11A",
        1: "2B",
      },
      open: {
        0: "4m",
        1: "7d",
      },
    },
    7: {
      key: "G",
      camelot: {
        0: "6A",
        1: "9B",
      },
      open: {
        0: "11m",
        1: "2d",
      },
    },
    8: {
      key: "G#/Ab",
      camelot: {
        0: "1A",
        1: "4B",
      },
      open: {
        0: "6m",
        1: "9d",
      },
    },
    9: {
      key: "A",
      camelot: {
        0: "8A",
        1: "11B",
      },
      open: {
        0: "1m",
        1: "4d",
      },
    },
    10: {
      key: "A#/Bb",
      camelot: {
        0: "3A",
        1: "6B",
      },
      open: {
        0: "8m",
        1: "11d",
      },
    },
    11: {
      key: "B",
      camelot: {
        0: "10A",
        1: "1B",
      },
      open: {
        0: "3m",
        1: "6d",
      },
    },
  };

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
            setKey(keyMap[response.track.key].key);
            setMode(response.track.mode);

            setCamelot(keyMap[response.track.key].camelot[response.track.mode]);
            setOpenKey(keyMap[response.track.key].open[response.track.mode]);
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
          <Grid>
            <Grid item spacing={2} justifyContent="space-between">
              <Typography variant="button" className={classes.text}>
                {camelot ? `C: ${camelot}` : null}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="button" className={classes.text}>
                {openKey ? `O: ${openKey}` : null}
              </Typography>
            </Grid>
          </Grid>
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
