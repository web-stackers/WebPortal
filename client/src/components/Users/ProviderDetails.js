import { makeStyles } from "@mui/styles";
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
const ProviderDetails = ({user, id}) => {
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
                        <b>Applied Date : </b> <br/> {user.appliedDate}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default ProviderDetails;