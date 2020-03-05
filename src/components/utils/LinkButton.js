import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  },
  button: {
    color: "white"
  }
}));

const LinkButton = props => {
  const { path, text, startIcon } = props;
  const classes = useStyles();
  return (
    <Link to={path} className={classes.link}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={startIcon}
      >
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
