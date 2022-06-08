import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        notFound: {
            textAlign: 'center',
            paddingTop: 180
        },
        statusCode: {
            fontSize: 100
        },
        message: {
            fontSize: 20
        }
    }
});

export default useStyles;