import React from "react";
import { useState } from "react";
import FileUpload from "../../components/formComponents/fileUpload/FileUpload";
import { FormControl, Select, InputLabel, MenuItem,Grid,
  Container,
  Paper,
  Avatar,
  Typography } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Button from "@mui/material//Button";
import useStyles from "./styles";

const Uploads = ({ handleChange, value, onSubmit, setInputs, isSubmitted }) => {
  const classes = useStyles();
  // const [profileName, setProfileName] = useState("Choose Profile Picture");
  // const [nicName, setNicName] = useState("Choose NIC scanned copy");
  // const [docName, setDocName] = useState("Choose Qualification Document");
  const [uploadedProfilePath, setUploadedProfilePath] = useState("");
  const [uploadedNicPath, setUploadedNicPath] = useState("");
  const [uploadedDocPath, setUploadedDocPath] = useState("");
  return (
    <>
    {isSubmitted ? (
      <Container component="main" maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <DoneAllIcon />
        </Avatar>
        <Typography variant="h5">All Done</Typography>
        <Typography variant="h7" mt={2}>You will receive an email about the verification of the documents that you have uploaded within a day</Typography>
        <Typography variant="h7" mt={3}><span style={{ color:"red"}}>Note: </span>You cannot login to the app until you receive an <span style={{ fontWeight: "bold"}}>"Successfully Verified"</span> email</Typography>
      </Paper>
    </Container>
    ):(
      <div className="container mt-4">
      <h4 className="display-5 text-center text-white mb-4">
        <i className="fab fa-file-text" /> Document Uploads
      </h4>
      <h6 className="text-white">Upload your profile picture here</h6>
      <FileUpload
        type="Profile Picture"
        uploadedFilePath={uploadedProfilePath}
        setUploadedFilePath={setUploadedProfilePath}
        setInputs={setInputs}
      />
      <h6 className="text-white mt-4">Upload your NIC scanned copy here</h6>
      {/* <FileUpload file={nic} filename={nicName} onChange={onChangeNic}/> */}
      <FileUpload
        type="NIC scanned copy"
        uploadedFilePath={uploadedNicPath}
        setUploadedFilePath={setUploadedNicPath}
        setInputs={setInputs}
      />

      <FormControl sx={{ width: "100%" }} className="mt-4">
        <InputLabel id="QualificationDocType">
          Type of the Qualification Document
        </InputLabel>
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
      {value ? (
        <>
          <h6 className="text-white mt-3">
            Upload your Qualification document here
          </h6>

          <FileUpload
            type="Qualification Document"
            uploadedFilePath={uploadedDocPath}
            setUploadedFilePath={setUploadedDocPath}
            setInputs={setInputs}
            style={{ marginBottom: "30px" }}
          />
        </>
      ) : null}

      {uploadedProfilePath && uploadedNicPath && uploadedDocPath ? (
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", marginTop: "20px", marginBottom: "40px" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      ) : null}
    </div>
    )}
    </>
    
    
  );
};

export default Uploads;
