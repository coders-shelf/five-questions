import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import QuestionAnswer from "./detail/QuestionAnswer";
import DetailToolbar from "./detail/DetailToolbar";
import ExtraQuestion from "./detail/ExtraQuestion";
import Backdrop from "../utils/Backdrop";
import SubmitButton from "../utils/SubmitButton";
import { getSubject, deleteSubject } from "../../actions/subjects";
import { updateQuestionAnswers } from "../../actions/questionAnswers";

const DetailView = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const item = useSelector(state => state.subjects.subject);
  const questions = useSelector(state => state.subjects.questions);
  const answers = useSelector(state => state.subjects.answers);
  const showBackdrop = useSelector(state => state.uiState.showBackdrop);
  useEffect(() => {
    dispatch(getSubject(id));
  }, [dispatch, id]);

  const subjectDelete = id => {
    dispatch(deleteSubject(id, item.imageName));
    history.push("/");
  };

  const onSubmit = data => {
    dispatch(updateQuestionAnswers(id, data));
  };

  let detail;
  if (showBackdrop) {
    detail = <Backdrop showBackdrop={showBackdrop} />;
  } else {
    detail = (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DetailToolbar
            title={item.title}
            id={item.id}
            handleDelete={subjectDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              {Object.keys(questions).map(ky => {
                const answerKey = ky.replace("q", "a");
                return (
                  <Grid item key={ky} xs={12}>
                    <QuestionAnswer
                      question={questions[ky]}
                      answerFieldName={answerKey}
                      questionFieldName={ky}
                      answer={answers[answerKey]}
                      register={register}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <ExtraQuestion />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <SubmitButton text="保存" />
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }

  return <React.Fragment>{detail}</React.Fragment>;
};

export default DetailView;
