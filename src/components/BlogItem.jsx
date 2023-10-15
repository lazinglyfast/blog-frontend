import { React, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blog"
import {
  useNotificationDispatch,
  notifySuccess,
  notifyError,
} from "./NotificationContext"

const BlogItem = ({ blog }) => {
  const dispatch = useDispatch()
  const dispatchNotification = useNotificationDispatch()
  const user = useSelector((state) => state.user)
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

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      let text = exception.response.data.error
      if (!text) {
        text = "internal server error"
      }
      notifyError(dispatchNotification, text)
    }
  }

  const handleRemove = async () => {
    const warning = `Are you sure you want to remove "${blog.title}" by ${blog.author}?`
    // eslint-disable-next-line no-alert
    if (!window.confirm(warning)) {
      return
    }

    try {
      dispatch(deleteBlog(blog, user))
      const text = `removed ${blog.title}`
      notifySuccess(dispatchNotification, text)
    } catch (exception) {
      let text = exception.response.data.error
      if (!text) {
        text = "internal server error"
      }
      notifyError(dispatchNotification, text)
    }
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
            onClick={() => handleLike(blog)}
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
