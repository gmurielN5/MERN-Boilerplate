import React from "react"
import { Container, Row, Col } from "reactstrap"
import SideNav from "./Nav/Sidenav"

const DashboardLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="auto" className="d-none d-sm-block sticky-top bg-light pr-0">
          <SideNav />
        </Col>
        <Col className="min-vh-100">
          <main>{children}</main>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardLayout
