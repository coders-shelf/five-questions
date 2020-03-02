import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import QuestionAnswer from "./detail/QuestionAnswer";
import DetailToolbar from "./detail/DetailToolbar";
import ExtraQuestion from "./detail/ExtraQuestion";
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

  useEffect(() => {
    dispatch(getSubject(id));
  }, [dispatch, id]);

  const subjectDelete = id => {
    dispatch(deleteSubject(id));
    history.push("/");
  };

  const onSubmit = data => {
    dispatch(updateQuestionAnswers(id, data));
  };

  return (
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
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default DetailView;
