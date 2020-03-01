import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MediaCard from "./list/MediaCard";
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

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Link to="/create" className={classes.link}>
            <Button variant="contained" color="primary">
              Create
            </Button>
          </Link>
        </Box>
      </Grid>

      {items.map(item => (
        <Grid item key={item.id}>
          <Link to={`/detail/${item.id}`} className={classes.link}>
            <MediaCard title={item.title} />
          </Link>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default ListView;
