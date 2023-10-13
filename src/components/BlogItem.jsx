import { React, useState } from "react"
import PropTypes from "prop-types"

const BlogItem = ({ user, blog, handleUpdate, handleRemove }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const blogStyle = {
    padding: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const show = {}
  const hide = { display: "none" }
  const creator = blog.creator ? blog.creator.name : "unknown"
  const creatorUsername = blog.creator ? blog.creator.username : "unknown"
  const removeVisible =
    creatorUsername === user.username ? {} : { display: "none" }
  return (
    <div style={blogStyle} className="blog">
      {`${blog.title} by ${blog.author}`}
      <span style={viewDetails ? hide : show}>
        <button type="button" onClick={() => setViewDetails(true)}>
          view
        </button>
      </span>
      <span style={viewDetails ? show : hide} data-testid="view">
        <button type="button" id="view" onClick={() => setViewDetails(false)}>
          hide
        </button>
        <div id="url">{blog.url}</div>
        <div data-testid="likes">
          {`likes ${blog.likes} `}
          <button
            type="button"
            className="like"
            onClick={() => handleUpdate(blog)}
          >
            like
          </button>
        </div>
        <div>{`created by ${creator}`}</div>
      </span>
      <button
        id="remove"
        style={removeVisible}
        type="button"
        onClick={() => handleRemove(blog)}
      >
        remove
      </button>
    </div>
  )
}

BlogItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    author: PropTypes.string,
    creator: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default BlogItem
