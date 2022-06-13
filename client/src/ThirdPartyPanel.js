import ThirdPartyLayout from "./components/ThirdPartyLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewProviders from "./pages/thirdParty/thirdPartyPanel/newProviders/NewProviders";
import NewDocumentList from "./pages/thirdParty/thirdPartyPanel/newProviders/NewDocumentList";
import VerifiedDocumentlist from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedDocumentList";
import VerifiedProviders from "./pages/thirdParty/thirdPartyPanel/verifiedProviders/VerifiedProviders";
import Document from "./pages/thirdParty/thirdPartyPanel/Document";

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
              <Route exact path="/" element={<Navigate to="/new" />} />
              <Route path="/new" element={<NewProviders />} />
              <Route path="/verified" element={<VerifiedProviders />} />
              <Route path="/newDocumentlist" element={<NewDocumentList />} />
              <Route
                path="/verifiedDocumentlist"
                element={<VerifiedDocumentlist />}
              />
              <Route path="/document" element={<Document />} />
            </Routes>
          </div>
        </ThirdPartyLayout>
      </Router>
    </ThemeProvider>
  );
}

export default ThirdPartyPanel;
