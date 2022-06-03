import React, { useState, useRef, useEffect } from "react"
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
import { Register } from "../Services/AuthService"
import Message from "../Components/Message"

const RegisterForm = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setUser({
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    Register(user)
      .then((data) => {
        const { message } = data
        setMessage(message)
        if (!message.msgError) {
          resetForm()
          timerID = setTimeout(() => {
            history.push("/login")
          }, 2000)
        }
      })
      .catch((error) => {
        history.push("/error")
      })
  }

  return (
    <Container className="small">
      <Row className="d-flex justify-content-center pb-4">
        <h4>Join Us</h4>
      </Row>
      {message ? <Message message={message} /> : null}
      <Form onSubmit={onSubmit} className="px-2">
        <FormGroup className="py-2">
          <Label for="Email">Your email</Label>
          <Input
            type="email"
            name="email"
            className="p-0"
            value={user.email}
            onChange={onChange}
            placeholder="Enter email"
          />
        </FormGroup>
        <FormGroup className="py-2">
          <Label for="Username">Your username</Label>
          <Input
            type="text"
            name="username"
            className="p-0"
            value={user.username}
            onChange={onChange}
            placeholder="Enter an username"
          />
        </FormGroup>

        <FormGroup className="py-2">
          <Label for="Password">Password</Label>
          <Input
            type="password"
            name="password"
            className="p-0"
            value={user.password}
            onChange={onChange}
            placeholder="Enter password"
          />
        </FormGroup>
        <FormGroup className="py-2">
          <Label for="Password">Confirm Password</Label>
          <Input
            type="password"
            name="passwordConfirmation"
            className="p-0"
            value={user.passwordConfirmation}
            onChange={onChange}
            placeholder="Confirm password"
          />
        </FormGroup>
        <Row className="d-flex justify-content-center pt-4">
          <Button color="dark" type="submit">
            Register
          </Button>
        </Row>
      </Form>
      <Row className="d-flex justify-content-center pt-4">
        <p className="font-weight-bold">
          Already have an account ?<Link to="/login"> Sign in</Link>
        </p>
      </Row>
    </Container>
  )
}

export default RegisterForm
