import { useEffect, useState } from "react";
import JobCategory from "../../services/JobCategory";
import Sbutton from "../../components/Sbutton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AddNewJob from "../../components/formComponents/job/AddNewJob";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => {
//   return {
//     button: {
//       margin: "-25px 10px 100px 0",
//       padding: "0px 10px 8px 0",
//     },
//   };
// });

const Jobs = () => {
  const [jobTypes, setJobTypes] = useState([]);

  const fetchJobTypes = () => {
    JobCategory.fetchJobCategory()
      .then((response) => {
        setJobTypes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchJobTypes();
  }, []);

  //   const classes = useStyles();
  const btnStyle = {
    width: 10,
    marginLeft: 20,
    marginBottom: 25,
  };

  const addTask = (task) => {
    console.log(task);
    JobCategory.addNew(task);
  };
  return (
    <div>
      <Sbutton text="ADD NEW" btnWidth="10%"></Sbutton>
      <br />
      <br />
      <AddNewJob onAdd={addTask} />
      <br />
      <br />
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Event
          </Typography>
          {jobTypes.map((jobType) => (
            <div key={jobType._id}>
              {jobType.category === "Event" && (
                <>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {jobType.jobType}
                    <Button variant="contained" style={btnStyle}>
                      <EditIcon />
                    </Button>
                    <Button variant="contained" style={btnStyle}>
                      <DeleteIcon />
                    </Button>
                  </Typography>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <br />
      <hr />
      <br />
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Construction
          </Typography>
          {jobTypes.map((jobType) => (
            <div key={jobType._id}>
              {jobType.category === "Construction" && (
                <>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {jobType.jobType}
                    <Button variant="contained" style={btnStyle}>
                      <EditIcon />
                    </Button>
                    <Button variant="contained" style={btnStyle}>
                      <DeleteIcon />
                    </Button>
                  </Typography>
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <br />
      <hr />
    </div>
  );
};

export default Jobs;
