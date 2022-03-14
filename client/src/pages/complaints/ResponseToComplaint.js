import StextField from "../../components/formComponents/StextField";
import StextArea from "../../components/formComponents/StextArea";
import Sbutton from "../../components/Sbutton";
import { useState, useEffect } from "react";
import Axios from "axios";

const ResponseToComplaint = () => {
  const [reply, setReply] = useState([]);

  useEffect(() => {
    Axios.get("/job").then((response) => {
      setReply(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setReply((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      {reply.map((jobs) => {
        return (
          <div>
            {jobs.complaint.map((complaint) => {
              return (
                <div>
                  <form>
                    <div>
                      <StextField
                        label="Complaint by"
                        name="complaintBy"
                        value={complaint.by || ""}
                        onChange={handleChange}
                      />
                      <StextField
                        label="Category"
                        name="category"
                        value={complaint.category || ""}
                        onChange={handleChange}
                      />
                      <StextField
                        label="Date"
                        name="date"
                        value={complaint.date || ""}
                        onChange={handleChange}
                      />
                      <StextField
                        label="Description"
                        name="description"
                        value={complaint.description || ""}
                        onChange={handleChange}
                      />
                      <StextArea
                        name="adminResponse"
                        value={reply.adminResponse || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <br/>
                    <Sbutton text="Send " type="submit" />
                    <hr />
                  </form>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ResponseToComplaint;
