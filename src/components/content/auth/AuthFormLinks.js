import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.main
  }
}));

const AuthFormLinks = props => {
  const { isSignUp } = props;
  const classes = useStyles();
  let path;
  let message;
  if (isSignUp) {
    path = "/signin";
    message = "すでにアカウントをお持ちの方";
  } else {
    path = "/signup";
    message = "アカウント作成";
  }
  return (
    <Grid container>
      <Grid item xs>
        <Link to={path} variant="body2" className={classes.link}>
          {message}
        </Link>
      </Grid>
    </Grid>
  );
};

export default AuthFormLinks;
