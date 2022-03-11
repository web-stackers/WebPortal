import BasicCard from "../components/BasicCard";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4} className={classes.gridContainer}>
      <Grid item xs={4}>
        <BasicCard text="Total Service Providers" count="10" />
      </Grid>
      <Grid item xs={4}>
        <BasicCard text="Total Service Consumers" count="12" />
      </Grid>
      <Grid item xs={4}>
        <BasicCard text="Completed Jobs" count="12" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
