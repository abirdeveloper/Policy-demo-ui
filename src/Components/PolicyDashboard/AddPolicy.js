import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as Icon from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  customername: yup.string().required("Customer Name is required"),
  address: yup.string().required("Address is required"),
  policynumber: yup
    .string()
    .required("Policy Number is required")
    .matches(/^[a-zA-Z0-9]+$/, "Policy Number must be alphanumeric"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  lob: yup.string().required("LOB is required"),
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

const AddPolicy = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [lob, setLob] = useState("");
  const [error, setError] = useState("");

  const handleAddNewBook = async (data) => {
    try {
      await props.AddNewBook(
        data.customername,
        data.address,
        data.policynumber,
        data.premium,
        data.email,
        lob
      );
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(
        err.message || "An error occurred while adding the policy."
      );
    }
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
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit(handleAddNewBook)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                label="Customer Name"
                fullWidth
                autoFocus
                {...register("customername")}
                error={!!errors.customername}
                helperText={errors.customername?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Address"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Policy Number"
                {...register("policynumber")}
                error={!!errors.policynumber}
                helperText={errors.policynumber?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Premium"
                type="number"
                {...register("premium", { valueAsNumber: true })}
                error={!!errors.premium}
                helperText={errors.premium?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Email"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Add Policy
          </Button>
        </form>
      </div>
    </>
  );
};
export default AddPolicy;