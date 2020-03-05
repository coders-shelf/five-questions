import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 5
  }
}));

const LargeLayout = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={5} justify="center" className={classes.root}>
      {children}
    </Grid>
  );
};

export default LargeLayout;
