import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import MuiAlert from "@material-ui/lab/Alert";
import { hideMessage } from "../../actions/uiState";

const TransitionUp = props => {
  // スライド表示のため。directionで方向を指定。
  return <Slide {...props} direction="up" />;
};

const Alert = React.forwardRef((props, ref) => {
  // アラートのデザインを使用するため。ドキュメントを要参照。
  // forwardRef・refの指定はスライド表示のために必要
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

const CustomizedSnackbars = () => {
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
      autoHideDuration={3000} // 表示時間の指定
      onClose={handleClose}
      TransitionComponent={TransitionUp}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // 表示する場所の指定
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
