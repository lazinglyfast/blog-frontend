import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blog"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    },
    sortBlogs(state, action) {
      // immer
      state.sort((ba, bb) => bb.likes - ba.likes)
      const ascending = action.payload
      if (ascending) {
        state.reverse()
      }
      return state
    },
  },
})

const { setBlogs, addBlog, updateBlog, removeBlog, sortBlogs } =
  blogSlice.actions

export { sortBlogs }

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.list()
  dispatch(setBlogs(blogs))
}

export const createBlog = (blog, user) => async (dispatch) => {
  const newBlog = await blogService.create(blog, user)
  dispatch(addBlog(newBlog))
}

export const likeBlog = (blog) => async (dispatch) => {
  const blogToUpdate = {
    ...blog,
    likes: blog.likes + 1,
  }
  const updatedBlog = await blogService.update(blogToUpdate)
  dispatch(updateBlog(updatedBlog))
}

export const deleteBlog = (blog, user) => async (dispatch) => {
  await blogService.remove(blog, user)
  dispatch(removeBlog(blog))
}

export default blogSlice.reducer
