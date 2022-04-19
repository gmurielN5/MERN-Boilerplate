import React, { useContext, useEffect } from "react"
import { Container, Col, Row } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import { TrendingPost } from "../Components/TrendingPost"

import { GraphUpArrow } from "react-bootstrap-icons"

const Public = () => {
  const {
    store,
    dispatch,
    dispatchFilter,
    filteredArticles,
    user,
    isAuthenticated,
  } = useContext(AuthContext)

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

  const list = filteredArticles.filter((post) => {
    return post.author._id !== user.id
  })

  return (
    <Container fluid>
      <Row>
        <Col
          sm
          className="border-bottom border-dark"
          style={{ background: "red", height: "70vh" }}
        >
          <h1>text</h1>
        </Col>
        <Col
          md="4"
          style={{ background: "blue" }}
          className="heroAnimation border-left border-dark"
        >
          <h1>animation</h1>
        </Col>
      </Row>
      <Loading loading={store.Loading} />
      <Message message={store.message} error={store.isError} />
      {list.length !== 0 && (
        <Container md className="border-bottom border-dark">
          <Row className="p-3">
            <GraphUpArrow size={20} />
            <h4>Trending on Voice </h4>
          </Row>
          <Row>
            {list.map((article, i) => (
              <Col sm md="6" lg="4" key={i}>
                <TrendingPost article={article} index={i} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default Public
