import React, { useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"
import { getUserPosts } from "../Services/ContentService"
import { AuthContext } from "../Context/AuthContext"

import ProfileNav from "../Components/Nav/ProfileNavbar"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import EditCard from "../Components/EditCard"

const UserBlog = () => {
  const { store, dispatch, dispatchFilter, filteredArticles, user } =
    useContext(AuthContext)

  let params = useParams()

  useEffect(() => {
    let didCancel = false
    const fetchPosts = () => {
      getUserPosts(params.username, dispatch, didCancel)
    }
    fetchPosts()
    dispatchFilter({ type: "SHOW_ALL" })
    return () => {
      didCancel = true
    }
  }, [params.username, dispatch, dispatchFilter])

  return (
    <Container fluid>
      <Row className="border-bottom p-2">
        <Col>
          <ProfileNav user={user} />
        </Col>
      </Row>
      <Loading loading={store.Loading} />
      <Message message={store.message} error={store.isError} />
      {filteredArticles.length !== 0 ? (
        <Container className="pt-0">
          <Row>
            <Col className="pt-5 px-0">
              {filteredArticles.map((article, i) => (
                <Col key={i} className="mb-5">
                  <EditCard
                    article={article}
                    index={i}
                    user={user}
                    dispatch={dispatch}
                  />
                </Col>
              ))}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Link to={`/dashboard/${user.username}/new-story`}>
            <p>write your first story</p>
          </Link>
        </Container>
      )}
    </Container>
  )
}

export default UserBlog
