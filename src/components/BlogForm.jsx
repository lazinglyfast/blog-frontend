import { React, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createBlog } from "../reducers/blog"
import { notifySuccess } from "../reducers/notification"

const BlogForm = ({ toggleableRef }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  const blog = {
    title,
    author,
    url,
    likes: 0,
  }

  const handleCreate = async () => {
    dispatch(createBlog(blog, user))
    const message = `a new blog "${blog.title}" by "${blog.author}" added`
    dispatch(notifySuccess(message))
    toggleableRef.current.hide()
  }

  return (
    <div data-testid="container">
      <div>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="author">
          Author:
          <input
            id="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="url">
          Url:
          <input
            id="url"
            type="text"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="button" onClick={() => handleCreate(blog)}>
        create
      </button>
    </div>
  )
}

export default BlogForm
