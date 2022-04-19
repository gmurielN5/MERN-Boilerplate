import React from "react"
import { Link } from "react-router-dom"
import { Container } from "reactstrap"
import Loading from "../Components/Loading"
import Message from "../Components/Message"
import BlogCard from "./BlogCard"

const BlogList = ({
  list,
  loading,
  error,
  message,
  isAuthenticated,
  user,
  dispatch,
}) => {
  let articlesList = Array.from(list, (article) => (
    <BlogCard
      key={article._id}
      article={article}
      user={user}
      dispatch={dispatch}
    />
  ))

  const noPostfound = () => {
    return (
      <>
        <Container sm>
          {isAuthenticated ? (
            <Link to={`/post/${user.username}/new-story`}>
              Write your first story
            </Link>
          ) : (
            <Link to={`/signup`}>Be the first to write a story</Link>
          )}
        </Container>
      </>
    )
  }

  return (
    <>
      {loading && <Loading />}
      {error && <Message message={message} />}
      {list.length === 0 && noPostfound()}
      {articlesList}
    </>
  )
}

export default BlogList
