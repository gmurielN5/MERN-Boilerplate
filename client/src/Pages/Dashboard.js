import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import SidebarLayout from "../Components/SidebarLayout"
import { Container, Col, Row, Button } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import Loading from "../Components/Loading"
import Message from "../Components/Message"

const Dashboard = () => {
  return (
    <SidebarLayout>
      <Container>
        <h1>dashboard page</h1>
      </Container>
    </SidebarLayout>
  )
}

export default Dashboard
