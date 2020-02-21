import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const ExtraQuestion = props => {
  return (
    <Button
      fullWidth
      variant="outlined"
      color="primary"
      startIcon={<AddIcon />}
    >
      質問を追加する
    </Button>
  );
};

export default ExtraQuestion;
