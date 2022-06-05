import React from "react";
import FileUpload from "../../components/formComponents/fileUpload/FileUpload";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import Button from "@mui/material//Button";

const Uploads = ({ handleChange, value, onSubmit, setUploadedProfilePath, setUploadedNicPath, setUploadedDocPath }) => {
  const [profileName, setProfileName] = useState("Choose Profile Picture");
  const [nicName, setNicName] = useState("Choose NIC scanned copy");
  const [docName, setDocName] = useState("Choose Qualification Document");
  return (
    <div className="container mt-4">
      <h4 className="display-5 text-center text-white mb-4">
        <i className="fab fa-file-text" /> Document Uploads
      </h4>
      <h5 className="text-white">Upload your profile picture here</h5>
      <FileUpload filename={profileName} setFilename={setProfileName} setUploadedFilePath={setUploadedProfilePath}/>
      <h5 className="text-white mt-4">Upload your NIC scanned copy here</h5>
      {/* <FileUpload file={nic} filename={nicName} onChange={onChangeNic}/> */}
      <FileUpload filename={nicName} setFilename={setNicName} setUploadedFilePath={setUploadedNicPath}/>
      <h5 className="text-white mt-4">
        Upload your Qualification document here
      </h5>
      <FormControl sx={{ width: "100%" }} className="mb-3">
        <InputLabel id="QualificationDocType">Type of the Document</InputLabel>
        <Select
          labelId="QualificationDocType"
          name="qualificationDocType"
          value={value || ""}
          label="QualificationDocType"
          onChange={handleChange}
        >
          <MenuItem value="Affidavit">Affidavit</MenuItem>
          <MenuItem value="O/L Certificate">O/L Certificate</MenuItem>
          <MenuItem value="A/L Certificate">A/L Certificate</MenuItem>
          <MenuItem value="NVQ certificate">NVQ certificate</MenuItem>
          <MenuItem value="Degree Certificate">Degree Certificate</MenuItem>
        </Select>
      </FormControl>
      {/* <FileUpload file={doc} filename={docName} onChange={onChangeDoc}/> */}
      <FileUpload filename={docName} setFilename={setDocName} setUploadedFilePath={setUploadedDocPath}/>
      <Button
        variant="contained"
        color="primary"
        style={{ width: "100%", marginTop:"20px" }}
        onClick={onSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Uploads;
