import React from "react"

const BlogList = ({ blogs }) => {
  const items = blogs.map((b) => (
    <li key={b.id}>
      {`${b.title} by ${b.author} (${b.likes} likes)`}
      <button type="button" onClick={() => console.log(b.title)}>like</button>
      <button type="button" onClick={() => console.log(b.author)}>delete</button>
    </li>
  ))

  return (<ul>{items}</ul>)
}

export default BlogList
