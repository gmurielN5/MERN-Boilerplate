import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import { Navbar, Nav, NavbarBrand, NavItem, Button } from "reactstrap"
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
        <SubNav />
      </>
    )
  }

  return (
    <>
      <Navbar
        color="faded"
        light
        className={`border-bottom border-dark justify-content-between ${
          isAuthenticated && "d-sm-none"
        }`}
      >
        <NavbarBrand className="me-auto">
          <Link to="/">
            <img
              alt="logo"
              src="/logo.svg"
              style={{
                height: 60,
                width: 60,
              }}
            />
            <h1>voice</h1>
          </Link>
        </NavbarBrand>
        {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
      </Navbar>
    </>
  )
}

export default Navigation
