import React from "react"
import { Container, Row, Col } from "reactstrap"
import Avatar from "./Avatar"

export const User = ({ user, size }) => {
  return (
    <Container className="p-0">
      <Row className="justify-content-center align-items-center">
        <Col sm={`${size === "thumbnail" ? 2 : 4}`}>
          <Avatar user={user} size={size} />
        </Col>
        <Col sm={`${size === "thumbnail" ? 10 : 8}`}>
          <h4>{user.username}</h4>
        </Col>
      </Row>
    </Container>
  )
}
