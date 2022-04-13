import React from "react"
import { Route, Switch } from "react-router-dom"
import { Container } from "reactstrap"

import ProtectedRoute from "./ProtectedRoute"
import UnprotectedRoute from "./UnprotectedRoute"

import Navbar from "../Components/Nav/Navbar"
import Public from "../Pages/Public"
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

function AppRoutes() {
  return (
    <Container fluid>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Public} />
        <UnprotectedRoute path="/signup" component={Signup} />
        <UnprotectedRoute path="/login" component={Login} />
        <ProtectedRoute path="/user/:id" component={Settings} />
        <ProtectedRoute path="/post/:username/new-story" component={BlogForm} />
        <Route path="/post/:username/:id" component={Post} />
        <ProtectedRoute path="/post/:username" component={UserBlog} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  )
}

export default AppRoutes
