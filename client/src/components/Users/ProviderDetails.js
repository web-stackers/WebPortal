import { makeStyles } from "@mui/styles";
import Typography from '@mui/material//Typography';
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';

import UserJobs from "./UserJobs";

const useStyles = makeStyles((theme) => ({
    userDetails: {
        borderTop: 15,
        backgroundColor: 'transparent !important',
        color: 'white !important',
    },
}));

const ProviderDetails = ({user, id}) => {

    return(
        <>
            <Card className="userDetails">
                <CardContent>
                <Typography variant="h5">
                        Personal
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Mobile : </b> <br/> {user.contact.mobile} <br/>
                        <b>Email : </b> <br/> {user.contact.email} <br/>
                        <b>Applied Date : </b> <br/> {user.appliedDate}
                    </Typography>
                </CardContent>
            </Card>

            <Card className="userDetails">
                <CardContent>
                    <Typography variant="h5">
                        Jobs
                    </Typography>        
                    <UserJobs type="provider" id={id}/>           
                </CardContent>
            </Card>
        </>
    )
}

export default ProviderDetails;