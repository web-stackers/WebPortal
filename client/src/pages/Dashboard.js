import BasicCard from "../components/BasicCard";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Provider from "../services/Provider";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [count, setCount] = useState([]);
  const fetchCount = () => {
    Provider.fetchVerifiedProviderCount()
      .then((response) => {
        setCount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <Grid container spacing={4} className={classes.gridContainer}>
      <Grid item xs={4}>
        <BasicCard text="Total Service Providers" count={count} />
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
