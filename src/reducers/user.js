import { createSlice } from "@reduxjs/toolkit"

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

export const { setUser, unsetUser } = userSlice.actions

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("user")
  dispatch(unsetUser())
}

export const logbackin = () => (dispatch) => {
  const userJson = window.localStorage.getItem("user")
  if (userJson) {
    const user = JSON.parse(userJson)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
