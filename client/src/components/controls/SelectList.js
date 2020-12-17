
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

function SelectList(props) {
  const classes = useStyles();
  const { name, label, value, data, onChange, listValue, listText } = props
  return (
    <>
       <FormControl required className={classes.formControl}>
        <InputLabel>{label}{value}</InputLabel>
        <Select variant="outlined" value={value} onChange={onChange} name={name} className={classes.selectEmpty}>
          {data.map((item) => (
            <MenuItem key={item[listValue]} value={item[listValue]}>{item[listText]}</MenuItem>
          ))}
        </Select>
      </FormControl> 
    </>
  )
}

export default SelectList
