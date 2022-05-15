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

const ConsumerDetails = ({user, id}) => {

    return(
        <>
            <Card className="userDetails">
                <CardContent>
                    <Typography variant="h5">
                        Personal
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Mobile </b> <br/> {user.contact.mobile} <br/>
                        <b>Email </b> <br/> {user.contact.email} <br/>
                        <b>Registered Date </b> <br/> {user.registeredDate}
                    </Typography>
                </CardContent>
            </Card>

            <Card className="userDetails">
                <CardContent>
                    <Typography variant="h5">
                        Jobs
                    </Typography>
                    <UserJobs type="consumer" id={id}/>  
                </CardContent>
            </Card>
        </>

        
    )
}

export default ConsumerDetails;