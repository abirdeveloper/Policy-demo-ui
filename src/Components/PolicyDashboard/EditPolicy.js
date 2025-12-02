import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as Icon from "@material-ui/icons";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  customername: yup.string().required("Customer Name is required"),
  address: yup.string().required("Address is required"),
  emailid: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  premium: yup
    .number()
    .required("Premium is required")
    .positive("Premium must be a positive number"),
});

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Initialize form values using setValue
  React.useEffect(() => {
    setValue("customername", book.customername);
    setValue("address", book.address);
    setValue("emailid", book.emailid);
    setValue("premium", book.premium);
  }, [book, setValue]);

  const [lob, setLob] = useState(book.lob);
  const [id, setid] = useState(book._id);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditBook = async (data) => {
    try {
      await editPolicy(
        id,
        data.customername,
        data.address,
        book.policynumber,
        data.premium,
        data.emailid,
        lob
      );
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
        <form onSubmit={handleSubmit(handleEditBook)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="customername">Customer Name:</label>
              <TextField
                variant="outlined"
                id="customername"
                fullWidth
                autoFocus
                {...register("customername")}
                error={!!errors.customername}
                helperText={errors.customername?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="address">Address:</label>
              <TextField
                variant="outlined"
                fullWidth
                id="address"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="emailid">Email ID:</label>
              <TextField
                variant="outlined"
                fullWidth
                id="emailid"
                style={{ paddingBottom: "10px" }}
                type="email"
                {...register("emailid")}
                error={!!errors.emailid}
                helperText={errors.emailid?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="Lob">LOB:</label>
              <TextField
                variant="outlined"
                fullWidth
                id="lob"
                disabled={true}
                style={{ paddingBottom: "10px" }}
                type="text"
                defaultValue={book.lob}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="policynbr">Policy Number:</label>
              <TextField
                variant="outlined"
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
                fullWidth
                id="premium"
                style={{ paddingBottom: "10px" }}
                type="number"
                {...register("premium")}
                error={!!errors.premium}
                helperText={errors.premium?.message}
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