import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Col, Row, Button } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import { HeroAnimation } from "../Components/Hero/HeroAnimation"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import { SmallCard } from "../Components/SmallCard"

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
      <Row fluid className="hero border-bottom border-dark">
        <Col className="hero-text px-5">
          <Row>
            <p className="heading">Start a blog for free</p>
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
      <Loading loading={store.Loading} />
      <Message message={store.message} error={store.isError} />
      {filteredArticles.length !== 0 && (
        <Container md>
          <Row className="d-flex align-items-baseline p-3">
            <GraphUpArrow size={24} />
            <h3 className="px-2">Trending on Voice </h3>
          </Row>
          <Row>
            {filteredArticles.map((article, i) => (
              <Col sm md={6} lg={4} key={i}>
                <SmallCard article={article} index={i} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default PublicHomepage
