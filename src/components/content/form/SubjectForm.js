import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const SubjectForm = props => {
  const { handleSubmit, register, onSubmit, title } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="タイトル"
        variant="outlined"
        fullWidth
        inputRef={register}
        name="title"
        autoComplete="off"
        defaultValue={title}
      />
      <Box textAlign="center" mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default SubjectForm;
