import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { Login } from "../Services/AuthService"
import { setToken } from "../util"
import Message from "../Components/Message"

const LoginForm = ({ history, location }) => {
  const [user, setUser] = useState({ email: "", password: "" })
  const [message, setMessage] = useState(null)
  const authcontext = useContext(AuthContext)

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { from } = location.state || { from: { pathname: "/" } }

    Login(user)
      .then((data) => {
        const { isAuthenticated, user, message, token } = data
        if (isAuthenticated) {
          setToken("token", token)
          authcontext.setUser(user)
          authcontext.setIsAuthenticated(isAuthenticated)
          history.push(from)
        } else {
          setMessage(message)
        }
      })
      .catch((error) => {
        history.push("/error")
      })
  }

  return (
    <Container className="small">
      <Row className="d-flex justify-content-center pb-4">
        <h4>Welcome Back.</h4>
      </Row>
      <Form onSubmit={onSubmit} className="px-2">
        {message ? <Message message={message} /> : null}
        <FormGroup className="py-2">
          <Label for="Email">Your email</Label>
          <Input
            type="email"
            name="email"
            className="p-0"
            onChange={onChange}
            placeholder="Enter email"
          />
        </FormGroup>
        <FormGroup className="py-2">
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            className="p-0"
            onChange={onChange}
            placeholder="Enter password"
          />
        </FormGroup>
        <Row className="d-flex justify-content-center pt-4">
          <Button color="dark" type="submit">
            Login
          </Button>
        </Row>
      </Form>
      <Row className="d-flex justify-content-center pt-4">
        <p className="font-weight-bold">
          No account ? <Link to="/signup">Create One</Link>
        </p>
      </Row>
    </Container>
  )
}

export default LoginForm
