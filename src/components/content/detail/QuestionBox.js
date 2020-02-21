import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  questionBox: {
    borderColor: theme.palette.primary.main
  }
}));

const QuestionBox = props => {
  const classes = useStyles();
  return (
    <Box border={3} p={2} className={classes.questionBox}>
      {props.children}
    </Box>
  );
};

export default QuestionBox;
