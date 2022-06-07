import React from 'react';
import { useState } from 'react';

import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from '@mui/icons-material/Cached';

import Consumer from "../../../services/Consumer";
import Provider from "../../../services/Provider";
import useStyles from './styles';

const Topbar = ({ type, setType, setUsers, fetchUsers, setAlertOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  // Search user by the username 
  const searchUser = () => {
    if(searchKey===''){
      setAlertOpen(true);
    } else if(type=='Consumers'){
      Consumer.searchConsumer(searchKey)
        .then((response) => {
          setUsers(response.data);
          setSearchKey('');
          setShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      Provider.searchProvider(searchKey)
        .then((response) => {
          setUsers(response.data);
          setSearchKey('');
          setShow(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className={classes.outline}>
      <div>
        <Button variant='contained' style={{outline:'none'}} onClick={(event) => {setOpen(event.currentTarget)}}>
          {type} <ArrowDropDownIcon />
        </Button>

        <Menu
          anchorEl={open}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {handleClose(); setType('Consumers');}}>Consumers</MenuItem>
          <MenuItem onClick={() => {handleClose(); setType('Providers');}}>Providers</MenuItem>
        </Menu>
      </div>

      

      <div className={classes.search}>
        {show && <Button variant="contained" style={{marginRight:'10px'}} onClick={() => {fetchUsers(); setShow(false)}}>
            Reset <CachedIcon />
        </Button>}

        <TextField 
          id="searchUser" 
          name="searchKey"
          label="Type username" 
          variant="outlined"
          size= "small"
          autoComplete='off'
          value={searchKey}
          onChange={(event) => setSearchKey(event.target.value)}
         />

        <Button variant="contained" onClick={(searchKey) => {searchUser()}}>
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
