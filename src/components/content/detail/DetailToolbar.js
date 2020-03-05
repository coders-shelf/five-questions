import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import BackButton from "../../utils/BackButton";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const DetailToolbar = props => {
  const { title, id, handleDelete } = props;
  const classes = useStyles();

  return (
    <Toolbar variant="dense" className={classes.root} disableGutters={true}>
      <BackButton path="/" />
      <h1>{title}</h1>
      <div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          component={Link}
          to={`/edit/${id}`}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => handleDelete(id)}
        >
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
