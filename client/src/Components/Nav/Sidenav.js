import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import {
  House,
  AppIndicator,
  Bookmarks,
  FileText,
  PencilSquare,
} from "react-bootstrap-icons"
import { AuthContext } from "../../Context/AuthContext"
import { removeToken } from "../../util"
import Avatar from "./Avatar"
import { User } from "./User"

const SideNav = ({ history }) => {
  const { user, setUser, setIsAuthenticated, isAuthenticated } =
    useContext(AuthContext)

  const LoggoutHandler = (e) => {
    removeToken("token")
    setUser(null)
    setIsAuthenticated(false)
    history.push("/")
  }
  return (
    <>
      {isAuthenticated && (
        <Navbar className="d-flex flex-sm-column min-vh-100 sticky-top border-right p-2">
          <NavbarBrand className="py-2">
            <NavLink to="/">
              <img
                alt="logo"
                src="/logo.svg"
                style={{
                  height: 42,
                  width: 42,
                }}
              />
            </NavLink>
          </NavbarBrand>
          <Nav vertical pills fill>
            <NavItem className="py-4">
              <NavLink to="/">
                <House size={24} />
              </NavLink>
            </NavItem>
            {/* <NavItem className="py-4">
              <NavLink to="/">
                <AppIndicator size={24} />
              </NavLink>
            </NavItem>
            <NavItem className="py-4">
              <NavLink to="/">
                <Bookmarks size={24} />
              </NavLink>
            </NavItem> */}
            <NavItem className="py-4 border-bottom">
              <NavLink to={`/dashboard/${user.username}`}>
                <FileText size={24} />
              </NavLink>
            </NavItem>
            <NavItem className="py-4">
              <NavLink to={`/dashboard/${user.username}/new-story`}>
                <PencilSquare size={24} />
              </NavLink>
            </NavItem>
            <UncontrolledDropdown direction="up" className="pt-4 mt-4 pb-2">
              <DropdownToggle nav>
                <Avatar user={user} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="py-2 ">
                  <NavLink to={`/user/${user.id}`}>Settings</NavLink>
                </DropdownItem>
                <DropdownItem onClick={LoggoutHandler} className="py-2">
                  Sign out
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="p-4">
                  <User user={user} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      )}
    </>
  )
}

export default SideNav
