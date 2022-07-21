import React from "react"
import Avatar from "./Avatar"

export const User = ({ user, size }) => {
  return (
    <div className="p-0 d-flex justify-content-start align-items-baseline">
      <div className="userAvatar ">
        <Avatar user={user} size={size} />
      </div>
      <div className="mx-2">
        <h6>{user.username}</h6>
      </div>
    </div>
  )
}
