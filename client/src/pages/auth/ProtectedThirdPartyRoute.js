import React from 'react'
import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";

const ProtectedThirdPartyRoute = ({user, setUser}) => {
  // const [thirdParty, setThirdParty] = useState(localStorage.getItem("profile").role==="Third Party"?true:null);
//   const [thirdParty, setThirdParty] = false;
  return (user?.result?.role==="Third Party" ? <Layout user={user} setUser={setUser}/> : <Navigate to="/signin" />);
}

export default ProtectedThirdPartyRoute
