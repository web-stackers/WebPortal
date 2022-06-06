import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import dateFormat from "dateformat";
import Typography from '@mui/material//Typography';
import { Grid } from "@mui/material";
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';

import JobCategory from "../../services/JobCategory";

const useStyles = makeStyles((theme) => ({
    userDetails: {
        borderTop: 15,
        backgroundColor: 'transparent !important',
        color: 'white !important',
    },
}));

// Details of provider 
const ProviderDetails = ({user, verified, id}) => {
    const classes = useStyles();

    const [job, setJob] = useState();

    const fetchJob = () => {
        JobCategory.fetchJob(user.jobType)
        .then((response) => {
            setJob(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        fetchJob();
    }, [])

    return(
        <>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={6}>
                    <Card className="userDetails">
                        <CardContent>
                        <Typography variant="h5">
                                Personal
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>Mobile : </b> <br/> {user.contact.mobile} <br/>
                                <b>Email : </b> <br/> {user.contact.email} <br/>
                                <b>Applied Date : </b> <br/> {dateFormat(user.appliedDate, "yyyy-mm-dd")} <br/>
                                {verified && <b>Verified Date : </b>} <br/>
                                {verified && dateFormat(user.verification.date, "yyyy-mm-dd")} <br/>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={6}>
                    {job && <Card className="userDetails">
                        <CardContent>
                        <Typography variant="h5">
                                Job Details
                            </Typography>
                            <Typography variant="subtitle1">
                                <b>JobType : </b> <br/> {job.jobType} <br/>
                                <b>Category : </b> <br/> {job.category} <br/>
                                <b>Description : </b> <br/> {job.description} <br/>
                                <b>Experience : </b> <br/> {'From ' + dateFormat(user.workStartedYear, "yyyy-mm-dd")} <br/>
                            </Typography>
                        </CardContent>
                    </Card>}
                </Grid>
            </Grid>
        </>
    )
}

export default ProviderDetails;