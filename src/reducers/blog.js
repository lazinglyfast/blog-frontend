import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blog"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    init(_state, action) {
      return action.payload
    },
    create(state, action) {
      return state.concat(action.payload)
    },
    update(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
  },
})

const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL":
    case "CREATE":
      return state.concat(action.payload)
    case "UPDATE":
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    case "REMOVE":
      return state.filter((b) => b.id !== action.payload.id)
    default:
      return []
  }
}

// action creators:

// function actions are enabled when we switch to configureStore
// export const setAllBlogs = () => async (dispatch) => {
//   const blogs = await blogService.list()
//   const action = {
//     type: "SET_ALL",
//     payload: blogs,
//   }
//   dispatch(action)
// }

export const setAllBlogs = (blogs) => ({
  type: "SET_ALL",
  payload: blogs,
})

export const createBlog = (blog) => ({
  type: "CREATE",
  payload: blog,
})

// export const updateBlog = (blog) => async (dispatch) => {
//   const blogToUpdate = {
//     ...blog,
//     likes: blog.likes + 1,
//   }
//   const updatedBlog = await blogService.update(blogToUpdate)
//   const action = {
//     type: "UPDATE",
//     payload: updatedBlog,
//   }
//   dispatch(action)
// }
export const updateBlog = (blog) => ({
  type: "UPDATE",
  payload: blog,
})

export const removeBlog = (blog) => ({
  type: "REMOVE",
  payload: blog,
})

export default blogReducer
