import { useEffect, useState } from "react";
import JobCategory from "../../services/JobCategory";
import Sbutton from "../../components/Sbutton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  return (
    <div>
      <Typography gutterBottom variant="h4" component="div">
        Event
      </Typography>
      {jobTypes.map((jobType) => (
        <div key={jobType._id}>
          {jobType.category === "Event" && (
            <>
              <Typography variant="h6" color="text.secondary">
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
      <Sbutton text="ADD NEW" btnWidth="10%"></Sbutton>
      <br />
      <br />
      <hr />

      <Typography gutterBottom variant="h4" component="div">
        Construction
      </Typography>

      {jobTypes.map((jobType) => (
        <div key={jobType._id}>
          {jobType.category === "Construction" && (
            <>
              <Typography variant="h6" color="text.secondary">
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
      <Sbutton text="ADD NEW" btnWidth="10%"></Sbutton>
      <br />
      <br />
      <hr />
    </div>
  );
};

export default Jobs;
