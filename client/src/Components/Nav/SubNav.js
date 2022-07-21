import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { NavbarToggler, Collapse, Nav, NavItem, NavbarText } from "reactstrap"
import { AuthContext } from "../../Context/AuthContext"
import { removeToken } from "../../util"
import Avatar from "./Avatar"
import { CaretDownFill } from "react-bootstrap-icons"

const SubNav = ({ history }) => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext)

  //Dropdown button
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const LoggoutHandler = (e) => {
    removeToken("token")
    setUser(null)
    setIsAuthenticated(false)
    history.push("/")
  }

  return (
    <>
      <NavbarToggler onClick={toggle} className="me-2 border-0">
        <Avatar user={user} />
        <CaretDownFill size={16} color="black" />
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to={`/dashboard/${user.username}/new-story`}>
              Write a Story
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/dashboard/${user.username}`}>Your Stories</Link>
          </NavItem>
          <NavItem>
            <Link to={`/user/${user.id}`}>Settings</Link>
          </NavItem>
          <NavbarText onClick={LoggoutHandler}>Logout</NavbarText>
        </Nav>
      </Collapse>
    </>
  )
}

export default SubNav
