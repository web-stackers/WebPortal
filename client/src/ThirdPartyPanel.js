import ThirdPartyLayout from "./components/ThirdPartyLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewDocuments from "./pages/thirdParty/thirdPartyPanel/NewDocuments";
import VerifiedDocuments from "./pages/thirdParty/thirdPartyPanel/VerifiedDocuments";

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

function ThirdPartyPanel() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ThirdPartyLayout>
          <div className="App">
            <Routes>
              <Route exact path="/" element={<NewDocuments />} />
              <Route exact path="/verified" element={<VerifiedDocuments />} />
            </Routes>
          </div>
        </ThirdPartyLayout>
      </Router>
    </ThemeProvider>
  );
}

export default ThirdPartyPanel;
