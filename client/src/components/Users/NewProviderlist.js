import { useEffect, useState } from "react";
import NewProvider from "../../services/Provider";
import BasicCard from "../BasicCard";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
});

const NewProviderlist = () => {
  const [newProviders, setNewProviders] = useState([]);

  const fetchUsers = () => {
    NewProvider.fetchNewProviders()
      .then((response) => {
        setNewProviders(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} className={classes.gridContainer}>
        {newProviders.map((newProvider) => (
          <Grid item xs={4}>
            <BasicCard
              text={newProvider.name.fName + " " + newProvider.name.lName}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewProviderlist;
