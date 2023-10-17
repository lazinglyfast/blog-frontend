import React from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import useField from "../hooks"
import loginService from "../services/login"
import { useUserDispatch, storeUser, clearUser } from "./UserContext"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"

const Login = () => {
  const navigate = useNavigate()
  const dispatchUser = useUserDispatch()
  const dispatchNotification = useNotificationDispatch()
  const username = useField("username", "text")
  const password = useField("password", "password")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      storeUser(dispatchUser, user)
      navigate("/")
      const text = `${user.username} logged in successfully`
      notifySuccess(dispatchNotification, text)
    } catch (exception) {
      clearUser(dispatchUser)
      const text = "Invalid username and/or password"
      notifyError(dispatchNotification, text)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>log in to the application</h2>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control {...username} />
        <Form.Label>password:</Form.Label>
        <Form.Control {...password} />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Login
