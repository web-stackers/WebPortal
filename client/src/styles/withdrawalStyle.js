import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //class name for card
  //The flex layout allows responsive elements within a container to be automatically arranged depending upon screen size. Flex container becomes flexible by setting the display property to flex
  root: {
    display: "flex",
    height: "150px",
    backgroundColor: "transparent !important",
    color: "white",
  },
  //class name for div where card content tag is present
  details: {
    display: "flex",
    flexDirection: "column",
    padding: " 25px 60px",
    width: "70%",
  },
}));

export default useStyles;
