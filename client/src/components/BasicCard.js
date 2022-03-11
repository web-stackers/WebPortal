import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Total Service Providers
      </Typography>
      <Typography variant="h3" textAlign="center">
        10
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box>
      <Card variant="outlined" sx={{ minHeight: 150 }}>
        {card}
      </Card>
    </Box>
  );
}
