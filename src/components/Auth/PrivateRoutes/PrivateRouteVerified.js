import React from "react"
import {Navigate} from "react-router-dom"
import {auth} from "../../../services/firebaseConfig"

export default function PrivateRouteVerified({children}) {
  return auth?.currentUser?.emailVerified ? (
    children
  ) : (
    <Navigate to="/check-email" />
  )
}
