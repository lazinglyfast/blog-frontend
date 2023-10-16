import React, { useRef } from "react"
import Toggleable from "./Toggleable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"
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

  const toggleableRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {`${user.username} logged in`}
        <button type="button" onClick={handleClick}>
          logout
        </button>
      </div>

      <Toggleable buttonLabel="create new blog" ref={toggleableRef}>
        <BlogForm toggleableRef={toggleableRef} />
      </Toggleable>
      <BlogList />
    </div>
  )
}

export default LoggedIn
