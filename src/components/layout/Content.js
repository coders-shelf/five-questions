import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ListView from "../content/ListView";
import DetailView from "../content/DetailView";
import SubjectCreate from "../content/form/SubjectCreate";
import SubjectEdit from "../content/form/SubjectEdit";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 5
  }
}));

const Content = props => {
  const classes = useStyles();
  return (
    <Container>
      <Switch>
        <Route path="/detail/:id">
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={8}>
              <DetailView />
            </Grid>
          </Grid>
        </Route>
        <Route path="/create">
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={8}>
              <SubjectCreate />
            </Grid>
          </Grid>
        </Route>
        <Route path="/edit/:id">
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={10} md={8}>
              <SubjectEdit />
            </Grid>
          </Grid>
        </Route>
        <Route path="/">
          <Grid container spacing={5} justify="center" className={classes.root}>
            <ListView />
          </Grid>
        </Route>
      </Switch>
    </Container>
  );
};

export default Content;
