import React from "react";
import QuestionBox from "./QuestionBox";

const Question = props => {
  const { question } = props;
  return <QuestionBox>{"Q: " + question}</QuestionBox>;
};

export default Question;
