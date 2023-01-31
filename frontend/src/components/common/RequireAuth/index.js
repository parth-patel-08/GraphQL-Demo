import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function RequireAuth({ children }) {
  const isLogin = useSelector((state) => state.user.isLogin)

  if (isLogin) {
    return children
  }
  return <Navigate to="/login" replace />
}

export default RequireAuth
