import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import * as Icons from "@material-ui/icons";

import { NavLink, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  toolbarButtons: {
    marginLeft: "auto",
  },
  
}));

const AppNavbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" >
      <Toolbar>
        <IconButton justify="start" color="inherit" aria-label="home">
          <Icons.PolicySharp fontSize="large" />
          <Link
               style={{ color: 'inherit', textDecoration: 'inherit', fontSize:"20px"}}
              key="1"
              as={Link}
              to="/Home"
            >
              &nbsp;Policy Dashboard
            </Link>
        </IconButton>
        <div className={classes.toolbarButtons}>
        {/*<IconButton justify="center" color="inherit" aria-label="home">
            <Link
               style={{ color: 'inherit', textDecoration: 'inherit',fontSize:"16px"}}
              key="1"
              as={Link}
              to="/Policies"
            >
              Policy
            </Link>
          </IconButton>
           <IconButton justify="center" color="inherit" aria-label="home">
            <Link
               style={{ color: 'inherit', textDecoration: 'inherit',fontSize:"16px"}}
              key  ="2"
              as={Link}
              to="/Register"
            >
              Register
            </Link>
          </IconButton> */}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavbar;
