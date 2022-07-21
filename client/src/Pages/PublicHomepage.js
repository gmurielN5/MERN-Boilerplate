import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Col, Row, Button } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import { HeroAnimation } from "../Components/Hero/HeroAnimation"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import { CardPost } from "../Components/Card"

import { GraphUpArrow } from "react-bootstrap-icons"

const PublicHomePage = () => {
  const { store, dispatch, dispatchFilter, filteredArticles, isAuthenticated } =
    useContext(AuthContext)

  useEffect(() => {
    let didCancel = false
    const fetchPosts = () => {
      getPublicPosts(dispatch, didCancel)
    }
    fetchPosts()
    dispatchFilter({ type: "SHOW_PUBLISHED_ARTICLES" })
    return () => {
      didCancel = true
    }
  }, [dispatch, dispatchFilter, isAuthenticated])

  // const list = filteredArticles.filter((post) => {
  //   return post.author._id !== user.id
  // })

  return (
    <Container fluid>
      <Container fluid className="border-bottom border-dark">
        <Row>
          <Col className="hero px-5">
            <Row>
              <p className="heading" style={{ color: "white" }}>
                Start a blog for free
              </p>
            </Row>
            <Row className="pt-2">
              <h2>Write, Read,</h2>
            </Row>
            <Row>
              <h2>Discover, Share</h2>
            </Row>
            <Row>
              <p>Exclusive content by developers, for developers</p>
            </Row>
            <Row className="pt-2">
              <Link to="/signup">
                <Button>Start writing</Button>
              </Link>
            </Row>
          </Col>
          <Col md={4} className="heroAnimation border-left border-dark">
            <HeroAnimation />
          </Col>
        </Row>
      </Container>
      <Loading loading={store.Loading} />
      <Message message={store.message} error={store.isError} />
      {/* return the most recents article and return 6 */}
      {filteredArticles.length !== 0 && (
        <Container fluid className="border-bottom border-secondary">
          <Container>
            <Row className="d-flex align-items-baseline p-3">
              <GraphUpArrow size={24} />
              <h3 className="px-2">Trending on Voice </h3>
            </Row>
            <Row lg="4" md="3" sm="2" xs="1">
              {filteredArticles.map((article, i) => (
                <Col key={i} className="mb-3">
                  <CardPost article={article} index={i} thumbnail={true} />
                </Col>
              ))}
            </Row>
          </Container>
        </Container>
      )}
      {filteredArticles.length !== 0 && (
        <Container className="pt-0">
          <Row>
            <Col className="pt-5 px-0">
              {filteredArticles.map((article, i) => (
                <Col key={i} className="mb-5">
                  <CardPost article={article} index={i} />
                </Col>
              ))}
            </Col>

            <Col md={4} className="border-left border-secondary pt-5 ">
              <h3 className="px-2">Discover more </h3>
              {/* add category to backend 
              return list of categories */}
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default PublicHomePage
