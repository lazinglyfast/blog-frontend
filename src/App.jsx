import { React, useState, useEffect, useRef } from "react"
import LoggedOut from "./components/LoggedOut"
import LoggedIn from "./components/LoggedIn"
import Notification from "./components/Notification"
import loginService from "./services/login"
import blogService from "./services/blog"
import "./index.css"

const TIMEOUT = 5000

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  const runOnlyOnceAtApplicationStart = []

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUserJson")
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      setUser(loggedUser)
    }
  }, runOnlyOnceAtApplicationStart)

  useEffect(() => {
    const dummy = async () => {
      const blogsFromServer = await blogService.list()
      if (blogsFromServer) {
        setBlogs(blogsFromServer)
      }
    }
    dummy()
  }, runOnlyOnceAtApplicationStart)

  const notify = (notification) => {
    setMessage(notification)
    setTimeout(() => setMessage(null), TIMEOUT)
  }

  const handleLogin = async () => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUserJson", JSON.stringify(loggedUser))
      setUser(loggedUser)
      notify({ text: "logged in successfully", type: "success" })
    } catch (exception) {
      window.localStorage.removeItem("loggedUserJson")
      setUser(null)
      notify({ text: "Invalid username and/or password", type: "error" })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUserJson")
    setUser(null)
    notify({ text: "logged out successfully", type: "success" })
  }

  const toggleableRef = useRef()
  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog, user)
    setBlogs(blogs.concat(newBlog))
    notify({
      text: `a new blog "${newBlog.title}" by "${newBlog.author}" added`,
      type: "success",
    })
    toggleableRef.current.hide()
  }

  const handleUpdate = async (blog) => {
    try {
      const temp = {
        ...blog,
        likes: blog.likes + 1,
      }
      const updatedBlog = await blogService.update(temp)
      const updatedBlogs = blogs.map((b) => {
        if (b.id === blog.id) {
          return { ...b, likes: updatedBlog.likes }
        }
        return b
      })
      setBlogs(updatedBlogs)
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
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(filteredBlogs)
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
