import { makeStyles } from "@mui/styles";

const drawerWidth = "18%";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: `calc(100% - ${drawerWidth})`,
      padding: "10px",
      marginLeft: "15px",
      color: "white",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: "30px 10px",
      backgroundColor: theme.palette.primary.main + "!important",
      color: "white !important",
    },
    root: {
      display: "flex",
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}) !important`,
      padding: "0 10px",
      backgroundColor: theme.palette.primary.light + "!important",
    },
    title: {
      height: "25%",
      margin: "25% auto",
    },
    htoolbar: theme.mixins.toolbar,
    pageTitle: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    active: {
      backgroundColor: theme.palette.secondary.main + "!important",
    },
    children: {
      marginTop: '20px'
    }
  };
});

export default useStyles;
