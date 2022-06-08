import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Provider from "../../services/Provider";
import Consumer from "../../services//Consumer";
import JobAssignment from "../../services/JobAssignment";
import Job from "../../services/Job";
import JobCategory from "../../services/JobCategory";
import SecondaryUser from "../../services/SecondaryUser";

import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';
import Typography from '@mui/material//Typography';

import BasicCard from "../../components/BasicCard";
import UserJobs from '../../components/Users/UserJobs';

import useStyles from "./styles";

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

  // Fetch third party count
  const [countThirdparty, setCountThirdparty] = useState([]);
  const fetchThirdpartyCount = () => {
    SecondaryUser.fetchThirdpartyCount()
      .then((response) => {
        setCountThirdparty(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch completed job count
  const [countCompletedJob, setCountCompletedJob] = useState([]);
  const fetchCountCompletedJob = () => {
    JobAssignment.fetchCompletedJobCount()
      .then((response) => {
        setCountCompletedJob(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch pending job count
  const [countPendingJob, setCountPendingJob] = useState([]);
  const fetchCountPendingJob = () => {
    JobAssignment.fetchPendingJobCount()
      .then((response) => {
        setCountPendingJob(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch complaint count
  const [countComplaint, setCountComplaint] = useState([]);
  const fetchCountComplaint = () => {
    Job.fetchComplaintCount()
      .then((response) => {
        setCountComplaint(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch job category count
  const [countJobCategory, setCountJobCategory] = useState([]);
  const fetchJobCategoryCount = () => {
    JobCategory.fetchJobCategoryCount()
      .then((response) => {
        setCountJobCategory(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Fetch job type count
  const [countJobType, setCountJobType] = useState([]);
  const fetchJobTypeCount = () => {
    JobCategory.fetchJobTypeCount()
      .then((response) => {
        setCountJobType(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchCountProvider();
    fetchCountConsumer();
    fetchThirdpartyCount();
    fetchCountCompletedJob();
    fetchCountPendingJob();
    fetchCountComplaint();
    fetchJobCategoryCount();
    fetchJobTypeCount();
  }, []);

  return (
    <>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={3}>
          <BasicCard text="Total Service Providers" count={countProvider} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Total Service Consumers" count={countConsumer} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Total Third Party" count={countThirdparty} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Completed Jobs" count={countCompletedJob} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Pending Jobs" count={countPendingJob} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Total Complaints" count={countComplaint} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Total Job Categories" count={countJobCategory} />
        </Grid>
        <Grid item xs={3}>
          <BasicCard text="Total Job Types" count={countJobType} />
        </Grid>
      </Grid>

      <Card className="root">
          <CardContent>
              <Typography variant="h5">
                  Job History
              </Typography>
              <UserJobs type="both" id='1'/>
          </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
