import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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

const SignInView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const showBackdrop = useSelector(state => state.uiState.showBackdrop);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(authenticate(false, data));
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <AuthForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <Grid container>
          <Grid item xs>
            <Link to="#" variant="body2" className={classes.link}>
              パスワードをお忘れの方
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2" className={classes.link}>
              アカウント作成
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

export default SignInView;
