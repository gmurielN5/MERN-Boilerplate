import React from "react"
import { Alert } from "reactstrap"

const getStyle = ({ message, error }) => {
  let color = ""
  if (message.msgError || error) color = "danger"
  else color = "light border-dark"
  return color
}

const Message = ({ message, error }) => {
  if (message.length === 0) {
    return null
  }
  return (
    <Alert
      color={getStyle({ message, error })}
      className="text-center font-weight-bold shadow"
    >
      {!message.msgBody ? message : message.msgBody}
    </Alert>
  )
}

export default Message
