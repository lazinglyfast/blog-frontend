import React, { useEffect } from "react"
import { Route, Routes, Link, Navigate, useMatch } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Navbar, Nav } from "react-bootstrap"
import Blogs from "./Blogs"
import BlogDetails from "./BlogDetails"
import Users from "./Users"
import UserDetails from "./UserDetails"
import Login from "./Login"
import { useUser, useUserDispatch, clearUser, restoreUser } from "./UserContext"
import { useNotificationDispatch, notifySuccess } from "./NotificationContext"

const Main = () => {
  const runOnlyOnceAtApplicationStart = []
  const dispatchUser = useUserDispatch()
  useEffect(() => {
    restoreUser(dispatchUser)
  }, runOnlyOnceAtApplicationStart)

  const user = useUser()
  const dispatchNotification = useNotificationDispatch()

  const handleClick = () => {
    clearUser(dispatchUser)
    notifySuccess(dispatchNotification, "logged out successfully")
  }

  const client = useQueryClient()

  const matchBlog = useMatch("/blogs/:id")
  const blogs = client.getQueryData(["blogs"])
  const matchedBlog =
    blogs && matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null

  const matchUser = useMatch("/users/:id")
  const users = client.getQueryData(["users"])
  const matchedUser =
    users && matchUser ? users.find((u) => u.id === matchUser.params.id) : null

  // TODO: make the route redirect DRY

  const crumbStyle = {
    padding: 5,
  }

  const navStyle = {
    backgroundColor: "grey",
    padding: 5,
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={crumbStyle} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={crumbStyle} to="/users">
                users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {user ? `${user.username} logged in` : null}
        <Button variant="primary" type="button" onClick={handleClick}>
          logout
        </Button>
      </Navbar>

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={user ? <Blogs /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={
            user ? (
              <UserDetails user={matchedUser} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/blogs/:id"
          element={
            user ? (
              <BlogDetails blog={matchedBlog} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default Main
