import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as Icon from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    paddingTop: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const AddPolicy = (props) => {
  const [customername, setCustomername] = useState("");
  const [address, setAddress] = useState("");
  const [policynumber, setPolicynumber] = useState("");
  const [email, setEmail] = useState("");
  const [lob, setLob] = useState("");
  const [premium, setPremium] = useState("");

  useEffect(() => {
    // Generate policy number and premium when the component mounts
    generatePolicyNumber();
    generatePremium();
  }, []);

  const generatePolicyNumber = () => {
    // Logic to generate policy number (you can customize this)
    const randomNumber = Math.floor(Math.random() * 1000000);
    setPolicynumber(`POLICY-${randomNumber}`);
  };

  const generatePremium = () => {
    // Logic to generate premium (you can customize this)
    const randomPremium = Math.floor(Math.random() * 10000) + 100; // Ensure premium is at least 100
    setPremium(randomPremium.toString());
  };

  const handleAddNewBook = (e) => {
    e.preventDefault();
    props.AddNewBook(customername, address, policynumber, premium, email, lob);
    setCustomername("");
    setAddress("");
    setPolicynumber("");
    setPremium("");
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon.Book />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Policy
        </Typography>
        <form onSubmit={handleAddNewBook}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="outlined"
                variant="standard"
                label="Customer Name"
                required
                fullWidth
                autoFocus
                onChange={(e) => setCustomername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="Author"
                label="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                required
                fullWidth
                id="Email"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                maxLength="10"
              />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: "20px" }}>
              <label htmlFor="demo-simple-select">Choose LOB</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lob}
                fullWidth
                onChange={(e) => {
                  setLob(e.target.value);
                }}
              >
                <MenuItem value={"Auto"}>Auto</MenuItem>
                <MenuItem value={"Workers Comp"}>Workers Comp</MenuItem>
                <MenuItem value={"Property"}>Property </MenuItem>
                <MenuItem value={"StandAlone Global"}>
                  StandAlone Global
                </MenuItem>
                <MenuItem value={"Umbrella"}>Umbrella</MenuItem>
                <MenuItem value={"Package Policy"}>Package Policy</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="PolicyNumber"
                label="Policy Number"
                value={policynumber}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                id="Premium"
                label="Premium"
                value={premium}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            type="Submit"
          >
            Add Policy
          </Button>
        </form>
      </div>
    </>
  );
};
export default AddPolicy;