import { React, useState } from "react"

const BlogItem = ({ blog, handleUpdate, handleRemove }) => {
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
  return (
    <div style={blogStyle}>
      {`${blog.title} `}
      <span style={viewDetails ? hide : show}>
        <button type="button" onClick={() => setViewDetails(true)}>view</button>
      </span>
      <span style={viewDetails ? show : hide}>
        <button type="button" onClick={() => setViewDetails(false)}>hide</button>
        <div>{blog.url}</div>
        <div>
          {`likes ${blog.likes} `}
          <button type="button" onClick={() => handleUpdate(blog)}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          {`created by ${creator}`}
        </div>
      </span>
      <button type="button" onClick={() => handleRemove(blog)}>remove</button>
    </div>
  )
}

export default BlogItem
