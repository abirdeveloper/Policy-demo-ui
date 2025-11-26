import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import PolicyArea from "./PolicyArea";
import Button from "@material-ui/core/Button";
import AddPolicy from "./AddPolicy";
import EditPolicy from "./EditPolicy";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "1%",
    paddingLeft: "2%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PolicyDash = () => {
  const classes = useStyles();
  const [addNewBookClick, setAddNewBookClick] = useState(false);
  const [editBookClick, setEditBookClick] = useState(false);
  const [books, setBooks] = useState([]);
  const [book, setbook] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const getAllBooks = () => {
    axios
      .get("http://localhost:5005/Policies")
      .then((resp) => setBooks(resp.data));
  };

  const handleAddBookClick = () => {
    setAddNewBookClick(!addNewBookClick);
    if (editBookClick === true) setEditBookClick(false);
  };
  const AddNewBook = (
    customername,
    address,
    policynumber,
    premium,
    email,
    lob
  ) => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomAlpha = "";
    let length = 1; // Customize the length here.
    for (let i = length; i > 0; --i)
      randomAlpha +=
        characters[Math.round(Math.random() * (characters.length - 1))];
    let randompolicynumber = Math.floor(Math.random() * 1000000000).toString();
    policynumber =
      randompolicynumber.slice(0, 4) +
      randomAlpha +
      randompolicynumber.slice(4, 8);
    premium = Math.floor(Math.random() * 10000);
    axios
      .post("http://localhost:5005/addpolicy", {
        customername: customername,
        address: address,
        policynumber: policynumber,
        premium: premium,
        emailid: email,
        lob: lob,
      })
      .then((resp) => {
        console.log(resp.data);
        setSnackbarMessage(resp.data);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setAddNewBookClick(!addNewBookClick);
      });

    getAllBooks();
  };

  const editPolicy = (
    id,
    customername,
    address,
    policynumber,
    premium,
    email,
    lob
  ) => {
    axios
      .put("http://localhost:5005/updatepolicy/", {
        _id: id,
        customername: customername,
        address: address,
        policynumber: policynumber,
        emailid: email,
        premium: premium,
        lob: lob,
      })
      .then((resp) => {
        setSnackbarMessage(resp.data);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setEditBookClick(!editBookClick);
      });
  };
  const fetchPolicy = async (_id) => {
    const res = await fetch(`http://localhost:5005/policy/${_id}`);
    const data = await res.json();
    return data;
  };
  const editBook = async (code) => {
    const data = await fetchPolicy(code);
    setbook(data);
    setEditBookClick(!editBookClick);

    console.log(data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <CssBaseline />
      <Grid item xs={10}>
        <div style={{ paddingTop: "20px" }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            style={{ float: "right" }}
            onClick={handleAddBookClick}
          >
            {addNewBookClick ? "Close" : "Add Policy"}
          </Button>
        </div>
      </Grid>
      <Grid className={classes.root}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={0}>
              <PolicyArea books={books} editBook={editBook} />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
              {addNewBookClick ? <AddPolicy AddNewBook={AddNewBook} /> : ""}
              {editBookClick ? (
                <EditPolicy book={book} editPolicy={editPolicy} />
              ) : (
                ""
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default PolicyDash;