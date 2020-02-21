import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  backButton: {
    color: "white"
  },
  link: {
    textDecoration: "none"
  }
}));

const DetailToolbar = props => {
  const classes = useStyles();
  const title = "React";
  return (
    <Toolbar variant="dense" className={classes.root} disableGutters={true}>
      <Link to="/" className={classes.link}>
        <Button
          variant="contained"
          color="primary"
          className={classes.backButton}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </Link>
      <h1>{title}</h1>
      <div>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <ImageOutlinedIcon />
        </IconButton>
      </div>
    </Toolbar>
  );
};

export default DetailToolbar;
