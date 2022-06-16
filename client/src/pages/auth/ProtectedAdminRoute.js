import React from 'react'
import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";

const ProtectedAdminRoute = ({user, setUser}) => {
   // const [admin, setAdmin] = useState(localStorage.getItem("profile").result.role==="Admin"?true:null);
    // const [admin, setAdmin] = true;
    return (user?.result?.role==="Admin" ? <Layout user={user} setUser={setUser} /> : <Navigate to="/signin" />);
}

export default ProtectedAdminRoute;
