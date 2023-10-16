import React from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"
import blogService from "../services/blog"
import { useUser } from "./UserContext"

const BlogDetails = ({ blog }) => {
  if (!blog) {
    return <div />
  }

  const client = useQueryClient()
  const user = useUser()
  const dispatchNotification = useNotificationDispatch()
  const creator = blog.creator ? blog.creator.username : "unknown"
  const removeVisible = creator === user.username ? {} : { display: "none" }
  const navigate = useNavigate()

  const likeBlogMutation = useMutation({
    mutationFn: async (blogToMutate) => {
      const blogToUpdate = {
        ...blogToMutate,
        likes: blogToMutate.likes + 1,
      }
      return await blogService.update(blogToUpdate)
    },
    onSuccess: (updatedBlog) => {
      const blogs = client.getQueryData(["blogs"])
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      )
      client.setQueryData(["blogs"], updatedBlogs)
    },
    onError: () => {
      const text = "internal server error"
      notifyError(dispatchNotification, text)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: async (blogToMutate) => {
      await blogService.remove(blogToMutate, user)
      return blogToMutate
    },
    onSuccess: (mutatedBlog) => {
      const oldBlogs = client.getQueryData(["blogs"])
      const blogs = oldBlogs.filter((b) => b.id !== mutatedBlog.id)
      client.setQueryData(["blogs"], blogs)

      navigate("/")

      const text = `removed ${mutatedBlog.title}`
      notifySuccess(dispatchNotification, text)
    },
    onError: () => {
      const text = "internal server error"
      notifyError(dispatchNotification, text)
    },
  })

  const handleRemove = async () => {
    const warning = `Are you sure you want to remove "${blog.title}" by ${blog.author}?`
    // eslint-disable-next-line no-alert
    if (!window.confirm(warning)) {
      return
    }

    removeBlogMutation.mutate(blog)
  }

  return (
    <div>
      <h1>{`${blog.title} by ${blog.author}`}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {`likes ${blog.likes} `}
        <button type="button" onClick={() => likeBlogMutation.mutate(blog)}>
          like
        </button>
      </div>
      <div>{`created by ${creator}`}</div>
      <button
        style={removeVisible}
        type="button"
        onClick={() => handleRemove(blog)}
      >
        remove
      </button>
    </div>
  )
}

export default BlogDetails
