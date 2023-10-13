import React from "react"
import PropTypes from "prop-types"
import BlogItem from "./BlogItem"

const BlogList = ({ user, blogs, handleUpdate, handleRemove }) => {
  const items = blogs.map((b) => (
    <BlogItem
      user={user}
      key={b.id}
      blog={b}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  ))

  return <div>{items}</div>
}

BlogList.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
      author: PropTypes.string,
      creator: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default BlogList
