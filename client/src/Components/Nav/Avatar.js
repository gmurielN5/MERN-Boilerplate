import React from "react"
import { Container } from "reactstrap"

const Avatar = ({ user }) => {
  return (
    <>
      {user.avatar ? (
        <img src={user.avatar} alt="avatar" className="avatar rounded-circle" />
      ) : (
        <div className="avatar">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#333333" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="white"
              dy=".3em"
              className="avatarTxt"
            >
              {user.username.slice(0, 1).toUpperCase()}
            </text>
          </svg>
        </div>
      )}
    </>
  )
}

export default Avatar
