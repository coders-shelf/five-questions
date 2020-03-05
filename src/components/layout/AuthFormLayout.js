import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const AuthFormLayout = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item maxwidth="xs">
        <div className={classes.paper}>{children}</div>
      </Grid>
    </Grid>
  );
};

export default AuthFormLayout;
