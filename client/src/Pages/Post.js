import React, { useState, useContext, useEffect } from "react"
import { Container } from "reactstrap"
import { useParams } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import { getPost, updatePost } from "../Services/ContentService"

//Post Post page and edit page when state isEditing if user authenticated is params.username

function Post() {
  // const { dispatch, store, isAuthenticated } = useContext(AuthContext);
  // const [isEdit, setIsEdit] = useState(false);
  // let { username, id } = useParams();

  // useEffect(() => {
  //   let didCancel = false;
  //   const fetchPosts = () => {
  //     getPost(username, id, dispatch, didCancel);
  //   };
  //   fetchPosts();
  //   return () => {
  //     didCancel = true;
  //   };
  // }, [username, id, dispatch]);

  return (
    <Container fluid>
      <Container className="my-5">
        <p>Post section </p>
        <p>Edit section </p>
      </Container>
    </Container>
  )
}
export default Post
