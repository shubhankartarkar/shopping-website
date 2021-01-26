
import React from 'react';
import { makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectQuantity(props) {
  const classes = useStyles();
  const { name, label = '', value, data, onChange, orderItemId } = props
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={(event) => onChange(event,orderItemId)} name={name} className={classes.selectEmpty}>
        {data.map((item) => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectQuantity
