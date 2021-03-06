import dateFormat from "dateformat";
import Typography from '@mui/material//Typography';
import Card from '@mui/material//Card';
import CardContent from '@mui/material//CardContent';

import useStyles from "./styles";

// Details of consumer 
const ConsumerDetails = ({user, id}) => {
    const classes = useStyles();

    return(
        <>
            <Card className="userDetails">
                <CardContent>
                    <Typography variant="h5">
                        Personal
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Mobile </b> <br/> {user?.contact?.mobile} <br/>
                        <b>Email </b> <br/> {user?.contact?.email} <br/>
                        <b>Registered Date </b> <br/> {dateFormat(user?.appliedDate, "yyyy-mm-dd")}
                    </Typography>
                </CardContent>
            </Card>
        </>
        
    )
}

export default ConsumerDetails;