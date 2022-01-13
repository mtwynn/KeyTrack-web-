import React, { Fragment } from "react";

import {
  Avatar,
  IconButton,
  CircularProgress,
  Dialog,
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
  loadingDialog: {
    backgroundColor: "transparent",
  },
  loadingDialogPaper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
  },
  colorPrimary: {
    color: "#1ED760",
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      background: "#bcf6d0",
    },
    transition: "background .15s ease-in",
    cursor: "pointer",
  },
}))(TableRow);

let PLLibrary = (props) => {
  const [loadingPlaylist, setLoadingPlaylist] = React.useState(false);
  const [showPlaylist, setShowPlaylist] = React.useState(false);
  const [currPlaylist, setCurrPlaylist] = React.useState(null);
  const [playlistKeys, setPlaylistKeys] = React.useState(null);
  const [playlistName, setPlaylistName] = React.useState("");

  const spotifyWebApi = new Spotify();
  spotifyWebApi.setAccessToken(props.token);

  let handlePlaylistOpen = (playlist) => {
    let numRequests = Math.ceil(playlist.tracks.total / 100);
    let playlistPromises = [];
    let audioFeaturesPromises = [];

    setLoadingPlaylist(true);

    setPlaylistName(playlist.name);

    for (var i = 0; i < numRequests; ++i) {
      playlistPromises.push(
        spotifyWebApi.getPlaylistTracks(playlist.id, { offset: i * 100 })
      );
    }

    Promise.all(playlistPromises).then((results) => {
      let tempArr = [];

      results.forEach((result) => {
        tempArr = tempArr.concat(result.items);

        let playlistItems = result.items;
        let playlistItemIds = [];

        for (var j = 0; j < playlistItems.length; ++j) {
          let id = playlistItems[j].track.id;
          playlistItemIds.push(id);
        }

        audioFeaturesPromises.push(
          spotifyWebApi.getAudioFeaturesForTracks(playlistItemIds)
        );
      });

      Promise.all(audioFeaturesPromises).then((results) => {
        let keysArr = [];

        results.forEach((result) => {
          keysArr = keysArr.concat(result.audio_features);
        });

        setCurrPlaylist(tempArr);
        setPlaylistKeys(keysArr);
        setShowPlaylist(true);
        setLoadingPlaylist(false);
      });
    });
  };

  let handlePlaylistClose = () => {
    setShowPlaylist(false);
  };
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={loadingPlaylist}
        PaperProps={{
          classes: {
            root: classes.loadingDialogPaper,
          },
        }}
      >
        <CircularProgress
          classes={{ colorPrimary: classes.colorPrimary }}
          size={100}
          variant="indeterminate"
          disableShrink
        />
      </Dialog>
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
              <Fragment key={playlist.id}>
                <StyledTableRow
                  key={playlist.id}
                  onClick={() => handlePlaylistOpen(playlist)}
                >
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
                  <StyledTableCell>
                    {playlist.owner.display_name}
                  </StyledTableCell>
                  <StyledTableCell>{playlist.tracks.total}</StyledTableCell>
                </StyledTableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPlaylist ? (
        <Playlist
          open={showPlaylist}
          handlePlaylistOpen={handlePlaylistOpen}
          handlePlaylistClose={handlePlaylistClose}
          playlistName={playlistName}
          playlist={currPlaylist}
          playlistKeys={playlistKeys}
          token={props.token}
        />
      ) : null}
    </>
  );
};
export default PLLibrary;
