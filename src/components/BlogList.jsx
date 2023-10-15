import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import BlogItem from "./BlogItem"
import { sortBlogs } from "../reducers/blog"

const BlogList = () => {
  const dispatch = useDispatch()
  const [ascending, setAscending] = useState(true)
  const blogs = useSelector((state) => state.blogs)
  const items = blogs.map((b) => <BlogItem key={b.id} blog={b} />)

  useEffect(() => {
    dispatch(sortBlogs(ascending))
  }, [ascending])

  return (
    <div>
      <button type="button" onClick={() => setAscending(!ascending)}>
        {ascending ? "most likes first" : "least likes first"}
      </button>
      {items}
    </div>
  )
}

export default BlogList
