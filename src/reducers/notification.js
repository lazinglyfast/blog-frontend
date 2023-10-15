import { createSlice } from "@reduxjs/toolkit"

const TIMEOUT = 5000

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    unsetNotification() {
      return null
    },
  },
})

const { setNotification, unsetNotification } = notificationSlice.actions

const notify = (text, type) => (dispatch) => {
  dispatch(setNotification({ text, type }))
  setTimeout(() => dispatch(unsetNotification()), TIMEOUT)
}

export const notifySuccess = (text) => notify(text, "success")
export const notifyError = (text) => notify(text, "error")

export default notificationSlice.reducer
