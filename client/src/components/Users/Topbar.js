import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Sbutton from '../Sbutton';
import StextField from '../StextField';

const useStyles = makeStyles((theme) => {
    return {
        outline: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            height: 'fit-content',
            marginTop: -5,
            borderBottom: '2px white solid',
            padding: '0px 10px'
        },
        type: {
            display: 'flex',
            justifyContent: 'space-around',
            flexGrow: 2
        },
        search: {
            display: 'flex',
            justifyContent: 'space-around',
            justifySelf: 'flex-end'
        }
    }
});

const Topbar = () => {
    const classes = useStyles();
    const handleClick = () => {
        alert("Search button clicked !");
    }

    return ( 
        <div className={classes.outline}>
            <div className={classes.type}>
                <p>Consumers</p>
                <p>Providers</p>
            </div>
            <div className={classes.search}>
                <StextField />
                <Button>
                    <SearchIcon />
                </Button>
            </div>
        </div>
     );
}
 
export default Topbar;