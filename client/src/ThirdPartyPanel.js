import ThirdPartyLayout from "./components/ThirdPartyLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewProviders from "./pages/thirdParty/thirdPartyPanel/NewProviders";
import VerifiedProviders from "./pages/thirdParty/thirdPartyPanel/VerifiedProviders";
import DocumentList from "./pages/thirdParty/thirdPartyPanel/DocumentList";

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
              <Route exact path="/" element={<NewProviders />} />
              <Route exact path="/verified" element={<VerifiedProviders />} />
              <Route exact path="/documentlist" element={<DocumentList />} />
            </Routes>
          </div>
        </ThirdPartyLayout>
      </Router>
    </ThemeProvider>
  );
}

export default ThirdPartyPanel;
