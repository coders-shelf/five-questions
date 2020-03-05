import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import BackButton from "../../utils/BackButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  width: {
    width: "33%"
  }
}));

const DetailToolbar = props => {
  const { title } = props;
  const classes = useStyles();

  return (
    <Toolbar variant="dense" className={classes.root} disableGutters={true}>
      <div className={classes.width}>
        <BackButton path="/" />
      </div>
      <h1>{title}</h1>
      <div className={classes.width}></div>
    </Toolbar>
  );
};

export default DetailToolbar;
