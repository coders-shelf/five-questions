import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LinkButton from "./LinkButton";

const BackButton = props => {
  const { path } = props;
  return (
    <LinkButton path={path} text="戻る" startIcon={<ArrowBackIosIcon />} />
  );
};

export default BackButton;
