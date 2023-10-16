import React, { useRef } from "react"
import Toggleable from "./Toggleable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

const Blogs = () => {
  const toggleableRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Toggleable buttonLabel="create new blog" ref={toggleableRef}>
        <BlogForm toggleableRef={toggleableRef} />
      </Toggleable>
      <BlogList />
    </div>
  )
}

export default Blogs
