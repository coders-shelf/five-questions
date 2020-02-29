import React from "react";
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
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Five Questions
        </Typography>
        <Button color="inherit">Export</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
