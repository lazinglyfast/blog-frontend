import React from "react"
import { useDispatch } from "react-redux"
import useField from "../hooks"
import loginService from "../services/login"
import { setUser, unsetUser } from "../reducers/user"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"

const LoggedOut = () => {
  const dispatch = useDispatch()
  const dispatchNotification = useNotificationDispatch()
  const username = useField("username", "text")
  const password = useField("password", "password")

  const onClick = async () => {
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem("user", JSON.stringify(user))
      dispatch(setUser(user))
      const text = `${user.username} logged in successfully`
      notifySuccess(dispatchNotification, text)
    } catch (exception) {
      window.localStorage.removeItem("user")
      dispatch(unsetUser())
      const text = "Invalid username and/or password"
      notifyError(dispatchNotification, text)
    }
  }

  return (
    <>
      <h2>log in to the application</h2>
      <div>
        username: <input {...username} />
      </div>
      <div>
        password: <input {...password} />
      </div>
      <button type="button" onClick={onClick}>
        login
      </button>
    </>
  )
}

export default LoggedOut
