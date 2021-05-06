import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getUserPosts } from "../Services/ContentService";
import { AuthContext } from "../Context/AuthContext";

import ProfileNav from "../Components/ProfileNavbar";
import BlogList from "../Components/BlogList";

const UserBlog = () => {
  const {
    store,
    dispatch,
    dispatchFilter,
    filteredArticles,
    user,
    isAuthenticated,
  } = useContext(AuthContext);

  let params = useParams();

  useEffect(() => {
    let didCancel = false;
    const fetchPosts = () => {
      getUserPosts(params.username, dispatch, didCancel);
    };
    fetchPosts();
    dispatchFilter({ type: "SHOW_ALL" });
    return () => {
      didCancel = true;
    };
  }, [params.username, dispatch, dispatchFilter]);

  return (
    <Container fluid>
      <ProfileNav user={user} />
      <Container className="my-5">
        <BlogList
          list={filteredArticles}
          loading={store.Loading}
          error={store.isError}
          message={store.message}
          isAuthenticated={isAuthenticated}
          user={user}
          dispatch={dispatch}
        />
      </Container>
    </Container>
  );
};

export default UserBlog;
