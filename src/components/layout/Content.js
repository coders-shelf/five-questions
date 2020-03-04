import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ListView from "../content/ListView";
import DetailView from "../content/DetailView";
import SubjectCreate from "../content/form/SubjectCreate";
import SubjectEdit from "../content/form/SubjectEdit";
import Snackbar from "../utils/SnackBar";
import SignInView from "../content/SignInView";
import SignUpView from "../content/SignUpView";
import SignOut from "../content/SignOut";
import { checkToken } from "../../actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 5
  }
}));

const Content = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  let route;
  if (isAuth) {
    route = (
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
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route exact path="/">
          <Grid container spacing={5} justify="center" className={classes.root}>
            <ListView />
          </Grid>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/signin">
          <Grid container justify="center" className={classes.root}>
            <Grid item maxwidth="xs">
              <SignInView />
            </Grid>
          </Grid>
        </Route>
        <Route path="/signup">
          <Grid container justify="center" className={classes.root}>
            <Grid item maxwidth="xs">
              <SignUpView />
            </Grid>
          </Grid>
        </Route>
        <Redirect to="/signin" />
      </Switch>
    );
  }
  return (
    <Container>
      <Snackbar />
      {route}
    </Container>
  );
};

export default Content;
