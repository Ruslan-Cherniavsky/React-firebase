import React, {useState} from "react"
import {Card, Button, Alert} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {auth} from "../firebase"
import {Link} from "react-router-dom"

export default function ResendVerification() {
  const {currentUser, sendCurrentEmailVerification} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleResendVerification() {
    try {
      setLoading(true)
      setError("")

      // Ensure the user is logged in
      if (auth.currentUser) {
        // Send a new verification email
        await sendCurrentEmailVerification()
        setError("Verification email sent successfully.")
      } else {
        setError("User not logged in.")
      }
    } catch (error) {
      setError("Error sending verification email: " + error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Resend Verification Email</h2>
          {error && <Alert variant="info">{error}</Alert>}
          <Button
            disabled={loading}
            className="w-100"
            onClick={handleResendVerification}>
            Resend Verification Email
          </Button>
          <div className="w-100 text-center mt-2">
            Your email has been verified? Try to <Link to="/login">Log in</Link>{" "}
            again{" "}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
