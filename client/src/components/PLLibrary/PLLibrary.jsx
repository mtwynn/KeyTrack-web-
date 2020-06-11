import React from "react";
import Axios from "axios";

import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  withStyles,
} from "@material-ui/core";

import { MenuOpen } from "@material-ui/icons";

import Spotify from "spotify-web-api-js";

import Playlist from "./Playlist";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#191414",
    color: theme.palette.common.white,
    fontWeight: "bolder",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

let PLLibrary = (props) => {
  const [showPlaylist, setShowPlaylist] = React.useState(false);
  const [currPlaylist, setCurrPlaylist] = React.useState(null);

  const spotifyWebApi = new Spotify();
  spotifyWebApi.setAccessToken(props.token);

  let handlePlaylistOpen = (playlist) => {
    spotifyWebApi.getPlaylist(playlist.id, { offset: 100 }).then((response) => {
      console.log(response);
      setCurrPlaylist(response);
      setShowPlaylist(true);
    });
  };

  let handlePlaylistClose = () => {
    setShowPlaylist(false);
  };
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Cover Art</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Owner</StyledTableCell>
              <StyledTableCell>Number of Tracks</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.pllibrary.items.map((playlist) => (
              <StyledTableRow key={playlist.id}>
                <StyledTableCell>
                  <IconButton onClick={() => handlePlaylistOpen(playlist)}>
                    <MenuOpen />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <Avatar
                    variant="square"
                    src={playlist.images[0].url}
                  ></Avatar>
                </StyledTableCell>
                <StyledTableCell>{playlist.name}</StyledTableCell>
                <StyledTableCell>{playlist.description}</StyledTableCell>
                <StyledTableCell>{playlist.owner.display_name}</StyledTableCell>
                <StyledTableCell>{playlist.tracks.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPlaylist ? (
        <Playlist
          open={showPlaylist}
          handlePlaylistOpen={handlePlaylistOpen}
          handlePlaylistClose={handlePlaylistClose}
          playlist={currPlaylist}
        />
      ) : null}
    </>
  );
};
export default PLLibrary;
