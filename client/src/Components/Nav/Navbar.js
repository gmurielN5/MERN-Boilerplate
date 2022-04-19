import React, { useState, useContext } from "react"
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
          <NavItem>
            <Link to="/signup">
              <Button color="dark">Get Started</Button>
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
        full
        expand="md"
        className="align-items-baseline border-bottom border-dark justify-content-between"
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
