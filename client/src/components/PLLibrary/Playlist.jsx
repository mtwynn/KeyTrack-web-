import React from "react";

import {
  makeStyles,
  withStyles,
  Avatar,
  Dialog,
  Input,
  InputAdornment,
  FormControl,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import { Close, Search } from "@material-ui/icons";
import Spotify from "spotify-web-api-js";

import KeyMap from "../../utils/KeyMap";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#191414",
  },
  title: {
    flex: 0,
  },
  search: {
    flex: 1,
    color: "white",
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    borderWidth: "10px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1ED760",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

let Playlist = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const [search, setSearch] = React.useState("");
  const allItems = props.playlist.tracks.items;

  let [searchItems, setSearchItems] = React.useState(allItems);

  let handleChange = (event) => {
    event.persist();
    setSearch(event.target.value);

    setSearchItems((searchItems) =>
      allItems.filter((item) => {
        return String(item.track.name).includes(event.target.value);
      })
    );
  };

  const spotifyWebApi = new Spotify();
  spotifyWebApi.setAccessToken(props.token);

  let getKey = (id) => {
    if (id) {
      let result = props.playlistKeys.audio_features.find((track) => {
        if (track !== null) {
          return id.localeCompare(track.id) === 0;
        }
        return null;
      });

      if (result) {
        let returnObj = {
          key: result.key,
          mode: result.mode,
          bpm: result.tempo,
        };
        return returnObj;
      } else {
        return "No Key";
      }
    }
  };

  return (
    <div className="m-div">
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handlePlaylistClose}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {props.playlist.name}
            </Typography>
            <Input
              classes={{
                root: classes.search,
                focused: classes.inputFocused,
              }}
              type={"text"}
              value={search}
              onChange={handleChange}
              placeholder="Search"
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
            <FormControl>
              <IconButton
                edge="end"
                color="inherit"
                onClick={props.handlePlaylistClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </FormControl>
          </Toolbar>
        </AppBar>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Track</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Musical Key</StyledTableCell>
              <StyledTableCell>Quality</StyledTableCell>
              <StyledTableCell>Camelot Key</StyledTableCell>
              <StyledTableCell>Open Key</StyledTableCell>
              <StyledTableCell>BPM</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchItems.map((item) => (
              <TableRow key={item.track.id}>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={
                      item.track.album.images[0]
                        ? item.track.album.images[0].url
                        : null
                    }
                  ></Avatar>
                </TableCell>
                <TableCell>{item.track.name}</TableCell>
                <TableCell>
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </TableCell>
                <TableCell>
                  {getKey(item.track.id) || getKey(item.track.id) === 0
                    ? KeyMap[getKey(item.track.id).key].key
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {getKey(item.track.id) || getKey(item.track.id) === 0
                    ? getKey(item.track.id).mode === 1
                      ? "Major"
                      : "Minor"
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {getKey(item.track.id) || getKey(item.track.id) === 0
                    ? KeyMap[getKey(item.track.id).key].camelot[
                        getKey(item.track.id).mode
                      ]
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {getKey(item.track.id) || getKey(item.track.id) === 0
                    ? KeyMap[getKey(item.track.id).key].open[
                        getKey(item.track.id).mode
                      ]
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {getKey(item.track.id) || getKey(item.track.id) === 0
                    ? Math.round(getKey(item.track.id).bpm)
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
};

export default Playlist;
