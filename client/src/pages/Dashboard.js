import BasicCard from "../components/BasicCard";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Provider from "../services/Provider";
import Consumer from "../services/Consumer";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

const Dashboard = () => {
  const classes = useStyles();

  // Fetch provider count
  const [countProvider, setCountProvider] = useState([]);
  const fetchCountProvider = () => {
    Provider.fetchVerifiedProviderCount()
      .then((response) => {
        setCountProvider(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch consumer count
  const [countConsumer, setCountConsumer] = useState([]);
  const fetchCountConsumer = () => {
    Consumer.fetchConsumerCount()
      .then((response) => {
        setCountConsumer(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchCountProvider();
    fetchCountConsumer();
  }, []);
  return (
    <Grid container spacing={4} className={classes.gridContainer}>
      <Grid item xs={4}>
        <BasicCard text="Total Service Providers" count={countProvider} />
      </Grid>
      <Grid item xs={4}>
        <BasicCard text="Total Service Consumers" count={countConsumer} />
      </Grid>
      <Grid item xs={4}>
        <BasicCard text="Completed Jobs" count="12" />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
