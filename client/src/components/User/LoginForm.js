import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import TextInput from '../controls/TextInput';
import SnackBar from '../controls/SnackBar';
import { SERVER_URL } from '../../globalConstants';
import { loginUser } from '../../Store/User/UserActions'

function LoginForm(props) {
  const { loginFalse, loginSuccess } = props

  const [open, setOpen] = useState(true)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
  })

  const toggleSnackBar = (message) => {
    setSnackBar({
      open: !snackBar.open,
      message: message
    })
  }

  const handleInput = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = () => {
    let { email, password } = form
    if (email.trim().length > 0 && password.trim().length > 0) {
      axios.post(`${SERVER_URL}/api/customer/login`, form)
        .then(res => {
          console.log(res)
          if (res.data.status === 'success') {
            //toggleSnackBar('Login Successfull')
            localStorage.setItem('token',res.data.token)
            setOpen(false)
            loginFalse()
            loginSuccess(res.data)
          } else {
            //toggleSnackBar('No User Found')
          }
        })
        .catch(err => {
          //toggleSnackBar('Invalid Email and Password')
        })
    }
  }

  return (
    <>
      <Dialog fullWidth disableBackdropClick open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextInput name="email" label="Customer Email" value={form.email} onChange={handleInput} />
          <TextInput name="password" label="Password" value={form.password} onChange={handleInput} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={submitForm}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <SnackBar message={snackBar.message} open={snackBar.open} toggleSnackBar={toggleSnackBar} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess : (data) => dispatch(loginUser(data))
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
