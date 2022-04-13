import React, { useContext } from "react"
import { Nav, NavItem, Button, Col, Row } from "reactstrap"
import { AuthContext } from "../../Context/AuthContext"
import Avatar from "./Avatar"

const UserNav = (props) => {
  const { dispatchFilter } = useContext(AuthContext)
  const handleShowDrafts = () => {
    dispatchFilter({ type: "SHOW_DRAFT_ARTICLES" })
  }

  const handleShowPublished = () => {
    dispatchFilter({ type: "SHOW_PUBLISHED_ARTICLES" })
  }

  return (
    <Nav className="border-bottom border-dark align-items-center">
      <NavItem>
        <Row className="align-items-center m-2">
          <Col xs="4">
            <Avatar user={props.user} thumbnail="thumbnail" />
          </Col>
          <Col xs="8">
            <h3>{props.user.username}</h3>
          </Col>
        </Row>
      </NavItem>
      <NavItem>
        <Button onClick={handleShowDrafts}>Drafts</Button>
      </NavItem>
      <NavItem>
        <Button onClick={handleShowPublished}>Published</Button>
      </NavItem>
    </Nav>
  )
}

export default UserNav
