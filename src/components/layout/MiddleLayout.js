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
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} sm={10} md={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default LargeLayout;
