import { React, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"
import blogService from "../services/blog"
import { useUser } from "./UserContext"

const BlogItem = ({ blog }) => {
  const user = useUser()
  const dispatchNotification = useNotificationDispatch()
  const [viewDetails, setViewDetails] = useState(false)
  const blogStyle = {
    padding: 10,
    paddingLeft: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const show = {}
  const hide = { display: "none" }
  const creator = blog.creator ? blog.creator.username : "unknown"
  const removeVisible = creator === user.username ? {} : { display: "none" }

  const client = useQueryClient()

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
    <div style={blogStyle} className="blog">
      {`${blog.title} by ${blog.author}`}
      <span style={viewDetails ? hide : show}>
        <button type="button" onClick={() => setViewDetails(true)}>
          view
        </button>
      </span>
      <span style={viewDetails ? show : hide} data-testid="view">
        <button type="button" id="view" onClick={() => setViewDetails(false)}>
          hide
        </button>
        <div id="url">{blog.url}</div>
        <div data-testid="likes">
          {`likes ${blog.likes} `}
          <button
            type="button"
            className="like"
            onClick={() => likeBlogMutation.mutate(blog)}
          >
            like
          </button>
        </div>
        <div>{`created by ${creator}`}</div>
      </span>
      <button
        id="remove"
        style={removeVisible}
        type="button"
        onClick={() => handleRemove(blog)}
      >
        remove
      </button>
    </div>
  )
}

export default BlogItem
