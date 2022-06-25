import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      backgroundColor: "transparent !important",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      width: "80%",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: "20%",
    },
    div: {
      marginLeft: 20,
    },
    btn: {marginTop:15, alignItems:'flex-end'},
  };
});

export default useStyles;
