import React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";

const OutlinedCard = ({ content, actions }) => {
  return (
    <Box sx={{ minWidth: 275 }} style={{ color: "" }}>
      <Card variant="outlined">
        <CardContent>
          {content}
          {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        <CardActions>
          {actions}
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
