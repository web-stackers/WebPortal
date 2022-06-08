import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Jobs from "./pages/jobType/Jobs";
import JobEdit from "./pages/jobType/JobEdit";
import ResponseToComplaint from "./pages/complaints/ResponseToComplaint";
import AddNewThirdParty from "./pages/thirdParty/AddNewThirdParty";
import ThirdParty from "./pages/thirdParty/ThirdParty";
import Complaint from "./pages/complaints/Complaints";
import ThirdPartyProfile from "./pages/thirdParty/ThirdPartyProfile";
import Withdrawal from "./pages/withdrawals/Withdrawal";
import Layout from "./components/Layout";
import Profile from "./pages/users/Profile";
import NotFound from "./pages/NotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#673ab7",
      light: "#2e2e2e",
    },
    secondary: {
      main: "#422574",
      light: "#1a1a1a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route exact path="/users" element={<Users />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/jobEdit" element={<JobEdit />} />
              <Route path="/complaints" element={<Complaint />} />
              <Route path="/thirdParty" element={<ThirdParty />} />
              <Route
                path="/thirdParty/addNewThirdParty"
                element={<AddNewThirdParty />}
              />
              <Route
                path="/thirdParty/thirdPartyProfile"
                element={<ThirdPartyProfile />}
              />
              <Route
                path="/responseToComplaint"
                element={<ResponseToComplaint />}
              />
              <Route path="/withdrawals" element={<Withdrawal />} />
              <Route path="/users/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
