import { useEffect, useState } from "react";
import VerifiedProvider from "../../../../services/Provider";
import { CardHeader, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Sbutton from "../../../../components/Sbutton";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "15px",
  },
});

const VerifiedProviderlist = () => {
  const [verifiedProviders, setVerifiedProviders] = useState([]);

  const fetchUsers = () => {
    VerifiedProvider.fetchVerifiedProviders()
      .then((response) => {
        setVerifiedProviders(response.data);
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
      <Grid container className={classes.gridContainer} rowSpacing={4}>
        {verifiedProviders.map((verifiedProvider) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 200, maxWidth: 300 }}>
              <CardHeader
                title={
                  <Typography variant="h5" textAlign="center">
                    {verifiedProvider.name.fName +
                      " " +
                      verifiedProvider.name.lName}
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={1} alignItems="center">
                  <Stack direction="row" spacing={4}>
                    <Chip label={verifiedProvider.qualification} color="info" />
                    {/* <Chip
                      label={verifiedProvider.verification.date}
                      color="success"
                    /> */}
                  </Stack>
                </Stack>
              </CardContent>
              <br />
              <div align="center">
                <Link
                  to="/verifiedDocumentlist"
                  state={verifiedProvider._id}
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

export default VerifiedProviderlist;
