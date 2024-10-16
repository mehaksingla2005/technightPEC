import React from 'react';
import { TextField } from '@mui/material';

const CustomizedInput = (props) => {
  return (
    <TextField margin='normal' InputLabelProps={{style:{color:"white"}}} name={props.name} label={props.label} type={props.type}
    InputProps={{style:{width:"400px",fontSize:"20px",color:"white"}}} />
  );
};

export default CustomizedInput;
