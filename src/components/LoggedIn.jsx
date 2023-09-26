import React from "react"
import NewBlog from "./NewBlog"
import BlogList from "./BlogList"
import Toggleable from "./Toggleable"

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

    <Toggleable buttonLabel="new note">
      <NewBlog
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        handleCreate={handleCreate}
      />
    </Toggleable>

    <BlogList
      blogs={blogs}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  </div>
)

export default LoggedIn
