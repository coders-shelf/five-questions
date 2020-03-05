import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import SubmitButton from "../../utils/SubmitButton";

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
        <SubmitButton text="保存" />
      </Box>
    </form>
  );
};

export default SubjectForm;
