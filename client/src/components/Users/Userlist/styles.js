import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
          userName: {
            display: "flex",
            alignItems: "center",
          },
          userImage: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
          },
          actionBtn: {
            display: "flex",
            margin: "auto",
            textDecoration: "none",
          },
          verifiedIcon: {
            marginLeft:8, 
            color: theme.palette.primary.main
          },
          outerBox:{
            height: 500, 
            width: "100%"
          },
          innerBox: {
            display: "flex", 
            height: "100%"
          }
    }
});

export default useStyles;