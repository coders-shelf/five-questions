import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AuthForm from "./form/AuthForm";
import { authenticate } from "../../actions/auth";
import Backdrop from "../utils/Backdrop";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    color: theme.palette.secondary.main
  }
}));

const SignUpView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const showBackdrop = useSelector(state => state.uiState.showBackdrop);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(authenticate(true, data));
  };
  let redirect = null;
  if (isAuth) {
    redirect = <Redirect to="/" />;
  }
  let form;
  if (showBackdrop) {
    form = <Backdrop showBackdrop={showBackdrop} />;
  } else {
    form = (
      <React.Fragment>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <AuthForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <Grid container>
          <Grid item>
            <Link to="/signin" variant="body2" className={classes.link}>
              すでにアカウントをお持ちの方
            </Link>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <div className={classes.paper}>
      {redirect}
      {form}
    </div>
  );
};

export default SignUpView;
