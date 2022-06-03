import React, { useContext } from "react"
import { Nav, NavItem, Button } from "reactstrap"
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
    <Nav className="profileNav border-bottom border-dark align-items-center">
      <NavItem>
        <User user={user} />
      </NavItem>
      <div className="profileSubnav">
        <NavItem>
          <Button onClick={handleShowDrafts}>Drafts</Button>
        </NavItem>
        <NavItem>
          <Button onClick={handleShowPublished}>Published</Button>
        </NavItem>
      </div>
    </Nav>
  )
}

export default UserNav
