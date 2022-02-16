import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const StextField = ({label,name,value,onChange,type}) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '70ch' },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
            required
            variant="outlined"
            color="primary"
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            type={type}
        />      
      </Box>
    </div>
  ) 
};

export default StextField;
