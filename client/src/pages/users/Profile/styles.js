import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            height: "200px",
            backgroundColor: "transparent !important",
        },
        details: {
            display: "flex",
            flexDirection: "column",
            padding: 10,
            width: "50%",
        },
        content: {
            flex: "1 0 auto",
        },
        cover: {
            width: "20%",
        },
        btngrp: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "50%",
            alignSelf: "center",
        },
        btn: {
            width: "200px",
        },
        verifiedIcon: {
            marginLeft: 8,
            color: theme.palette.primary.main,
        },
        loading: {
            justifyContent: "center",
            alignSelf: "center"
        }
    }
});

export default useStyles;

