import React, { useContext } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { Container } from "reactstrap"
import { AuthContext } from "../Context/AuthContext"

import ProtectedRoute from "./ProtectedRoute"
import UnprotectedRoute from "./UnprotectedRoute"

import Navbar from "../Components/Nav/Navbar"
import Dashboard from "../Pages/Dashboard"
import PublicHomePage from "../Pages/PublicHomePage"

import Signup from "../Pages/SignUp"
import Login from "../Pages/Login"
import Settings from "../Pages/Settings"
import BlogForm from "../Pages/BlogForm"
import UserBlog from "../Pages/UserBlog"
import Post from "../Pages/Post"
import NotFound from "../Pages/NotFound"

// ! Routes TO DO
// USER ROUTES = /signup Post route _ signup
//              /user/:id GET/PUT/DELETE routes _Settings

// CONTENT ROUTES = /post/:username/new-story change url to /new_story
//                = /post/:username  GET/DELETE get all posts and delete
//                = /post/:username/:id GET AND PUT articles by id

// ? TO DO
// ? design Homepage
// ? not found page to design
// ? blog page to design

//! change / route to return home component

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Container fluid>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <PublicHomePage />}
        </Route>
        <UnprotectedRoute path="/signup" component={Signup} />
        <UnprotectedRoute path="/login" component={Login} />
        <ProtectedRoute
          path="/dashboard/:username/new-story"
          component={BlogForm}
        />
        <ProtectedRoute path="/dashboard/:username" component={UserBlog} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/user/:id" component={Settings} />
        {/* <Route path="/:username/:id" component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </Container>
  )
}

export default AppRoutes
