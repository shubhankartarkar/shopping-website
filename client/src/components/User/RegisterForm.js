import React,{ useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import TextInput from '../../controls/TextInput';

function RegisterForm(props) {
  const { open, toggleDialog} = props

  const [form, setForm] = useState({
    name:'',
    email:'',
    number:null
  })

  const handleInput = (e) => {
    const { name, value} = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <>
      <Dialog fullWidth disableBackdropClick open={open} onClose={toggleDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <TextInput name="name" label="Customer Name" value={form.name} onChange={handleInput} />
          <TextInput name="email" label="Customer Email" value={form.email} onChange={handleInput} />
          <TextInput name="number" label="Customer Phone Number" value={form.number} onChange={handleInput} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
          <Button  color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog> 
    </>
  )
}

export default RegisterForm
