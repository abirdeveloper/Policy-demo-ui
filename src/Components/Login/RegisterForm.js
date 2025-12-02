import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import RegImg from "../../Images/RegisterPic.svg";
import * as yup from "yup";
import { Formik } from "formik";
import DOMPurify from 'dompurify';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    height: "85%",
    backgroundImage: { RegImg },
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[0]
        : theme.palette.grey[900],
    backgroundSize: "min",
    backgroundPosition: "center",
    paddingTop: "4%",
    paddingLeft: "4%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
}));

const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First Name is required")
    .matches(/^[a-zA-Z\s]+$/, "First Name can only contain letters and spaces"),
  lastName: yup
    .string()
    .trim()
    .required("Last Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last Name can only contain letters and spaces"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    ),
  contact: yup
    .string()
    .trim()
    .required("Contact is required")
    .matches(/^[0-9]+$/, "Contact must contain only numbers")
    .min(10, "Contact must be at least 10 numbers")
    .max(15, "Contact must be at most 15 numbers"),
  address: yup.string().trim().required("Address is required"),
});

const RegisterForm = () => {
  const classes = useStyles();
  const [submissionError, setSubmissionError] = useState(null);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Sanitize inputs before sending to the server
      const sanitizedValues = {
        firstName: DOMPurify.sanitize(values.firstName),
        lastName: DOMPurify.sanitize(values.lastName),
        email: DOMPurify.sanitize(values.email),
        password: DOMPurify.sanitize(values.password), // Consider hashing on the client-side as well
        contact: DOMPurify.sanitize(values.contact),
        address: DOMPurify.sanitize(values.address),
      };

      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

      if (!apiEndpoint) {
        console.error("REACT_APP_API_ENDPOINT is not defined in the environment.");
        setSubmissionError("Registration failed: API endpoint not configured.");
        setSubmitting(false);
        return;
      }

      // Simulate API call (replace with your actual API endpoint)
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedValues),
      });

      if (response.ok) {
        // Registration successful
        console.log("Registration successful!");
        resetForm(); // Clear the form
      } else {
        // Registration failed
        const errorData = await response.json();
        setSubmissionError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmissionError("An unexpected error occurred.");
    } finally {
      setSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <img src={RegImg} alt="" className={classes.image} />
      </Grid>
      <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              contact: "",
              address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="fname"
                      value={values.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={values.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      name="contact"
                      label="Contact"
                      type="text"
                      id="contact"
                      autoComplete="contact"
                      value={values.contact}
                      onChange={handleChange}
                      error={touched.contact && Boolean(errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      type="text"
                      id="address"
                      autoComplete="address"
                      multiline
                      rows={3}
                      value={values.address}
                      onChange={handleChange}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>
                </Grid>
                {submissionError && (
                  <Typography className={classes.error} variant="body2">
                    {submissionError}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;