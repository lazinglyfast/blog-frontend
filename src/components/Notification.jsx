import React from "react"
// import { useSelector } from "react-redux"
import { useNotification } from "./NotificationContext"

const Notification = () => {
  // const notification = useSelector((state) => state.notification)
  const notification = useNotification()
  if (!notification) {
    return <div />
  }
  return <div className={notification.type}>{notification.text}</div>
}

export default Notification
