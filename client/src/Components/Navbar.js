import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
  Button,
} from "reactstrap";
import DropdownNav from "./SubNav";

const Navigation = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Navbar Tooggle
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const unauthenticatedNavbar = () => {
    return (
      <React.Fragment>
        <NavItem>
          <Link to="/login">Sign in</Link>
        </NavItem>
        <NavItem>
          <Link to="/signup">
            <Button color="dark">Get Started</Button>
          </Link>
        </NavItem>
      </React.Fragment>
    );
  };

  const authenticatedNavbar = () => {
    return (
      <React.Fragment>
        <DropdownNav />
      </React.Fragment>
    );
  };

  return (
    <Container fluid>
      <Navbar color="faded" light expand="md">
        <NavbarBrand>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="50 100 300 300"
            >
              <g id="Layer_4">
                <polygon
                  class="st0"
                  points="335.74,265.35 328.55,275.61 321,283.23 310.03,289.95 294.03,295.26 280.73,296.68 267.42,296.68 
                                    253.76,293.31 241.54,288.18 221.94,276.15 205.76,260.39 190.92,242.51 176.1,220.04 162.26,199.15 151.83,185.52 144.46,177.2 
                                    134.75,169.59 122.7,161.62 108.68,155.61 95.74,151.54 82.43,149.76 71.65,149.76 82.97,147.46 91.78,147.46 104.73,148.7 
                                    118.75,151.54 131.87,156.85 144.46,163.57 159.2,175.08 173.4,190.48 185.45,206.41 201.09,228.87 213.67,246.05 225.72,259.68 
                                    239.2,271.54 248.55,277.38 257,281.99 267.6,285.17 280.73,287.65 293.13,287.47 305.54,284.82 316.32,280.57 324.77,275.26 	"
                />
              </g>
              <g id="Layer_1">
                <circle class="st1" cx="116.36" cy="246.87" r="49.81" />
              </g>
            </svg>
            <h1>Voice</h1>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-md-end">
          <Nav navbar className="align-items-baseline">
            {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
};

export default Navigation;
