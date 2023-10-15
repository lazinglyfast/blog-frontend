import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification) {
    return <div />
  }
  return <div className={notification.type}>{notification.text}</div>
}

export default Notification
