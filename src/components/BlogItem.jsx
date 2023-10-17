import React from "react"
import { Link } from "react-router-dom"

const BlogItem = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <tr style={blogStyle} className="blog">
      <td>
        <Link
          to={`/blogs/${blog.id}`}
        >{`${blog.title} by ${blog.author}`}</Link>
      </td>
    </tr>
  )
}

export default BlogItem
