import React from "react";

import {
  makeStyles,
  withStyles,
  Dialog,
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
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#191414",
  },
  title: {
    flex: 1,
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

  const reducer = (allContributors, artist) => [
    ...allContributors,
    ...artist.name,
  ];

  let items = [
    {
      id: "ff",
      name: "First Time",
      artist: "Seven Lions",
      musical_key: "B Major",
      camelot_key: "1B",
      open_key: "6D",
      bpm: "150",
    },
    {
      id: "dd",
      name: "Potions",
      artist: "Slander",
      musical_key: "Eb Major",
      camelot_key: "5B",
      open_key: "3D",
      bpm: "150",
    },
    {
      id: "ee",
      name: "Alive",
      artist: "Dabin",
      musical_key: "B Major",
      camelot_key: "1B",
      open_key: "6D",
      bpm: "155",
    },
  ];

  return (
    <div>
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
            <IconButton
              edge="end"
              color="inherit"
              onClick={props.handlePlaylistClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Track</StyledTableCell>
              <StyledTableCell>Artist</StyledTableCell>
              <StyledTableCell>Musical Key</StyledTableCell>
              <StyledTableCell>Camelot Key</StyledTableCell>
              <StyledTableCell>Open Key</StyledTableCell>
              <StyledTableCell>BPM</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.playlist.tracks.items.map((item) => (
              <TableRow key={item.track.id}>
                <TableCell>Image</TableCell>
                <TableCell>{item.track.name}</TableCell>
                <TableCell>
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </TableCell>
                <TableCell>1b</TableCell>
                <TableCell>1b</TableCell>
                <TableCell>1b</TableCell>
                <TableCell>1b</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Dialog>
    </div>
  );
};

export default Playlist;
