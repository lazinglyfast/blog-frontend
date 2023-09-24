import { React, useState, useEffect } from "react"
import LoggedOut from "./components/LoggedOut"
import LoggedIn from "./components/LoggedIn"
import BlogList from "./components/BlogList"
import loginService from "./services/login"
import blogService from "./services/blog"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

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

  const handleLogin = async () => {
    const loggedUser = await loginService.login({ username, password })
    window.localStorage.setItem("loggedUserJson", JSON.stringify(loggedUser))
    setUser(loggedUser)
  }

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedUserJson")
    setUser(null)
  }

  return (
    <div>
      {user ? <LoggedIn user={user} handleLogout={handleLogout} /> : (
        <LoggedOut
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App
