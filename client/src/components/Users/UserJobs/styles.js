import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        outerBox: {
            height: 400, 
            width: "100%", 
            marginTop: 25
        },
        noRows: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        }
    }
});

export default useStyles;

