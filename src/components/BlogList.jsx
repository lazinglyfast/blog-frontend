import React from "react"

const BlogList = ({ blogs, handleUpdate, handleRemove }) => {
  const items = blogs.map((b) => (
    <li key={b.id}>
      {`${b.title} by ${b.author} (created by ${b.creator ? b.creator.name : "unknown"}) (${b.likes} likes)`}
      <button type="button" onClick={() => handleUpdate(b)}>like</button>
      <button type="button" onClick={() => handleRemove(b)}>remove</button>
    </li>
  ))

  return (<ul>{items}</ul>)
}

export default BlogList
