import React from "react"

const NewBlog = ({
  setTitle,
  setAuthor,
  setUrl,
  handleCreate,
}) => (
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
    <button type="button" onClick={handleCreate}>create</button>
  </>
)

export default NewBlog
