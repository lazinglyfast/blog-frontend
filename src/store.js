import { createStore, combineReducers } from "redux"
// import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blog"
import userReducer from "./reducers/user"

const store = createStore(
  combineReducers({
    blogs: blogReducer,
    user: userReducer,
  }),
)

// const store = configureStore({
//   reducer: {
//     blogs: blogReducer,
//     user: userReducer,
//   },
// })

export default store
