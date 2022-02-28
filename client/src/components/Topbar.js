import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => {
  return {
    outline: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 18,
      height: "fit-content",
      margin: "-5px 0 10px 0",
      borderBottom: "2px " + theme.palette.primary.light + " solid",
      padding: "0px 10px 8px 0",
    },
    type: {
      display: "flex",
      flexGrow: 2,
      alignItems: "center",
      cursor: "pointer",
    },
    search: {
      display: "flex",
      justifySelf: "flex-end",
    },
    userType: {
      width: "25%",
      cursor: "pointer",
    },
    textBox: {
      marginRight: "10px",
    },
  };
});

const Topbar = ({ onClickConsumer, onClickProvider }) => {
  const classes = useStyles();

  return (
    <div className={classes.outline}>
      <div className={classes.type}>
        <Typography
          button
          className={classes.userType}
          onClick={onClickConsumer}
        >
          Consumers
        </Typography>
        <Typography
          button
          className={classes.userType}
          onClick={onClickProvider}
        >
          Providers
        </Typography>
      </div>

      <div className={classes.search}>
        <TextField
          id="searchUser"
          label="Type username"
          variant="outlined"
          className={classes.textBox}
          size="small"
        />

        <Button variant="contained">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
