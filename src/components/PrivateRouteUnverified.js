import React from "react"
import {Navigate, Route} from "react-router-dom"
import {auth} from "../firebase"
import {useAuth} from "../context/AuthContext"

export default function PrivateRouteUnverified({children}) {
  const {currentUser} = useAuth()

  return currentUser?.emailVerified ? children : <Navigate to="/login" />
}
