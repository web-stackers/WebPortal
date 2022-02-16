import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        listOutline:{
            marginTop: 5,
        },
    }
});

const Userlist = () => {
    const classes = useStyles();
    
    return ( 
        <div className={classes.listOutline}>
            Users List
        </div>
     );
}
 
export default Userlist;