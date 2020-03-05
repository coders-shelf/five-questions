import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const AuthFormAvatar = props => {
  const { isSignUp } = props;
  const classes = useStyles();
  let icon;
  if (isSignUp) {
    icon = <PersonAddIcon />;
  } else {
    icon = <LockOutlinedIcon />;
  }
  return <Avatar className={classes.avatar}>{icon}</Avatar>;
};

export default AuthFormAvatar;
