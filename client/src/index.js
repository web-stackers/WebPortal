import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThirdPartyPanel from "./ThirdPartyPanel";
import Registration from "./pages/registration/Registration";
import FileUpload from "./components/formComponents/fileUpload/FileUpload"

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <ThirdPartyPanel/> */}
    {/* <FileUpload/> */}
    {/* <Registration/> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
