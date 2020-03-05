import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthForm from "./form/AuthForm";
import { authenticate } from "../../actions/auth";
import Backdrop from "../utils/Backdrop";
import AuthFormLayout from "../layout/AuthFormLayout";
import AuthFormAvatar from "./auth/AuthFormAvatar";
import AuthFormTitle from "./auth/AuthFormTitle";
import AuthFormLinks from "./auth/AuthFormLinks";

const SignInView = () => {
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
        <AuthFormAvatar isSignUp={false} />
        <AuthFormTitle isSignUp={false} />
        <AuthForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <AuthFormLinks isSignUp={false} />
      </React.Fragment>
    );
  }
  return (
    <AuthFormLayout>
      {redirect}
      {form}
    </AuthFormLayout>
  );
};

export default SignInView;
