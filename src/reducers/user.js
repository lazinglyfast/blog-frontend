const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload
    case "REMOVE":
    default:
      return state || null
  }
}

export const setUser = (user) => ({
  type: "SET",
  payload: user,
})

export const unsetUser = () => ({
  type: "REMOVE",
})

export default userReducer
