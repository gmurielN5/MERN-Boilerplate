import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"
import DashboardLayout from "../Components/DashboardLayout"

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <DashboardLayout>
            <Component {...props} />
          </DashboardLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
