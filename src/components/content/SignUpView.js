import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthForm from "./form/AuthForm";
import { authenticate } from "../../actions/auth";
import Backdrop from "../utils/Backdrop";
import AuthFormLayout from "../layout/AuthFormLayout";
import AuthFormAvatar from "./auth/AuthFormAvatar";
import AuthFormTitle from "./auth/AuthFormTitle";
import AuthFormLinks from "./auth/AuthFormLinks";

const SignUpView = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const showBackdrop = useSelector(state => state.uiState.showBackdrop);
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(authenticate(true, data));
  };
  // 認証状態であれば"/"へリダイレクト
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
        <AuthFormAvatar isSignUp={true} />
        <AuthFormTitle isSignUp={true} />
        <AuthForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <AuthFormLinks isSignUp={true} />
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

export default SignUpView;
