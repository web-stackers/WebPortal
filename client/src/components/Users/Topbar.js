import React from 'react';
import { useState } from 'react';

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import useStyles from '../../styles/usersStyles';

const Topbar = ({type, setType }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.outline}>
      <div>
        <Button variant='contained' onClick={(event) => {setOpen(event.currentTarget)}}>
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
        <TextField 
          id="searchUser" 
          label="Type username" 
          variant="outlined"
          className={classes.textBox}
          size= "small"
         />

        <Button variant="contained">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
