import { React, useState } from "react"
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
}) => {
  const [ascending, setAscending] = useState(true)
  const sortedBlogs = blogs.sort((ba, bb) => bb.likes - ba.likes)
  if (ascending) {
    sortedBlogs.reverse()
  }
  const label = ascending ? "most likes first" : "least likes first"
  return (
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

      <button type="button" onClick={() => setAscending(!ascending)}>{label}</button>

      <BlogList
        blogs={sortedBlogs}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
    </div>
  )
}
export default LoggedIn
