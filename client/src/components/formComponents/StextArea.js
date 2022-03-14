import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { createMuiTheme,MuiThemeProvider } from "@material-ui/core";
import * as React from "react";

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "outlined"
      
    }
  }
});

const StextArea = () => {
  const [text, setText] = React.useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <MuiThemeProvider theme={theme}>
    <Grid container direction="row" spacing={1}>
      <Grid item sm={6}>
        <TextField
          sx={{ width: "70ch" }}
          multiline
          label="Response"
          InputProps={{
            inputComponent: TextareaAutosize,
            rows: 3
          }}
          value={text}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  </MuiThemeProvider>
  );
};

export default StextArea;
