import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const SubjectFormLayout = props => {
  const { title, children } = props;
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box textAlign="center" mt={2}>
          <h2>{title}</h2>
        </Box>
        <Link to="/">
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </Link>
        <Box mt={2}>{children}</Box>
      </Grid>
    </React.Fragment>
  );
};

export default SubjectFormLayout;
