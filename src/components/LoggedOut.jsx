import React from "react"
import { useDispatch } from "react-redux"
import useField from "../hooks"
import { login } from "../reducers/user"

const LoggedOut = () => {
  const dispatch = useDispatch()
  const username = useField("username", "text")
  const password = useField("password", "password")

  return (
    <>
      <h2>log in to the application</h2>
      <div>
        username: <input {...username} />
      </div>
      <div>
        password: <input {...password} />
      </div>
      <button
        type="button"
        onClick={() => dispatch(login(username.value, password.value))}
      >
        login
      </button>
    </>
  )
}

export default LoggedOut
