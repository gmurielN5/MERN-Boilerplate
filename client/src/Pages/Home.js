// conditanlly return homepage if user is authenticated if not Public page
import React, { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import PublicHomepage from "./PublicHomepage"
import PrivateHomepage from "./PrivateHomepage"

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return <>{isAuthenticated ? <PrivateHomepage /> : <PublicHomepage />}</>
}

export default Home
