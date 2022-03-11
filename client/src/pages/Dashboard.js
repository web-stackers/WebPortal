import BasicCard from "../components/BasicCard";
import { Grid } from "@mui/material";

const Dashboard = () => {
  return (
    <Grid container spacing={4}>
      <Grid item>
        <BasicCard />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
