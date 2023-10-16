import { createContext, useReducer, useContext, useMemo } from "react"

const userReducer = (_state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
    default:
      return null
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, dispatchUser] = useReducer(userReducer, null)
  const value = useMemo(() => ({ user, dispatchUser }), [user, dispatchUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch.user
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch.dispatchUser
}

const setUser = (dispatch, user) => {
  dispatch({
    type: "SET",
    payload: user,
  })
}

export const restoreUser = (dispatch) => {
  const userJson = window.localStorage.getItem("user")
  if (userJson) {
    const user = JSON.parse(userJson)
    setUser(dispatch, user)
  }
}

export const storeUser = (dispatch, user) => {
  window.localStorage.setItem("user", JSON.stringify(user))
  setUser(dispatch, user)
}

export const clearUser = (dispatch) => {
  window.localStorage.removeItem("user")
  dispatch({
    type: "CLEAR",
  })
}

export default UserContextProvider
