import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "./list/Card";

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
      {Object.keys(items).map(ky => (
        <Grid item key={ky}>
          <Link to={`/detail/${ky}`} className={classes.link}>
            <Card title={items[ky]} />
          </Link>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default ListView;
