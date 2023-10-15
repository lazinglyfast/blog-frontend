import { createContext, useReducer, useContext, useMemo } from "react"

const TIMEOUT = 5000

const notificationReducer = (_state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
    default:
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null,
  )
  const value = useMemo(
    () => ({ notification, dispatchNotification }),
    [notification, dispatchNotification],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.notification
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.dispatchNotification
}

export const notifySuccess = (dispatch, text) => {
  dispatch({
    type: "SET",
    payload: { text, type: "success" },
  })

  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, TIMEOUT)
}

export const notifyError = (dispatch, text) => {
  dispatch({
    type: "SET",
    payload: { text, type: "error" },
  })

  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, TIMEOUT)
}

export default NotificationContextProvider
