import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const PolicyArea = ({ books, editBook }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleDeleteBook = (code) => {
    console.log(code);
    axios
      .delete(process.env.REACT_APP_API_ENDPOINT_DELETE_POLICY, {
        data: {
          _id: code,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setAlertMessage("Policy deleted successfully!");
        setAlertSeverity("success");
        setOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting policy:", error);
        setAlertMessage("Failed to delete policy. Please try again.");
        setAlertSeverity("error");
        setOpen(true);
      });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
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
                  onClick={() => {
                    if (window.confirm("Are you sure to delete this record?")) {
                      handleDeleteBook(card._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default PolicyArea;