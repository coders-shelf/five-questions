import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const Answer = props => {
  const { name, answer, register } = props;
  return (
    <Box mt={2}>
      <TextField
        name={name}
        multiline
        rows="4"
        defaultValue={answer}
        variant="outlined"
        fullWidth
        inputRef={register}
      />
    </Box>
  );
};

export default Answer;
