import { React, useState } from "react"
import PropTypes from "prop-types"
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
  toggleableRef,
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

      <Toggleable buttonLabel="create new blog" ref={toggleableRef}>
        <BlogForm handleCreate={handleCreate} />
      </Toggleable>

      <button type="button" onClick={() => setAscending(!ascending)}>{label}</button>

      <BlogList
        user={user}
        blogs={sortedBlogs}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
    </div>
  )
}

LoggedIn.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    author: PropTypes.string,
    creator: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  toggleableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        hide: PropTypes.func,
      }),
    }),
  ]).isRequired,
}

export default LoggedIn
