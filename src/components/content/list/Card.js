import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Image from "../../../assets/react-image.png";

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    background: theme.palette.primary.main
  },
  media: {
    height: 200
  }
}));

export default function MediaCard(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
