import React from "react"
import useField from "../hooks"
import loginService from "../services/login"
import { useUserDispatch, storeUser, clearUser } from "./UserContext"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"

const LoggedOut = () => {
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()
  const username = useField("username", "text")
  const password = useField("password", "password")

  const onClick = async () => {
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      storeUser(dispatchUser, user)
      const text = `${user.username} logged in successfully`
      notifySuccess(dispatchNotification, text)
    } catch (exception) {
      clearUser(dispatchUser)
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
