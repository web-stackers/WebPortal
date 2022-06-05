import { makeStyles } from "@mui/styles";
import dateFormat from "dateformat";
import Typography from '@mui/material//Typography';
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';

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
                        <b>Applied Date : </b> <br/> {dateFormat(user.appliedDate, "yyyy-mm-dd")} <br/>
                        <b>{verified && "Verified Date : "} </b> {verified && dateFormat(user.verification.date, "yyyy-mm-dd")} <br/>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default ProviderDetails;