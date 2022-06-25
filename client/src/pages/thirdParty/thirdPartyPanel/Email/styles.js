import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      backgroundColor: "transparent !important",
      width: "60%",
      margin: "auto",
    },

    card: { width: "80%", margin: "auto" },

    details: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      width: "80%",
    },

    div: {
      marginBottom: 20,
    },

    btn: { width: 200, align: "center" },
  };
});

export default useStyles;
