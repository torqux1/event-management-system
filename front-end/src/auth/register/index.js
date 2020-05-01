import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import axios from 'axios'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  function handleSubmit() {
    axios
      .post(process.env.REACT_APP_API_URL, {
        user: {
          email,
          password,
          passwordConfirm,
          firstName,
          lastName,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch(console.error)
  }

  return (
    <div>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="first-name"
            label="First Name"
            type="text"
            autoComplete="first-name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last-name"
            label="Last Name"
            type="text"
            autoComplete="last-name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password-confirm"
            label="Confirm password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default Register
