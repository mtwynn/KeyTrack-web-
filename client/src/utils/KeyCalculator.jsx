import React from "react";

import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

let KeyCalculator = (props) => {
  const { onClose, open } = props;
  const [key, setKey] = React.useState("");
  const [camelot, setCamelot] = React.useState("");
  const [openKey, setOpenKey] = React.useState("");

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "key":
        setKey(event.target.value);
        break;
      case "camelot":
        setCamelot(event.target.value);
        break;
      case "open":
    }
  };

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

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Key Calculator</DialogTitle>
      <FormControl variant="outlined" className={classes.formControl}>
        <RadioGroup value="Mode" onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </RadioGroup>
        <InputLabel>Key</InputLabel>
        <Select value={key} name="key" onChange={handleChange} label="Key">
          <MenuItem value={"C"}>C</MenuItem>
          <MenuItem value={"C#/Db"}>C#/Db</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"D#/Eb"}>D#/Eb</MenuItem>
          <MenuItem value={"E"}>E</MenuItem>
          <MenuItem value={"F"}>F</MenuItem>
          <MenuItem value={"F#/Gb"}>F#/Gb</MenuItem>
          <MenuItem value={"G"}>G</MenuItem>
          <MenuItem value={"G#/Ab"}>G#/Ab</MenuItem>
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"A#/Bb"}>A#/Bb</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Camelot</InputLabel>
        <Select
          value={camelot}
          name="camelot"
          onChange={handleChange}
          label="Camelot"
        >
          <MenuItem value={"1A"}>C</MenuItem>
          <MenuItem value={"1B"}>C#/Db</MenuItem>
          <MenuItem value={"2A"}>D</MenuItem>
          <MenuItem value={"2B"}>D#/Eb</MenuItem>
          <MenuItem value={"3A"}>E</MenuItem>
          <MenuItem value={"3B"}>F</MenuItem>
          <MenuItem value={"4A"}>F#/Gb</MenuItem>
          <MenuItem value={"4B"}>G</MenuItem>
          <MenuItem value={"5A"}>G#/Ab</MenuItem>
          <MenuItem value={"5B"}>A</MenuItem>
          <MenuItem value={"6A"}>A#/Bb</MenuItem>
          <MenuItem value={"6B"}>B</MenuItem>
        </Select>
      </FormControl>
    </Dialog>
  );
};

export default KeyCalculator;
