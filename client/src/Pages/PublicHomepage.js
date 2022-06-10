import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Col, Row, Button } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import { HeroAnimation } from "../Components/Hero/HeroAnimation"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import { TrendingPost } from "../Components/TrendingPost"

import { GraphUpArrow } from "react-bootstrap-icons"

const PublicHomepage = () => {
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
      <Container fluid className="hero">
        <Row>
          <Col sm className="border-bottom border-dark">
            <Container sm className="p-5 ">
              <Row>
                <p className="heading">Start a blog for free</p>
              </Row>
              <Row className="pt-5">
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
            </Container>
          </Col>
          <Col md={4} className="heroAnimation border border-dark">
            <HeroAnimation />
          </Col>
        </Row>
      </Container>
      <Loading loading={store.Loading} />
      <Message message={store.message} error={store.isError} />
      {filteredArticles.length !== 0 && (
        <Container md>
          <Row className="d-flex align-items-baseline p-3">
            <GraphUpArrow size={24} />
            <h3>Trending on Voice </h3>
          </Row>
          <Row>
            {filteredArticles.map((article, i) => (
              <Col sm md={6} xl={4} key={i}>
                <TrendingPost article={article} index={i} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default PublicHomepage
