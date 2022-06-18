// import React, { Fragment, useState } from "react";
// import ReactDOM from "react-dom";
// import Files from "react-files";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import { Typography } from "@mui/material";

// export const ProfileUpload = (onFilesChange) => {
//   return (
//     <div className="files">
//       <Files
//         className="files-dropzone"
//         onChange={onFilesChange}
//         // onError={this.onFilesError}
//         accepts={["image/*"]}
//         multiple="false"
//         maxFiles={1}
//         maxFileSize={10000000}
//         minFileSize={0}
//         clickable
//       >
//         <Typography variant="h6">
//           <UploadFileIcon />
//           Choose a profile picture to upload
//         </Typography>
//       </Files>
//     </div>
//   );
// };

// export default ProfileUpload;

// import React, { useRef } from "react";
// import axios from "axios";
// import useFileUpload from "react-use-file-upload";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Sbutton from "../../Sbutton";

// const ProfileUpload = () => {
//   const {
//     files,
//     fileNames,
//     fileTypes,
//     totalSize,
//     totalSizeInBytes,
//     handleDragDropEvent,
//     clearAllFiles,
//     createFormData,
//     setFiles,
//     removeFile,
//   } = useFileUpload();

//   const inputRef = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = createFormData();
//     formData.append("file", files);

//     try {
//       const res = await axios.post("/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     } catch (error) {
//       console.error("Failed to submit files.");
//     }
//   };

//   return (
//     <div css={CSS}>
//       <p>
//         <UploadFileIcon />
//         Choose a profile picture to upload
//       </p>

//       <div className="form-container">
//         {/* Display the files to be uploaded */}
//         <div>
//           <ul>
//             {fileNames.map((name) => (
//               <li key={name}>
//                 <span>{name}</span>

//                 <span onClick={() => removeFile(name)}>
//                   <i className="fa fa-times" />
//                 </span>
//               </li>
//             ))}
//           </ul>

//           {files.length > 0 && (
//             <ul>
//               {/* <li>File types found: {fileTypes.join(", ")}</li>
//               <li>Total Size: {totalSize}</li>
//               <li>Total Bytes: {totalSizeInBytes}</li> */}

//               {/* <li className="clear-all"> */}
//               {/* <button onClick={() => clearAllFiles()}>Clear All</button> */}
//               {/* </li> */}
//             </ul>
//           )}
//         </div>

//         {/* Provide a drop zone and an alternative button inside it to upload files. */}
//         <div
//           onDragEnter={handleDragDropEvent}
//           onDragOver={handleDragDropEvent}
//           onDrop={(e) => {
//             handleDragDropEvent(e);
//             setFiles(e, "a");
//           }}
//         >
//           {/* <p>Drag and drop files here</p> */}

//           <Sbutton
//             onClick={() => inputRef.current.click()}
//             text="Select file"
//             btnWidth="20%"
//           />

//           {/* Hide the crappy looking default HTML input */}
//           <input
//             ref={inputRef}
//             type="file"
//             multiple="false"
//             style={{ display: "none" }}
//             onChange={(e) => setFiles(e, "a")}
//           />
//         </div>
//       </div>

//       <br />

//       <div className="submit">
//         <Sbutton onClick={handleSubmit} text="Upload" />
//       </div>
//     </div>
//   );
// };

// export default ProfileUpload;

import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";

const ProfileUpload = ({ setUploadedProfilePath, setInputs }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose profile picture");
  //   const [uploadedProfilePath, setUploadedProfilePath] = useState("");
  //   const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
    setUploadedProfilePath("");
    const file = e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      if (file.size <= 2097152) {
        //max size of profile picture is 2MB
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setMessage("");
      } else {
        setMessage("Cannot upload, Maximum file size is 2MB");
      }
    } else {
      setMessage("Cannot upload, Required file type is .png or .jpg");
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
      //   const { fileName, filePath } = res.data;
      setUploadedProfilePath(res.data.filePath);
      //   setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
      setInputs((values) => ({
        ...values,
        profilePath: res.data,
      }));
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
        <div className="custom-file mb-4 ">
          <div>
            <input
              type="file"
              className="custom-file-input form-control-sm col-xs-2"
              id="customFile"
              onChange={onChange}
            />
          </div>

          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-secondary btn-sm"
        />
      </form>
    </Fragment>
  );
};

export default ProfileUpload;
