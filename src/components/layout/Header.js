import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white"
  },
  title: {
    flexGrow: 1
  }
}));
const Header = props => {
  const classes = useStyles();
  const isAuth = useSelector(state => state.auth.isAuth);
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Five Questions
        </Typography>
        {isAuth ? (
          <Button color="inherit" component={Link} to="/signout">
            Logout
          </Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
