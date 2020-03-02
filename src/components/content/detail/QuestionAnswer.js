import React from "react";
import Question from "./Question";
import Answer from "./Answer";

const QuestionAnswer = props => {
  const {
    question,
    answer,
    register,
    answerFieldName,
    questionFieldName
  } = props;
  return (
    <React.Fragment>
      <Question
        question={question}
        register={register}
        name={questionFieldName}
      />
      <Answer answer={answer} register={register} name={answerFieldName} />
    </React.Fragment>
  );
};

export default QuestionAnswer;
