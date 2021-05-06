import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Register } from "../Services/AuthService";
import Message from "../Components/Message";

const RegisterForm = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Register(user)
      .then((data) => {
        const { message } = data;
        setMessage(message);
        if (!message.msgError) {
          resetForm();
          timerID = setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        history.push("/error");
      });
  };

  return (
    <Container className="w-50 my-5 s">
      <Container className="small">
        <Form onSubmit={onSubmit}>
          <Row>
            <Col className="py-4">
              <h3>Join Us.</h3>
            </Col>
          </Row>
          {message ? <Message message={message} /> : null}
          <FormGroup>
            <Label for="Email">Your email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Username">Your username</Label>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={onChange}
              placeholder="Enter an username"
            />
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Confirm Password</Label>
            <Input
              type="password"
              name="passwordConfirmation"
              value={user.passwordConfirmation}
              onChange={onChange}
              placeholder="Confirm password"
            />
          </FormGroup>

          <Button color="dark" type="submit">
            Register
          </Button>
        </Form>
        <Row>
          <Col className="py-4">
            <p className="font-weight-bold">
              Already have an account ? <Link to="/login">Sign in</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default RegisterForm;
