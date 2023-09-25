import React from "react"

const LoggedOut = ({
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <>
    <div>
      <h2>
        log in to the application
      </h2>
      <label htmlFor="username">
        username
        <input id="username" type="text" onChange={({ target }) => setUsername(target.value)} />
      </label>
    </div>
    <div>
      <label htmlFor="password">
        password
        <input id="password" type="password" onChange={({ target }) => setPassword(target.value)} />
      </label>
    </div>
    <button type="button" onClick={handleLogin}>login</button>
  </>
)

export default LoggedOut
