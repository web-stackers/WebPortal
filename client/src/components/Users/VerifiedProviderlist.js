import { useEffect, useState } from "react";
import VerifiedProvider from "../../services/Provider";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
      <Grid container className={classes.gridContainer}>
        {verifiedProviders.map((verifiedProvider) => (
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ minHeight: 150, maxWidth: 300 }}>
              <CardContent>
                <Typography variant="h5" textAlign="center">
                  {verifiedProvider.name.fName +
                    " " +
                    verifiedProvider.name.lName}
                </Typography>
                <br />
              </CardContent>
              <Stack spacing={1} alignItems="center">
                <Stack direction="row" spacing={4}>
                  <Chip
                    label={verifiedProvider.qualification}
                    color="primary"
                  />
                  {verifiedProvider.verification.isAccepted === true ? (
                    <Chip label="Accepted" color="success" />
                  ) : (
                    <Chip label="Rejected" color="error" />
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VerifiedProviderlist;
