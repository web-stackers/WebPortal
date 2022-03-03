import { useState } from "react";
import JobCategory from "../../services/JobCategory";
import Sbutton from "../../components/Sbutton";
import AddNewJob from "../../components/job/AddNewJob";
import JobList from "../../components/job/JobList";

const Jobs = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (task) => {
    console.log(task);
    JobCategory.addNew(task);
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
      <JobList />
    </div>
  );
};

export default Jobs;
