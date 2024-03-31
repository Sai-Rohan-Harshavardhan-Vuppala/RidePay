import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import defaultImage from "../../../assets/images/stop.jpg";

const MediaCard = ({ imageUrl, title, content, actions }) => {
  //   console.log(imageUrl);
  const finalImageUrl = imageUrl === null ? defaultImage : imageUrl;
  //   console.log(finalImageUrl);
  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: 345,
        height: "100%",
        // display: "flex",
        // flexDirecton: "column",
        // justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 140, paddingBottom: 0 }}
        image={finalImageUrl}
        title={title}

        // image="/static/images/cards/contemplative-reptile.jpg"
        // title="green iguana"
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          height: "120px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {content}
        {/* <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species,
          ranging across all continents except Antarctica
        </Typography> */}
        {actions}
      </CardContent>
      <CardActions
        style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default MediaCard;
