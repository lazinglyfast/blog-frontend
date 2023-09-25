import React from "react"

const Notification = ({ message }) => (
  <div className={message.type}>
    {message.text}
  </div>
)

export default Notification
