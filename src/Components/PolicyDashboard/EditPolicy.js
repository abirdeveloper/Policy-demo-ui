import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as Icon from "@material-ui/icons";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditPolicy = ({ book, editPolicy, editBook }) => {
  const [customername, setCustomername] = useState(book.customername);
  const [address, setAddress] = useState(book.address);
  const [policynumber, setPolicynumber] = useState(book.policynumber);
  const [email, setEmail] = useState(book.emailid);
  const [premium, setPremium] = useState(book.premium);
  const [lob, setLob] = useState(book.lob);
  const [id, setid] = useState(book._id);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditBook = async (e) => {
    e.preventDefault();
    try {
      await editPolicy(
        id,
        customername,
        address,
        policynumber,
        premium,
        email,
        lob
      );
      setCustomername("");
      setAddress("");
      setPolicynumber("");
      setPremium("");
      setid("");
    } catch (error) {
      console.error("Error updating policy:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update policy."
      );
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon.Book />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Policy
        </Typography>
        <hr />
        <form onSubmit={handleEditBook}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="bookname">Customer Name:</label>
              <TextField
                defaultValue={book.customername}
                variant="outlined"
                id="bookname"
                required
                fullWidth
                autoFocus
                onChange={(e) => setCustomername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="Author">Address:</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Author"
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={book.address}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="email">Email ID:</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                style={{ paddingBottom: "10px" }}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                defaultValue={book.emailid}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="Lob">LOB:</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lob"
                disabled={true}
                style={{ paddingBottom: "10px" }}
                onChange={(e) => setLob(e.target.value)}
                type="text"
                defaultValue={book.lob}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="policynbr">Policy Number:</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="policynbr"
                disabled={true}
                style={{ paddingBottom: "10px" }}
                defaultValue={book.policynumber}
                type="text"
              />
              <input
                value={book._id}
                onChange={(e) => setid(e.target.value)}
                type="hidden"
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="premium">Premium:</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="premium"
                style={{ paddingBottom: "10px" }}
                onChange={(e) => {
                  setPremium(e.target.value);
                }}
                type="number"
                defaultValue={book.premium}
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
            Save
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default EditPolicy;