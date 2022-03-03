import { useEffect, useState } from "react";
import JobCategory from "../../services/JobCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const JobList = () => {
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

  const deleteJobTYpe = (e) => {
    console.log(e);
    JobCategory.deleteOne(e);
    window.location.reload(false);
  };

  return (
    <div>
      {" "}
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

export default JobList;
