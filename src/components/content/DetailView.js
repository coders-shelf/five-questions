import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import QuestionAnswer from "./detail/QuestionAnswer";
import DetailToolbar from "./detail/DetailToolbar";
import ExtraQuestion from "./detail/ExtraQuestion";
import { getSubject, deleteSubject } from "../../actions/subjects";

const DetailView = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSubject(id));
  }, [dispatch, id]);
  // idから情報を取得
  const item = useSelector(state => state.subjects.subject);
  const questions = {
    q1: "「それ」を一言で表すと？",
    q2: "「それ」はどんな問題をどう解決した？",
    q3: "「それ」の代わりとなるものは？",
    q4: "「それ」に関連するキーワードは？",
    q5: "「それ」の目次を作るとしたら？"
  };
  const answers = {
    q1: "answer1",
    q2: "answer2",
    q3: "answer3",
    q4: "answer4",
    q5: "answer5"
  };

  const subjectDelete = id => {
    dispatch(deleteSubject(id));
    history.push("/");
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <DetailToolbar
          title={item.title}
          id={item.id}
          handleDelete={subjectDelete}
        />
      </Grid>
      {Object.keys(questions).map(ky => (
        <Grid item key={ky} xs={12}>
          <QuestionAnswer question={questions[ky]} answer={answers[ky]} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <ExtraQuestion />
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DetailView;
