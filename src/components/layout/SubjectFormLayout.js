import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SubjectFormToolbar from "../content/form/SubjectFormToolbar";

const SubjectFormLayout = props => {
  const { title, children } = props;
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <SubjectFormToolbar title={title} />
        <Box mt={3}>{children}</Box>
      </Grid>
    </React.Fragment>
  );
};

export default SubjectFormLayout;
