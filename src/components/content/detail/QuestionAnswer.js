import React from "react";
import Question from "./Question";
import Answer from "./Answer";

const QuestionAnswer = props => {
  const { question, answer } = props;
  return (
    <React.Fragment>
      <Question question={question} />
      <Answer answer={answer} />
    </React.Fragment>
  );
};

export default QuestionAnswer;
