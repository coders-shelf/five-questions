import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signout } from "../../../actions/auth";

const SignOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signout());
  }, [dispatch]);

  return <Redirect to="/signin" />;
};

export default SignOut;
