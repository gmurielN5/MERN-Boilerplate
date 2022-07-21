import { Container, Row, Col } from "reactstrap"
import SideBar from "./SideBar"

const SidebarLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col style={{ background: "yellow" }}>{children}</Col>
        <Col style={{ background: "blue" }} sm="4">
          <SideBar />
        </Col>
      </Row>
    </Container>
  )
}

export default SidebarLayout
