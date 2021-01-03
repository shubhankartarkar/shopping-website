import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import TextInput from '../controls/TextInput';
import SnackBar from '../controls/SnackBar';
import LoginForm from './LoginForm';
import { SERVER_URL } from '../../globalConstants'

function RegisterForm(props) {
  const { open, toggleDialog } = props

  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    password: ''
  })

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: 'Shubham',
  })

  const [showLogin, setShowLogin] = useState(false)

  const loginToggle = () => {
    toggleDialog()
    setShowLogin(true)
  }

  const loginFalse = () => {
    setShowLogin(false)
  }

  const toggleSnackBar = (message) => {
    setSnackBar({
      open: !snackBar.open,
      message
    })
  }

  const handleInput = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value.trim()
    })
  }

  const submitForm = () => {
    let { name, email, number } = form
    if (name.trim().length > 0 && email.trim().length > 0 && String(number).length >= 10) {
      axios.post(`${SERVER_URL}/api/customer/register`, form)
        .then(res => {
          if (res.data == 'success') {
            toggleSnackBar('User Registered Successfully')
            toggleDialog()
          }
        })
        .catch(err => {
          toggleSnackBar('Some Error Occured, Try again Later')
        })
    }
  }

  return (
    <>
      <Dialog fullWidth disableBackdropClick open={open} onClose={toggleDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <TextInput name="name" label="Customer Name" value={form.name} onChange={handleInput} />
          <TextInput name="number" label="Customer Phone Number" value={form.number} onChange={handleInput} type="number" />
          <TextInput name="email" label="Customer Email" value={form.email} onChange={handleInput} />
          <TextInput name="password" label="password" value={form.password} onChange={handleInput} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={submitForm}>
            Register
          </Button>
        </DialogActions>
        <Paper>
          <Typography onClick={loginToggle}>
            Already registered , Sign in
          </Typography>
        </Paper>
      </Dialog>
      {showLogin ? <LoginForm loginFalse={loginFalse}/> : ''}
      <SnackBar message={snackBar.message} open={snackBar.open} toggleSnackBar={toggleSnackBar} />
    </>
  )
}

export default RegisterForm
