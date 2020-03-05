import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SubmitButton from "../../utils/SubmitButton";
import MediaCard from "../list/MediaCard";

const SubjectForm = props => {
  const { handleSubmit, register, onSubmit, title, imageUrl } = props;
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const handleChange = event => {
    const blobUrl = window.URL.createObjectURL(event.target.files[0]);
    setSelectedImage(blobUrl);
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="タイトル"
          variant="outlined"
          fullWidth
          inputRef={register}
          name="title"
          autoComplete="off"
          defaultValue={title}
        />
        <Box mt={2}>
          <Button component="label" variant="outlined">
            アイキャッチ画像アップロード
            <input
              type="file"
              name="image"
              ref={register}
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </Button>
        </Box>
        <Box textAlign="center" mt={2}>
          <SubmitButton text="保存" />
        </Box>
      </form>
      <Grid container justify="center">
        <Grid item>
          <Box mt={3}>
            <MediaCard title="画像プレビュー" imageUrl={selectedImage} />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SubjectForm;
