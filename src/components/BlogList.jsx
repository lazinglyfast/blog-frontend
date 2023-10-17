import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, Button } from "react-bootstrap"
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
      <Button
        variant="primary"
        type="button"
        onClick={() => setAscending(!ascending)}
      >
        {ascending ? "most likes first" : "least likes first"}
      </Button>
      <Table striped>
        <tbody>{items}</tbody>
      </Table>
    </>
  )
}

export default BlogList
