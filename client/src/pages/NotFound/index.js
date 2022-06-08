import useStyles from "./styles";

const NotFound = () => {
    const classes = useStyles();

    return ( 
        <div className={classes.notFound}>
            <p className={classes.statusCode}>404</p>
            <p className={classes.message}>Page Not Found</p> <br />
        </div>
     );
}
 
export default NotFound;