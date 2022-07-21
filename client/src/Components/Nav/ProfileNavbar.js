import React, { useContext } from "react"
import { Col, Nav, NavItem, Button } from "reactstrap"
import { AuthContext } from "../../Context/AuthContext"
import { User } from "./User"

const UserNav = ({ user }) => {
  const { dispatchFilter } = useContext(AuthContext)

  const handleShowDrafts = () => {
    dispatchFilter({ type: "SHOW_DRAFT_ARTICLES" })
  }

  const handleShowPublished = () => {
    dispatchFilter({ type: "SHOW_PUBLISHED_ARTICLES" })
  }

  return (
    <Nav fill>
      <Col>
        <NavItem>
          <User user={user} />
        </NavItem>
      </Col>
      <Col sm="auto" className="d-flex justify-content-center">
        <NavItem>
          <Button
            color="dark"
            className="mx-2"
            type="submit"
            onClick={handleShowDrafts}
          >
            Drafts
          </Button>
        </NavItem>
        <NavItem>
          <Button
            color="dark"
            type="submit"
            className="mr-4"
            onClick={handleShowPublished}
          >
            Published
          </Button>
        </NavItem>
      </Col>
    </Nav>
  )
}

export default UserNav
