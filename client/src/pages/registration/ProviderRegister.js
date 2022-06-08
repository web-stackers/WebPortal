import { createTheme, ThemeProvider } from "@mui/material/styles";
import Registration from "./Registration";
import Registration_valid from "./Registration_valid";

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
const ProviderRegister = () => {

  return (
    <ThemeProvider theme={theme}>
      <Registration />
      {/* <Registration_valid /> */}
    </ThemeProvider>
  );
};

export default ProviderRegister;
