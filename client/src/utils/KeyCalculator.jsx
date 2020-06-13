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

import KeyMap from "./KeyMap";

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

  let musicalKeys = KeyMap.map((key, index) => (
    <MenuItem value={index}>{key.key}</MenuItem>
  ));

  let minorCamelot = KeyMap.map((key, index) => (
    <MenuItem value={index}>{key.camelot[0]}</MenuItem>
  )).sort(function (a, b) {
    if (a.props.children.length > b.props.children.length) return 1;
    if (a.props.children.length < b.props.children.length) return -1;
    return a.props.children.localeCompare(b.props.children);
  });

  let majorCamelot = KeyMap.map((key, index) => (
    <MenuItem value={index}>{key.camelot[1]}</MenuItem>
  )).sort(function (a, b) {
    if (a.props.children.length > b.props.children.length) return 1;
    if (a.props.children.length < b.props.children.length) return -1;
    return a.props.children.localeCompare(b.props.children);
  });

  let minorOpen = KeyMap.map((key, index) => (
    <MenuItem value={index}>{key.open[0]}</MenuItem>
  )).sort(function (a, b) {
    if (a.props.children.length > b.props.children.length) return 1;
    if (a.props.children.length < b.props.children.length) return -1;
    return a.props.children.localeCompare(b.props.children);
  });

  let majorOpen = KeyMap.map((key, index) => (
    <MenuItem value={index}>{key.open[1]}</MenuItem>
  )).sort(function (a, b) {
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
