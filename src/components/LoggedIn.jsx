import React from "react"

const LoggedIn = ({ user, handleLogout }) => (
  <div>
    {`${user.username} logged in `}
    <button type="button" onClick={handleLogout}>logout</button>
  </div>
)

export default LoggedIn
