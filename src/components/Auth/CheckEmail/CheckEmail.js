import React, {useEffect, useState} from "react"
import {Card, Alert, Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import {auth} from "../../../services/firebaseConfig"
import {useAuthContext} from "../../../context/AuthContext"

export default function CheckEmail() {
  const {sendCurrentEmailVerification} = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function handleResendVerification() {
    try {
      setLoading(true)
      setError("")
      setMessage("")
      // Ensure the user is logged in
      if (auth.currentUser) {
        // Send a new verification email
        await sendCurrentEmailVerification()
        setMessage("Verification email sent successfully.")
      } else {
        setError("User not logged in.")
      }
    } catch (error) {
      if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.")
      } else {
        setError("Error sending verification email: ")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Check your email</h2>
          {error ? <Alert variant="danger">{error}</Alert> : null}

          {!error || message ? (
            <Alert variant="info">
              We've sent a verification link to your email address. Please check
              your email and click on the link to verify your account.
            </Alert>
          ) : null}

          <div className="w-100 text-center mt-2">
            Didn't receive the email?{" "}
          </div>

          <Button
            disabled={loading}
            className="w-100"
            onClick={handleResendVerification}>
            Resend Verification Email
          </Button>
          <div className="w-100 text-center mt-2">
            Your email has been verified? Try to <Link to="/login">Log in</Link>{" "}
            again
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
