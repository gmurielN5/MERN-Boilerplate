import React from "react"
import { useSpring, animated } from "react-spring"
import { Container, Row, Col } from "reactstrap"

const Loading = ({ loading }) => {
  const props = useSpring({
    from: { opacity: 0, color: "red" },
    to: [
      { opacity: 1, color: "#ffaaee" },
      { opacity: 1, color: "red" },
      { opacity: 0.5, color: "#008000" },
      { opacity: 0.8, color: "black" },
    ],
  })

  if (!loading) {
    return null
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center position-relative vh-100"
    >
      <Row>
        <Col>
          <animated.div style={props}>
            <h1 className="display-1">Loading</h1>
          </animated.div>
        </Col>
      </Row>
    </Container>
  )
}

export default Loading
