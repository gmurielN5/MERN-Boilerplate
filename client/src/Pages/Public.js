import React, { useContext, useEffect } from "react"
import { Container, Col, Row } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"
import { getPublicPosts } from "../Services/ContentService"
import BlogList from "../Components/BlogList"

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
    <Container
      fluid
      style={{ height: "80vh", background: "#F24D2E" }}
      className="border-bottom border-dark"
    >
      <Row>
        <Col>
          <h1>text</h1>
        </Col>
        <Col>
          <p>image</p>
        </Col>
      </Row>
    </Container>

    //* <Container className="my-5">
    //   <BlogList
    //     list={list}
    //     loading={store.Loading}
    //     error={store.isError}
    //     message={store.message}
    //     isAuthenticated={isAuthenticated}
    //     user={user}
    //   />
    // </Container>
  )
}

export default Public
