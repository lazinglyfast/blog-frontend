import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import BlogItem from "./BlogItem"
import blogService from "../services/blog"

const BlogList = () => {
  const [ascending, setAscending] = useState(true)
  const query = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.list,
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = query.data

  blogs.sort((ba, bb) => bb.likes - ba.likes)
  if (ascending) {
    blogs.reverse()
  }
  const items = blogs.map((b) => <BlogItem key={b.id} blog={b} />)

  return (
    <>
      <button type="button" onClick={() => setAscending(!ascending)}>
        {ascending ? "most likes first" : "least likes first"}
      </button>
      <div>{items}</div>
    </>
  )
}

export default BlogList
