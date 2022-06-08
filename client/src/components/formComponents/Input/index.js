import React from 'react'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Grid, TextField,InputAdornment, IconButton } from '@mui/material';

const Input = ({name, handleChange,handleBlur, label, value,error,errorText, half, autoFocus, type, handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6:12}>
        <TextField
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            required
            fullWidth
            label={label}
            value={value}
            error={error}
            helperText={errorText}
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
