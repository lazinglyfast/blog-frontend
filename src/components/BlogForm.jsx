import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"
import blogService from "../services/blog"
import useField from "../hooks"
import { useUser } from "./UserContext"

const BlogForm = ({ toggleableRef }) => {
  const user = useUser()
  const dispatchNotification = useNotificationDispatch()
  const title = useField("title", "text")
  const author = useField("author", "text")
  const url = useField("url", "text")

  const blog = {
    title: title.value,
    author: author.value,
    url: url.value,
    likes: 0,
  }

  const client = useQueryClient()

  const createBlogMutation = useMutation({
    mutationFn: async (blogToMutate) =>
      await blogService.create(blogToMutate, user),
    onSuccess: (createdBlog) => {
      // client.invalidateQueries({ queryKey: ["blogs"] })
      const blogs = client.getQueryData(["blogs"]).concat(createdBlog)
      client.setQueryData(["blogs"], blogs)

      const text = `a new blog "${blog.title}" by "${blog.author}" added`
      notifySuccess(dispatchNotification, text)
      toggleableRef.current.hide()
    },
    onError: () => {
      const text = "internal server error"
      notifyError(dispatchNotification, text)
    },
  })

  return (
    <div data-testid="container">
      <div>
        Title: <input {...title} />
      </div>
      <div>
        Author: <input {...author} />
      </div>
      <div>
        Url: <input {...url} />
      </div>
      <button type="button" onClick={() => createBlogMutation.mutate(blog)}>
        create
      </button>
    </div>
  )
}

export default BlogForm
