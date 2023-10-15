import React, { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Toggleable from "./Toggleable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"
import { logout } from "../reducers/user"

const LoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const toggleableRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {`${user.username} logged in`}
        <button type="button" onClick={() => dispatch(logout())}>
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
