import React from "react"
import NewBlog from "./NewBlog"
import BlogList from "./BlogList"

const LoggedIn = ({
  user,
  handleLogout,
  setTitle,
  setAuthor,
  setUrl,
  blogs,
  handleCreate,
  handleUpdate,
  handleRemove,
}) => (
  <div>
    <h2>
      blogs
    </h2>
    {`${user.username} logged in `}
    <button type="button" onClick={handleLogout}>logout</button>

    <NewBlog
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      handleCreate={handleCreate}
    />

    <BlogList
      blogs={blogs}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  </div>
)

export default LoggedIn
