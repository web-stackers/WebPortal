import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Jobs from "./pages/Jobs";
import Complaints from "./pages/Complaints";
import AddNewThirdParty from "./pages/thirdParty/AddNewThirdParty";
import ThirdParty from "./pages/thirdParty/ThirdParty";
import Withdrawal from "./pages/withdrawals/Withdrawal";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#673ab7",
      light: "#1F2221",
    },
    secondary: {
      main: "#ffffff",
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
              <Route path="/withdrawals" element={<Withdrawal />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
