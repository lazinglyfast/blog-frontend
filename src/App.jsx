import { React, useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import LoggedOut from "./components/LoggedOut"
import LoggedIn from "./components/LoggedIn"
import Notification from "./components/Notification"
import loginService from "./services/login"
import blogService from "./services/blog"
import "./index.css"
import {
  setAllBlogs,
  createBlog,
  updateBlog,
  removeBlog,
} from "./reducers/blog"
import { setUser, unsetUser } from "./reducers/user"

const TIMEOUT = 5000

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const runOnlyOnceAtApplicationStart = []

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUserJson")
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      dispatch(setUser(loggedUser))
    }
  }, runOnlyOnceAtApplicationStart)

  useEffect(() => {
    blogService.list().then((blogsList) => {
      dispatch(setAllBlogs(blogsList))
    })
  }, runOnlyOnceAtApplicationStart)

  const notify = (notification) => {
    setMessage(notification)
    setTimeout(() => setMessage(null), TIMEOUT)
  }

  const handleLogin = async () => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUserJson", JSON.stringify(loggedUser))
      dispatch(setUser(loggedUser))
      notify({ text: "logged in successfully", type: "success" })
    } catch (exception) {
      window.localStorage.removeItem("loggedUserJson")
      dispatch(unsetUser())
      notify({ text: "Invalid username and/or password", type: "error" })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUserJson")
    dispatch(unsetUser())
    notify({ text: "logged out successfully", type: "success" })
  }

  const toggleableRef = useRef()
  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog, user)
    dispatch(createBlog(newBlog))
    notify({
      text: `a new blog "${newBlog.title}" by "${newBlog.author}" added`,
      type: "success",
    })
    toggleableRef.current.hide()
  }

  const handleUpdate = async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
      }
      console.log(blog)
      console.log(blogToUpdate)
      const updatedBlog = await blogService.update(blogToUpdate)
      dispatch(updateBlog(updatedBlog))
    } catch (exception) {
      let text = exception.response.data.error
      if (!text) {
        text = "internal server error"
      }
      notify({ text, type: "error" })
    }
  }

  const handleRemove = async (blog) => {
    const warning = `Are you sure you want to remove "${blog.title}" by ${blog.author}?`
    // eslint-disable-next-line no-alert
    if (!window.confirm(warning)) {
      return
    }

    try {
      await blogService.remove(blog, user)
      dispatch(removeBlog(blog))
    } catch (exception) {
      let text = exception.response.data.error
      if (!text) {
        text = "internal server error"
      }
      notify({ text, type: "error" })
    }
  }

  return (
    <div>
      {message ? <Notification message={message} /> : ""}
      {user ? (
        <LoggedIn
          user={user}
          handleLogout={handleLogout}
          blogs={blogs}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          toggleableRef={toggleableRef}
        />
      ) : (
        <LoggedOut
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  )
}

export default App
