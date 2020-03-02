import React from "react";
import InputBase from "@material-ui/core/InputBase";
import QuestionBox from "./QuestionBox";

const Question = props => {
  const { question, register, name } = props;
  return (
    <QuestionBox>
      <InputBase
        name={name}
        label="Q"
        defaultValue={question}
        fullWidth
        inputRef={register}
        autoComplete="off"
      />
    </QuestionBox>
  );
};

export default Question;
