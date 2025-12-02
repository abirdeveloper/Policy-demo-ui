import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import * as Icon from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeImg from "../../Images/HomePic.svg";
import InputAdornment from '@material-ui/core/InputAdornment';
import * as yup from "yup";
import { Formik } from 'formik';
import DOMPurify from 'dompurify';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    height: "62%",
    backgroundImage: { HomeImg },
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[0]
        : theme.palette.grey[900],
    backgroundSize: "min",
    backgroundPosition: "center",
    paddingTop: "10%",
    paddingLeft: "8%",
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
    color: 'red',
    marginBottom: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});


const LoginForm = () => {
  const classes = useStyles();
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Sanitize inputs
    const sanitizedEmail = DOMPurify.sanitize(values.email);
    const sanitizedPassword = DOMPurify.sanitize(values.password);

    try {
      // Ensure REACT_APP_API_ENDPOINT is configured
      const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
      if (!apiEndpoint) {
        throw new Error("REACT_APP_API_ENDPOINT is not configured in this environment.");
      }

      // Simulate API call (replace with your actual API endpoint)
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          password: sanitizedPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        resetForm(); // Clear the form after successful submission
      } else {
        // Handle server-side validation errors or other errors
        console.error('Login failed:', data);
        setServerError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setServerError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <img src={HomeImg} alt="" className={classes.image} />
      </Grid>
      <Grid item xs={12} sm={4} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon.Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
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
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon.Face fontSize="large" style={{ paddingBottom: "5px" }} />
                          </InputAdornment>
                        ),
                      }}
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
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon.Fingerprint fontSize="large" style={{ paddingBottom: "5px" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {serverError && (
                  <Typography variant="body2" className={classes.error}>
                    {serverError}
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
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;