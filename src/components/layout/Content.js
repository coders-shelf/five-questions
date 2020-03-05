import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import ListView from "../content/ListView";
import DetailView from "../content/DetailView";
import SubjectCreate from "../content/form/SubjectCreate";
import SubjectEdit from "../content/form/SubjectEdit";
import Snackbar from "../utils/SnackBar";
import SignInView from "../content/SignInView";
import SignUpView from "../content/SignUpView";
import SignOut from "../content/auth/SignOut";
import LargeLayout from "../layout/LargeLayout";
import MiddleLayout from "../layout/MiddleLayout";
import { checkToken } from "../../actions/auth";

const Content = props => {
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
          <MiddleLayout>
            <DetailView />
          </MiddleLayout>
        </Route>
        <Route path="/create">
          <MiddleLayout>
            <SubjectCreate />
          </MiddleLayout>
        </Route>
        <Route path="/edit/:id">
          <MiddleLayout>
            <SubjectEdit />
          </MiddleLayout>
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route exact path="/">
          <LargeLayout>
            <ListView />
          </LargeLayout>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/signin">
          <SignInView />
        </Route>
        <Route path="/signup">
          <SignUpView />
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
