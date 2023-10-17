import React from "react"
import { useQuery } from "@tanstack/react-query"
import CommentItem from "./CommentItem"

const CommentList = ({ blog }) => {
  const query = useQuery({
    queryKey: ["comments"],
    // managed to avoid making an unnecessary request here
    queryFn: () => blog.comments,
  })

  if (query.isLoading) {
    return <div>Loading...</div>
  }

  const comments = query.data
  const items = comments.map((c) => <CommentItem key={c.id} comment={c} />)
  return <ul>{items}</ul>
}

export default CommentList
