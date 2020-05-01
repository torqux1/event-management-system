import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Button className={classes.navLink}>Home</Button>
        </Link>
        <Link to="/login">
          <Button className={classes.navLink}>Login</Button>
        </Link>
        <Link to="/register">
          <Button className={classes.navLink}>Register</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;