import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { AuthContext } from "../../Context/AuthContext"
import { removeToken } from "../../util"
import Avatar from "./Avatar"

const SubNav = () => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext)

  //Dropdown button
  const [dropdownOpen, setOpen] = useState(false)
  const toggleButton = () => setOpen(!dropdownOpen)

  const LoggoutHandler = (e) => {
    removeToken("token")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <UncontrolledDropdown
      direction="down"
      nav
      isOpen={dropdownOpen}
      toggle={toggleButton}
    >
      <DropdownToggle caret>
        <Avatar user={user} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          <Link to={`/post/${user.username}`}>
            <Row className="align-items-end">
              <Col xs="4">
                <Avatar user={user} thumbnail="thumbnail" />
              </Col>
              <Col xs="8">
                <h4>{user.username}</h4>
              </Col>
            </Row>
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <Link to={`/post/${user.username}/new-story`}>Write a Story</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={`/post/${user.username}`}>Your Stories</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to={`/user/${user.id}`}>Settings</Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={LoggoutHandler}>Sign out</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default SubNav
