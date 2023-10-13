import React from "react"
import PropTypes from "prop-types"

const Notification = ({ message }) => (
  <div className={message.type}>{message.text}</div>
)

Notification.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
}

export default Notification
