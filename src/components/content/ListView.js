import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MediaCard from "./list/MediaCard";
import Backdrop from "../utils/Backdrop";
import LinkButton from "../utils/LinkButton";
import { readSubject } from "../../actions/subjects";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

const ListView = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector(state => state.subjects.subjectList);
  useEffect(() => {
    dispatch(readSubject());
  }, [dispatch]);
  const showBackdrop = useSelector(state => state.uiState.showBackdrop);
  let list;
  if (showBackdrop) {
    list = <Backdrop showBackdrop={showBackdrop} />;
  } else {
    list = items.map(item => (
      <Grid item key={item.id}>
        <Link to={`/detail/${item.id}`} className={classes.link}>
          <MediaCard title={item.title} />
        </Link>
      </Grid>
    ));
  }
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box textAlign="center">
          <LinkButton path="/create" text="新規作成" />
        </Box>
      </Grid>
      {list}
    </React.Fragment>
  );
};

export default ListView;
