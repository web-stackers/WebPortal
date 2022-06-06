import { useState } from "react";
import JobCategory from "../../../services/JobCategory";
import Sbutton from "../../../components/Sbutton";
import AddNewJob from "../../../components/job/AddNewJob";
import JobList from "../../../components/job/JobList";

const Jobs = () => {
  //showAddTask is maintain for toggling adding new job form, initially it is set to false, which means form will not be displayed.
  const [showAddTask, setShowAddTask] = useState(false);

  //addTask is a function passed as props with AddNewJob
  const addTask = (task) => {
    console.log(task);
    JobCategory.addNew(task);
  };

  return (
    <div>
      {/* During the button click, form will be toggle, by setting the opposite value for showAddTask */}
      <Sbutton
        text="ADD NEW"
        btnWidth="25%"
        onClick={() => setShowAddTask(!showAddTask)}
      />
      <br />

      {/* When showAddTask is true AddNewJob content will be display */}
      {showAddTask && <AddNewJob onAdd={addTask} />}
      <br />
      <br />
      {/* card structure for both categories of job will be retieved from JobList component */}
      <JobList />
    </div>
  );
};

export default Jobs;
