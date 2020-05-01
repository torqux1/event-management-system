import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  function handleSubmit() {
    axios
      .post(process.env.REACT_APP_API_URL, {
        user: {
          email,
          password,
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
            id="email"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default Login