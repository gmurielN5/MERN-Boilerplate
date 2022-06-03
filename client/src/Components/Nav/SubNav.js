import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { AuthContext } from "../../Context/AuthContext"
import { removeToken } from "../../util"
import Avatar from "./Avatar"
import { User } from "./User"

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
      inNavbar
      nav
      isOpen={dropdownOpen}
      toggle={toggleButton}
    >
      <DropdownToggle caret nav>
        <Avatar user={user} />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>
          <Link to={`/post/${user.username}`}>
            <User user={user} />
          </Link>
        </DropdownItem>
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
