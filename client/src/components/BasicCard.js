import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const BasicCard = ({ text, count }) => {
  return (
    <Box>
      <Card variant="outlined" sx={{ minHeight: 150, minWidth: 300 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center">
            {text}
          </Typography>
          <br />
          <Typography variant="h4" textAlign="center">
            {count}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicCard;