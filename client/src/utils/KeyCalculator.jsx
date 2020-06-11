import React from "react";

import {
  makeStyles,
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Grid,
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
  radioControl: {
    marginLeft: theme.spacing(1),
  },
  radio: {
    "&$checked": {
      color: "#1ED760",
    },
  },
  checked: {},
}));

let KeyCalculator = (props) => {
  const { onClose, open } = props;
  const [key, setKey] = React.useState(0);
  const [mode, setMode] = React.useState("major");
  const [camelot, setCamelot] = React.useState(0);
  const [openKey, setOpenKey] = React.useState(0);

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    if (event.target.name === "mode") {
      setMode(event.target.value);
    } else {
      setKey(event.target.value);
      setCamelot(event.target.value);
      setOpenKey(event.target.value);
    }
  };

  let keyMap = [
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
  ];

  let musicalKeys = keyMap.map((key, index) => (
    <MenuItem value={index}>{key.key}</MenuItem>
  ));

  let minorCamelot = keyMap
    .map((key, index) => <MenuItem value={index}>{key.camelot[0]}</MenuItem>)
    .sort(function (a, b) {
      if (a.props.children.length > b.props.children.length) return 1;
      if (a.props.children.length < b.props.children.length) return -1;
      return a.props.children.localeCompare(b.props.children);
    });

  let majorCamelot = keyMap
    .map((key, index) => <MenuItem value={index}>{key.camelot[1]}</MenuItem>)
    .sort(function (a, b) {
      if (a.props.children.length > b.props.children.length) return 1;
      if (a.props.children.length < b.props.children.length) return -1;
      return a.props.children.localeCompare(b.props.children);
    });

  let minorOpen = keyMap
    .map((key, index) => <MenuItem value={index}>{key.open[0]}</MenuItem>)
    .sort(function (a, b) {
      if (a.props.children.length > b.props.children.length) return 1;
      if (a.props.children.length < b.props.children.length) return -1;
      return a.props.children.localeCompare(b.props.children);
    });

  let majorOpen = keyMap
    .map((key, index) => <MenuItem value={index}>{key.open[1]}</MenuItem>)
    .sort(function (a, b) {
      if (a.props.children.length > b.props.children.length) return 1;
      if (a.props.children.length < b.props.children.length) return -1;
      return a.props.children.localeCompare(b.props.children);
    });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Key Calculator</DialogTitle>
      <Grid container spacing={2}>
        <Grid item>
          <RadioGroup
            className={classes.radioControl}
            value={mode}
            name="mode"
            onChange={handleChange}
          >
            <Grid container>
              <Grid item>
                <FormControlLabel
                  value="major"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Major"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="minor"
                  control={
                    <Radio
                      classes={{
                        root: classes.radio,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Minor"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Key</InputLabel>
        <Select value={key} name="key" onChange={handleChange} label="Key">
          {musicalKeys}
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
          {mode === "major" ? majorCamelot : minorCamelot}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Open Key</InputLabel>
        <Select
          value={openKey}
          name="open"
          onChange={handleChange}
          label="Open Key"
        >
          {mode === "major" ? majorOpen : minorOpen}
        </Select>
      </FormControl>
    </Dialog>
  );
};

export default KeyCalculator;
