import ComplaintList from "../../components/complaints/ComplaintList";

const Complaint = () => {
  return (
    <div>
      <div>
        <br /> <br />
        {/* Retrieving card structure of third party created in complaints list */}
        <ComplaintList />
      </div>
    </div>
  );
};

export default Complaint;
