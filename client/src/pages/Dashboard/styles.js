import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        gridContainer: {
            paddingRight: "30px",
            margin: "auto"
        },
        root: {
            display: 'flex',
            height: '200px',
            backgroundColor: 'transparent !important',
        }
    }
});

export default useStyles;