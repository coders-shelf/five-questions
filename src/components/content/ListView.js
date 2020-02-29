import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MediaCard from "./list/MediaCard";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none"
  }
}));

const ListView = props => {
  const classes = useStyles();
  const items = {
    "0": "JSes6",
    "1": "React",
    "2": "Firebase"
  };
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </Grid>
      {Object.keys(items).map(ky => (
        <Grid item key={ky}>
          <Link to={`/detail/${ky}`} className={classes.link}>
            <MediaCard title={items[ky]} />
          </Link>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default ListView;
