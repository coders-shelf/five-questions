import React from "react";
import Typography from "@material-ui/core/Typography";

const AuthFormTitle = props => {
  const { isSignUp } = props;
  let title;
  if (isSignUp) {
    title = "Sign Up";
  } else {
    title = "Sign In";
  }
  return (
    <Typography component="h1" variant="h5">
      {title}
    </Typography>
  );
};

export default AuthFormTitle;
