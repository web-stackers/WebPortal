import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      backgroundColor: "transparent !important",
      width: "60%",
      margin: "auto",
      alignItems:'center'
    },
    details: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      width: "80%",
    },
    content: {
      color:'primary', fontSize:12, textAlign:'center'
    },
    cover: {
      width: "20%",
    },
    div: {
      justifyItems: "center"
    },
    btn: { marginTop: 15, alignItems: "flex-end" },
  };
});

export default useStyles;
