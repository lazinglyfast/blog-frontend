// import { createStore, combineReducers } from "redux"
// const store = createStore(
//   combineReducers({
//     blogs: blogReducer,
//     user: userReducer,
//   }),
// )

import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blog"
import userReducer from "./reducers/user"
import notificationReducer from "./reducers/notification"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})

export default store
