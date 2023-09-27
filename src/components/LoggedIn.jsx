import React from "react"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"
import Toggleable from "./Toggleable"

const LoggedIn = ({
  user,
  handleLogout,
  blogs,
  handleCreate,
  handleUpdate,
  handleRemove,
}) => (
  <div>
    <h2>
      blogs
    </h2>
    <div>
      {`${user.username} logged in`}
      <button type="button" onClick={handleLogout}>logout</button>
    </div>

    <Toggleable buttonLabel="create new blog">
      <BlogForm handleCreate={handleCreate} />
    </Toggleable>

    <BlogList
      blogs={blogs}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  </div >
)

export default LoggedIn
