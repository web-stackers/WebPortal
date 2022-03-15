import { useEffect, useState } from "react";
import NewProvider from "../../services/Provider";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Sbutton from "../Sbutton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "15px",
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
    <Box>
      <Grid container className={classes.gridContainer}>
        {newProviders.map((newProvider) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 150, maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newProvider.name.fName + " " + newProvider.name.lName}
                </Typography>
                <br />
              </CardContent>
              <div align="center">
                <Link
                  to="/newDocumentlist"
                  state={newProvider._id}
                  className="link"
                >
                  <Sbutton text="Open" btnWidth="150px" />
                </Link>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewProviderlist;
