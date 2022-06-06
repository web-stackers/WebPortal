import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        outline: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            height: "fit-content",
            margin: "-5px 0 10px 0",
            borderBottom: "2px " + theme.palette.primary.light + " solid",
            padding: "0px 10px 8px 0",
          },
          search: {
            display: "flex",
            justifySelf: "flex-end",
          },
          textBox: {
            marginRight: '10px'
          },
    }
});

export default useStyles;