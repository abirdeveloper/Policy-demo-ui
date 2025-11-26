import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e1e9ed",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const PolicyArea = ({ books, editBook, setBooks }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteBook(deleteId);
    setOpen(false);
  };


  const handleDeleteBook = (code) => {
    console.log(code);
    axios
      .delete("http://localhost:5005/deletepolicy", {
        data: {
          _id: code,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setBooks(books.filter((book) => book._id !== code));
      });
  };

  return (
    <>
      <Grid container spacing={2} style={{ paddingTop: "10px" }}>
        {books.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ color: "#57534b", fontWeight: "bold" }}
                >
                  {card.customername}
                </Typography>
                <hr />
                <Typography>LOB: {card.lob}</Typography>

                <Typography>Policy Number: {card.policynumber}</Typography>

                <Typography>Email: {card.emailid}</Typography>
                <Typography>
                  Premium:{" "}
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    ${card.premium === undefined ? "" :  card.premium.toLocaleString()}
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => editBook(card._id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => handleClickOpen(card._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default PolicyArea;