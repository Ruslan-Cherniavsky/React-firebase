import React, {useEffect, useState} from "react"
import {Card, Alert} from "react-bootstrap"
import {Link} from "react-router-dom"
import {auth} from "../firebase"

export default function CheckEmail() {
  const [status, setStatus] = useState("")

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Check your email</h2>
          <Alert variant="info">
            We've sent a verification link to your email address. Please check
            your email and click on the link to verify your account.
          </Alert>
          <p>
            Didn't receive the email?{" "}
            <Link to="/resend-verification">Resend Verification Email</Link>
          </p>
          Your email has been verified? Try to <Link to="/login">Log in</Link>{" "}
          again
        </Card.Body>
      </Card>
    </>
  )
}
