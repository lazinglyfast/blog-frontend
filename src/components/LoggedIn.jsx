import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Blogs from "./Blogs"
import Users from "./Users"
import UserDetails from "./UserDetails"
import { useUser, useUserDispatch, clearUser } from "./UserContext"
import { useNotificationDispatch, notifySuccess } from "./NotificationContext"

const LoggedIn = () => {
  const user = useUser()
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()

  const handleClick = () => {
    clearUser(dispatchUser)
    notifySuccess(dispatchNotification, "logged out successfully")
  }

  const style = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        <Link style={style} to="/">
          blogs
        </Link>
        <Link style={style} to="/users">
          users
        </Link>
        {`${user.username} logged in`}
        <button type="button" onClick={handleClick}>
          logout
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  )
}

export default LoggedIn
