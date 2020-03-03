import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

const CustomBackdrop = props => {
  const { showBackdrop } = props;
  return (
    <Backdrop open={showBackdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomBackdrop;
