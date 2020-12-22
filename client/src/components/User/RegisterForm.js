import React,{ useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import TextInput from '../controls/TextInput';
import { SERVER_URL } from '../../globalConstants'

function RegisterForm(props) {
  const { open, toggleDialog} = props

  const [form, setForm] = useState({
    name:'',
    email:'',
    number:''
  })

  const handleInput = (e) => {
    const { name, value} = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = () => {
    console.log(form)
    let { name, email, number } = form
    if(name.trim().length > 0 && email.trim().length > 0 && String(number).length >= 10){
      axios.post(`${SERVER_URL}/api/customer/register`,form)
        .then(res => {
          console.log(res, form)
        })
        .catch(err => {
          console.log(err)
        })
    }
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
          <Button color="primary" onClick={submitForm}>
            Register
          </Button>
        </DialogActions>
      </Dialog> 
    </>
  )
}

export default RegisterForm
