import React, { Fragment, useState } from "react";
import Message from "./Message";
// import Progress from "./Progress";
import axios from "axios";
import useStyles from "./styles";


const FileUpload = ({
  type,
  uploadedFilePath,
  setUploadedFilePath,
  setInputs,
}) => {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose " + type);
  // const [uploadedFilePath, setUploadedFilePath] = useState({});
  const [message, setMessage] = useState("");
  // const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setUploadedFilePath("");
    if (type === "Profile Picture") {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        if (file.size <= 2097152) {
          //max size of profile picture is 2MB
          setFile(file);
          setFilename(file.name);
          setMessage("");
        } else {
          setFile("");
          setFilename("Choose " + type);
          setMessage("Cannot upload, Maximum file size is 2MB");
        }
      } else {
        setFile("");
        setFilename("Choose " + type);
        setMessage("Cannot upload, Required file type is .png or .jpg");
      }
    } else {
      if (file.type === "application/pdf") {
        if (file.size <= 1048576) {
          //max size of nic scanned or qualification dic is 1MB
          setFile(file);
          setFilename(file.name);
          setMessage("");
        } else {
          setFile("");
          setFilename("Choose " + type);
          setMessage("Cannot upload, Maximum file size is 1MB");
        }
      } else {
        setFile("");
        setFilename("Choose " + type);
        setMessage("Cannot upload, Required file type is .pdf");
      }
    }
    // if(type==="NIC scanned copy" || type==="Qualification Document"){
    //   setInputs((values) => ({ ...values, nicPath: uploadedFilePath.filePath }));
    // }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // onUploadProgress: progressEvent => {
        //   setUploadPercentage(
        //     parseInt(
        //       Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //     )
        //   );
        // }
      });

      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);

      // const { filePath } = res.data;
      console.log(res.data);
      await setUploadedFilePath(res.data.filePath);
      //   .then(() =>
      //   setMessage("File Uploaded")
      // );

      setMessage("File Uploaded");
      // setTimeout(() => setMessage("File Uploaded"), 2000);
      // console.log(res.data.filePath);
      console.log(uploadedFilePath);
      if (type === "Profile Picture") {
        setInputs((values) => ({
          ...values,
          profilePath: res.data.filePath,
        }));
      }
      if (type === "NIC scanned copy") {
        setInputs((values) => ({
          ...values,
          nicPath: res.data.filePath,
        }));
      }
      if (type === "Qualification Document") {
        setInputs((values) => ({
          ...values,
          docPath: res.data.filePath,
        }));
      }
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      // setUploadPercentage(0)
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}
        {/* <Sbutton text="Upload" type="submit" onClick={onSubmit} /> */}
        <input
          type="submit"
          value="Upload"
          className="btn btn-secondary btn-block"
        />
      </form>
      {/* {uploadedFilePath ? (
        <div className='row mt-5'>
        <div className='col-md-6 m-auto'>
          <h3 className='text-center'>{uploadedFile.fileName}</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
        </div>
      </div>
      ) : null} */}
    </Fragment>
  );
};

export default FileUpload;
