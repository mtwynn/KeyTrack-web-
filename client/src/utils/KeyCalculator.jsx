import React from "react";

import { makeStyles, Button, Dialog, DialogTitle } from "@material-ui/core";

let KeyCalculator = (props) => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Key Calculator</DialogTitle>
    </Dialog>
  );
};

export default KeyCalculator;

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
