import React, { useEffect } from "react"
import { Route, Routes, Link, Navigate, useMatch } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
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
  const matchedBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null

  const matchUser = useMatch("/users/:id")
  const users = client.getQueryData(["users"])
  const matchedUser = matchUser
    ? users.find((u) => u.id === matchUser.params.id)
    : null

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
      <div style={navStyle}>
        <Link style={crumbStyle} to="/">
          blogs
        </Link>
        <Link style={crumbStyle} to="/users">
          users
        </Link>
        {user ? `${user.username} logged in` : null}
        <button type="button" onClick={handleClick}>
          logout
        </button>
      </div>

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
