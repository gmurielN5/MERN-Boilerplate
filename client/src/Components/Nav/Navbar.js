import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import { Navbar, Nav, NavbarBrand, NavItem, Button } from "reactstrap"
import { Logo } from "./Logo"
import SubNav from "./SubNav"

const Navigation = (props) => {
  const { isAuthenticated } = useContext(AuthContext)

  const unauthenticatedNavbar = () => {
    return (
      <>
        <Nav>
          <NavItem className="d-none d-sm-block m-2">
            <Link to="/login">
              <p>Sign in</p>
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/signup">
              <Button color="dark">Start Writing</Button>
            </Link>
          </NavItem>
        </Nav>
      </>
    )
  }

  const authenticatedNavbar = () => {
    return (
      <>
        <Nav navbar>
          <SubNav />
        </Nav>
      </>
    )
  }

  return (
    <>
      <Navbar
        color="faded"
        light
        className="align-items-center border-bottom border-dark justify-content-between"
      >
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
      </Navbar>
    </>
  )
}

export default Navigation
