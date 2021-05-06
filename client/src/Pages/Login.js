import React, { useState, useContext } from "react";
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
import { AuthContext } from "../Context/AuthContext";
import { Login } from "../Services/AuthService";
import { setToken } from "../util";
import Message from "../Components/Message";

const LoginForm = ({ history, location }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const authcontext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: "/" } };

    Login(user)
      .then((data) => {
        const { isAuthenticated, user, message, token } = data;
        if (isAuthenticated) {
          setToken("token", token);
          authcontext.setUser(user);
          authcontext.setIsAuthenticated(isAuthenticated);
          history.push(from);
        } else {
          setMessage(message);
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
              <h3>Welcome Back.</h3>
            </Col>
          </Row>
          <FormGroup>
            <Label for="Email">Your email</Label>
            <Input
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Enter email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Enter password"
            />
          </FormGroup>
          {message ? <Message message={message} /> : null}
          <Button color="dark" type="submit">
            Login
          </Button>
        </Form>
        <Row>
          <Col className="py-4">
            <p className="font-weight-bold">
              No account ? <Link to="/signup">Create One</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LoginForm;
