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
import axios from 'axios';

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
}));

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', { // Replace with your backend API endpoint
        email: email,
        password: password,
      });

      // Handle successful login (e.g., store token, redirect)
      console.log("Login successful:", response.data);
      // Example: localStorage.setItem('token', response.data.token);
      // Example: window.location.href = '/dashboard';

    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error("Login failed:", error.response ? error.response.data : error.message);
      // Example: alert('Invalid credentials');
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
          <form className={classes.form} onSubmit={handleSubmit} style={{paddingTop:"10px"}}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon.Face fontSize="large" style={{paddingBottom:"5px"}}/>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon.Fingerprint fontSize="large" style={{paddingBottom:"5px"}} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Login
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default LoginForm;