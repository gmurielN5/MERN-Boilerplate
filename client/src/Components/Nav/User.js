import React from "react"
import { Row, Col } from "reactstrap"
import Avatar from "./Avatar"

export const User = ({ user, size }) => {
  return (
    <Row className="d-flex justify-content-start align-items-center">
      <Col className="userAvatar">
        <Avatar user={user} size={size} />
      </Col>
      <Col>
        <h6>{user.username}</h6>
      </Col>
    </Row>
  )
}
