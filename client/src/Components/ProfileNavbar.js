import React, { useContext } from "react";
import { Container, Nav, NavItem, Button } from "reactstrap";
import { AuthContext } from "../Context/AuthContext";
import Avatar from "./Avatar";

const UserNav = (props) => {
  const { dispatchFilter } = useContext(AuthContext);
  const handleShowDrafts = () => {
    dispatchFilter({ type: "SHOW_DRAFT_ARTICLES" });
  };

  const handleShowPublished = () => {
    dispatchFilter({ type: "SHOW_PUBLISHED_ARTICLES" });
  };

  return (
    <Container fluid>
      <Nav className="border-bottom border-light align-baseline">
        <NavItem>
          <Avatar user={props.user} thumbnail="thumbnail" />
        </NavItem>
        <NavItem>
          <h3>{props.user.username}</h3>
        </NavItem>

        <NavItem>
          <Button onClick={handleShowDrafts}>Drafts</Button>
        </NavItem>
        <NavItem>
          <Button onClick={handleShowPublished}>Published</Button>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default UserNav;
