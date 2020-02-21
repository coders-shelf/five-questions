import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const Answer = props => {
  const { answer } = props;
  return (
    <Box mt={2}>
      <TextField
        label="Multiline"
        multiline
        rows="4"
        defaultValue={answer}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default Answer;
