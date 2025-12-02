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
import Alert from "@material-ui/lab/Alert";

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

const PolicyDash = () => {
  const classes = useStyles();
  const [addNewBookClick, setAddNewBookClick] = useState(false);
  const [editBookClick, setEditBookClick] = useState(false);
  const [books, setBooks] = useState([]);
  const [book, setbook] = useState([]);
  const [error, setError] = useState(null);

  const getAllBooks = () => {
    axios
      .get(process.env.REACT_APP_API_ENDPOINT + "/Policies")
      .then((resp) => setBooks(resp.data))
      .catch((error) => {
        console.error("Error fetching policies:", error);
        setError("Failed to load policies. Please try again later.");
      });
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
      .post(process.env.REACT_APP_API_ENDPOINT + "/addpolicy", {
        customername: customername,
        address: address,
        policynumber: policynumber,
        premium: premium,
        emailid: email,
        lob: lob,
      })
      .then((resp) => {
        console.log(resp.data);
        alert(resp.data);
        setAddNewBookClick(!addNewBookClick);
      })
      .catch((error) => {
        console.error("Error adding policy:", error);
        setError("Failed to add policy. Please check your input and try again.");
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
      .put(process.env.REACT_APP_API_ENDPOINT + "/updatepolicy/", {
        _id: id,
        customername: customername,
        address: address,
        policynumber: policynumber,
        emailid: email,
        premium: premium,
        lob: lob,
      })
      .then((resp) => {
        alert(resp.data);
        setEditBookClick(!editBookClick);
      })
      .catch((error) => {
        console.error("Error updating policy:", error);
        setError("Failed to update policy. Please try again.");
      });
  };
  const fetchPolicy = async (_id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/policy/${_id}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching policy:", error);
      setError("Failed to fetch policy details. Please try again.");
      return null;
    }
  };
  const editBook = async (code) => {
    const data = await fetchPolicy(code);
    if (data) {
      setbook(data);
      setEditBookClick(!editBookClick);
      console.log(data);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, [books]);

  return (
    <>
      <CssBaseline />
      <Grid item xs={10}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
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
    </>
  );
};
export default PolicyDash;