import React from "react"
import {Navigate} from "react-router-dom"
import {useAuthContext} from "../../../context/AuthContext"

export default function PrivateRouteUnverified({children}) {
  const {currentUser} = useAuthContext()

  return currentUser ? children : <Navigate to="/login" />
}
