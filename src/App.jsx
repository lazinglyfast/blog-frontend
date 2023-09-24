import { React, useState, useEffect } from "react"
import LoggedOut from "./components/LoggedOut"
import LoggedIn from "./components/LoggedIn"
import userService from "./services/login"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const runOnce = []
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUserJson")
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      setUser(loggedUser)
    }
  }, runOnce)

  const handleLogin = async () => {
    const response = await userService.login({ username, password })
    const loggedUser = response.data
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
    </div>
  )
}

export default App
