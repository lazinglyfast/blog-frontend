import React from "react"
import BlogItem from "./BlogItem"

const BlogList = ({ blogs, handleUpdate, handleRemove }) => {
  const items = blogs.map((b) => (
    <BlogItem
      key={b.id}
      blog={b}
      handleUpdate={handleUpdate}
      handleRemove={handleRemove}
    />
  ))

  return (<div>{items}</div>)
}

export default BlogList
