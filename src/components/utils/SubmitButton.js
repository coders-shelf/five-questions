import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    color: "white"
  }
}));

const SubmitButton = props => {
  const { text } = props;
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      className={classes.button}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
