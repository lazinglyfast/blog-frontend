import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import { notifySuccess, notifyError } from "./notification"

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    unsetUser() {
      return null
    },
  },
})

const { setUser, unsetUser } = userSlice.actions

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem("user", JSON.stringify(user))
    dispatch(setUser(user))
    dispatch(notifySuccess("logged in successfully"))
  } catch (exception) {
    window.localStorage.removeItem("user")
    dispatch(unsetUser())
    dispatch(notifyError("Invalid username and/or password"))
  }
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("user")
  dispatch(unsetUser())
  dispatch(notifySuccess("logged out successfully"))
}

export const logbackin = () => (dispatch) => {
  const userJson = window.localStorage.getItem("user")
  if (userJson) {
    const user = JSON.parse(userJson)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
