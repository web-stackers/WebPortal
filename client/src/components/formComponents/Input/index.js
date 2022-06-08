import React from 'react'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Grid, TextField,InputAdornment, IconButton } from '@mui/material';

const Input = ({name, handleChange, label, value, half, autoFocus, type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6:12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            value={value}
            autoFocus={autoFocus}
            type={type}
            InputProps={name=='password' && {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type=='password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </Grid>
  )
}

export default Input
