import React from "react"
import { Container, Row, Col } from "reactstrap"
import Avatar from "./Avatar"

export const User = ({ user }) => {
  return (
    <Container className="p-0">
      <Row className="justify-content-center align-items-center">
        <Col xs="5">
          <Avatar user={user} />
        </Col>
        <Col xs="7">
          <h4>{user.username}</h4>
        </Col>
      </Row>
    </Container>
  )
}
