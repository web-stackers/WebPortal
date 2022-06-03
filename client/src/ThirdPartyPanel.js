import ThirdPartyLayout from "./components/ThirdPartyLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewProviders from "./pages/thirdParty/thirdPartyPanel/newProviders/NewProviders";
import NewDocumentList from "./pages/thirdParty/thirdPartyPanel/newProviders/NewDocumentList";
import VerifiedDocumentlist from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedDocumentList";
import VerifiedProviders from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedProviders";

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
              <Route
                exact
                path="/newDocumentlist"
                element={<NewDocumentList />}
              />
              <Route
                exact
                path="/verifiedDocumentlist"
                element={<VerifiedDocumentlist />}
              />
            </Routes>
          </div>
        </ThirdPartyLayout>
      </Router>
    </ThemeProvider>
  );
}

export default ThirdPartyPanel;
