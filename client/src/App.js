import Dashboard from "./pages/Dashboard";
import Users from "./pages/users/Users";
import Jobs from "./pages/jobType/Jobs";
import Complaints from "./pages/complaints/Complaints";
import ResponseToComplaint from "./pages/complaints/ResponseToComplaint";
import AddNewThirdParty from "./pages/thirdParty/AddNewThirdParty";
import ThirdParty from "./pages/thirdParty/ThirdParty";
import ThirdPartyProfile from "./pages/thirdParty/ThirdPartyProfile";
import Withdrawal from "./pages/withdrawals/Withdrawal";
import AllWithdrawals from "./pages/withdrawals/AllWithdrawals";
import Layout from "./components/Layout";
import Profile from "./pages/users/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/thirdParty" element={<ThirdParty />} />
              <Route path="/addNewThirdParty" element={<AddNewThirdParty />} />
              <Route
                path="/thirdPartyProfile"
                element={<ThirdPartyProfile />}
              />
              <Route path="/withdrawals" element={<Withdrawal />} />
              <Route path="/Allwithdrawals" element={<AllWithdrawals />} />
              <Route
                path="/ResponseToComplaint"
                element={<ResponseToComplaint />}
              />
              <Route path="/users/profile" element={<Profile />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
