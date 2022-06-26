import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      backgroundColor: "transparent !important",
      width: "60%",
      margin: "auto",
      paddingBottom:15
    },

    card: { width: "80%", margin: "auto" },

    details: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      width: "80%",
    },

    div: {
      marginTop:15,
      marginBottom: 15,
    },

    btn: { width: 200, align: "center" },
  };
});

export default useStyles;
