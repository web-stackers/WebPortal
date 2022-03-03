import { useEffect, useState } from "react";
import JobCategory from "../../services/JobCategory";
import Sbutton from "../../components/Sbutton";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddNewJob from "../../components/job/AddNewJob";

const Jobs = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

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
    width: 1,
    marginLeft: 25,
    marginBottom: 10,
  };

  const cardStyle = {
    marginLeft: "3%",
    marginRight: "3%",
    paddingLeft: "2%",
  };

  const addTask = (task) => {
    console.log(task);
    JobCategory.addNew(task);
  };

  const deleteJobTYpe = (e) => {
    console.log(e);
    JobCategory.deleteOne(e);
    window.location.reload(false);
  };

  return (
    <div>
      <Sbutton
        text="ADD NEW"
        btnWidth="25%"
        onClick={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <br />

      {showAddTask && <AddNewJob onAdd={addTask} />}
      <br />
      <br />
      <Card variant="outlined" style={cardStyle}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Event
          </Typography>
          <br />
          {jobTypes.map((jobType) => (
            <div key={jobType._id}>
              {jobType.category === "Event" && (
                <>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {jobType.jobType}
                    {/* <Button variant="contained" style={btnStyle}>
                      <EditIcon />
                    </Button> */}
                    <Button
                      variant="contained"
                      style={btnStyle}
                      onClick={() => deleteJobTYpe(jobType._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </Typography>
                  <br />
                </>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <br />
      <hr />
      <br />
      <Card variant="outlined" style={cardStyle}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Construction
          </Typography>
          <br />
          {jobTypes.map((jobType) => (
            <div key={jobType._id}>
              {jobType.category === "Construction" && (
                <>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {jobType.jobType}
                    {/* <Button variant="contained" style={btnStyle}>
                      <EditIcon />
                    </Button> */}
                    <Button
                      variant="contained"
                      style={btnStyle}
                      onClick={() => deleteJobTYpe(jobType._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </Typography>
                  <br />
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
