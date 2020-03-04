import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signout } from "../../actions/auth";
import { showMessage } from "../../actions/uiState";

const SignOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signout());
    dispatch(showMessage("サインアウトしました。", "success"));
  }, [dispatch]);

  return <Redirect to="/signin" />;
};

export default SignOut;
