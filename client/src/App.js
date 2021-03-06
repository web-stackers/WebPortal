import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Jobs from "./pages/jobType/Jobs";
import JobEdit from "./pages/jobType/JobEdit";
import ResponseToComplaint from "./pages/complaints/ResponseToComplaint";
import AddNewThirdParty from "./pages/thirdParty/AddNewThirdParty";
import ThirdParty from "./pages/thirdParty/ThirdParty";
import Complaint from "./pages/complaints/Complaints";
import ThirdPartyProfile from "./pages/ThirdPartyProfile";
import Withdrawal from "./pages/withdrawals/Withdrawal";
import Profile from "./pages/users/Profile";
import NotFound from "./pages/NotFound";
import Registration_valid from "./pages/registration/Registration_valid";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import NewProviders from "./pages/thirdParty/thirdPartyPanel/newProviders/NewProviders";
import NewDocumentList from "./pages/thirdParty/thirdPartyPanel/newProviders/NewDocumentList";
import VerifiedDocumentlist from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedDocumentList";
import VerifiedProviders from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedProviders";
import Document from "./pages/thirdParty/thirdPartyPanel/Document";
import ThirdPartyPanelProfile from "./pages/thirdParty/thirdPartyPanel/profile/Profile";
import SendMail from "./pages/thirdParty/thirdPartyPanel/Email/Email";

import ProtectedAdminRoute from "./pages/auth/ProtectedAdminRoute";
import ProtectedThirdPartyRoute from "./pages/auth/ProtectedThirdPartyRoute";

import Auth from "./pages/auth/Auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#723ab7",
      light: "#2e2e2e",
    },
    secondary: {
      main: "#522e87",
      light: "#1a1a1a",
    },
    tertiary: {
      main: "#ffffff",
      light: "#595858",
    },
  },
});

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("profile"));
  });

  const [primaryUser, setPrimaryUser] = useState("Consumers");
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/signin" />} />
          <Route
            exact
            path="/signin"
            element={
              <Auth role={user?.result?.role} setUser={setUser} user={user} />
            }
          />
          <Route exact path="/register" element={<Registration_valid />} />
          <Route
            exact
            path="/thirdParty"
            element={<ProtectedThirdPartyRoute user={user} setUser={setUser} />}
          >
            <Route
              exact
              path="/thirdParty"
              element={<Navigate to="/thirdParty/new" />}
            />
            <Route path="new" element={<NewProviders />} />
            <Route path="verified" element={<VerifiedProviders />} />
            <Route path="newDocumentlist" element={<NewDocumentList />} />
            <Route
              path="verifiedDocumentlist"
              element={<VerifiedDocumentlist />}
            />
            <Route path="document" element={<Document />} />
            <Route
              path="thirdPartyPanelProfile"
              element={<ThirdPartyPanelProfile />}
            />
            <Route path="sendMail" element={<SendMail />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            exact
            path="/admin"
            element={<ProtectedAdminRoute user={user} setUser={setUser} />}
          >
            <Route
              exact
              path="/admin"
              element={<Navigate to="/admin/dashboard" />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="users"
              element={
                <Users
                  primaryUser={primaryUser}
                  setPrimaryUser={setPrimaryUser}
                />
              }
            />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/jobEdit" element={<JobEdit />} />
            <Route path="complaints" element={<Complaint />} />
            <Route path="thirdParty" element={<ThirdParty />} />
            <Route
              path="thirdParty/addNewThirdParty"
              element={<AddNewThirdParty />}
            />
            <Route
              path="thirdParty/thirdPartyProfile"
              element={<ThirdPartyProfile />}
            />
            <Route
              path="responseToComplaint"
              element={<ResponseToComplaint />}
            />
            <Route path="withdrawals" element={<Withdrawal />} />
            <Route path="users/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
