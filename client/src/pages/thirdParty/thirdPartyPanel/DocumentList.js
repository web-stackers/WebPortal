import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NewDocument from "../../../services/Provider";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Sbutton from "../../../components/Sbutton";

const NewDocumentlist = () => {
  // get the provider id from react state
  const location = useLocation();
  const providerId = location.state;

  const [newDocs, setNewDocs] = useState([]);

  // get the document list for the particular provider
  const fetchDocs = () => {
    NewDocument.fetchDocumentList(providerId)
      .then((response) => {
        setNewDocs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "15px",
    },
  });

  const classes = useStyles();

  return (
    <Box>
      <Grid container className={classes.gridContainer}>
        {newDocs.map((newDoc) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 150, maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {newDoc.type}
                </Typography>
                <br />
              </CardContent>
              <div align="center">
                <Sbutton text="Download" btnWidth="150px" />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewDocumentlist;
