import { React, useState } from "react"

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  const blog = {
    title,
    author,
    url,
    likes: 0,
  }

  return (
    <>
      <div>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="author">
          Author:
          <input id="author" type="text" onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="url">
          Url:
          <input id="url" type="text" onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button type="button" onClick={() => handleCreate(blog)}>create</button>
    </>
  )
}

export default BlogForm
