import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    variant = 'outlined',
    ...other
  } = props;
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
