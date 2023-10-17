import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "react-bootstrap"
import commentService from "../services/comment"
import useField from "../hooks"

const CommentForm = ({ blog }) => {
  const content = useField("content", "text")

  const comment = {
    content: content.value,
    blog: blog.id,
  }

  const client = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: async (commentToMutate) =>
      await commentService.create(commentToMutate),
    onSuccess: (createdComment) => {
      const oldComments = client.getQueryData(["comments"])
      const newComments = oldComments.concat(createdComment)
      client.setQueryData(["comments"], newComments)
    },
  })

  return (
    <div>
      <input {...content} />
      <Button
        variant="primary"
        type="button"
        onClick={() => createCommentMutation.mutate(comment)}
      >
        add
      </Button>
    </div>
  )
}

export default CommentForm
