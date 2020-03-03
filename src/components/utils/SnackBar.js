import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import MuiAlert from "@material-ui/lab/Alert";
import { hideMessage } from "../../actions/uiState";

const TransitionUp = props => {
  return <Slide {...props} direction="up" />;
};

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

const CustomizedSnackbars = props => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.uiState.showMessage);
  const type = useSelector(state => state.uiState.messageType);
  const message = useSelector(state => state.uiState.message);
  const handleClose = () => {
    dispatch(hideMessage());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
