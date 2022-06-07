import React, { Fragment, useState } from "react";
import Message from "./Message";
import axios from "axios";

const FileUpload = ({
  type,
  uploadedFilePath,
  setUploadedFilePath,
  setInputs,
}) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose " + type);
  const [message, setMessage] = useState("");

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
      });
      console.log(res.data);
      setUploadedFilePath(res.data.filePath);

      setMessage("File Uploaded");
      console.log(uploadedFilePath);
      if (type === "Profile Picture") {
        setInputs((values) => ({
          ...values,
          profilePath: res.data,
        }));
      }
      if (type === "NIC scanned copy") {
        setInputs((values) => ({
          ...values,
          nicPath: res.data,
        }));
      }
      if (type === "Qualification Document") {
        setInputs((values) => ({
          ...values,
          docPath: res.data,
        }));
      }
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
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
        <input
          type="submit"
          value="Upload"
          className="btn btn-secondary btn-block"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
