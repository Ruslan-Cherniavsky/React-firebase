import React, {useRef, useState, useEffect} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import {auth} from "../firebase"

export default function Login() {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login, currentUser} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [notVerifiedUser, setNotVerifiedUser] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      await login(emailRef.current.value, passwordRef.current.value)

      if (!auth.currentUser.emailVerified) {
        // not verified user
        setNotVerifiedUser(true)
        return setError("Please verify your email before logging in.")
      }

      navigate("/")
    } catch (error) {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Forgot password? <Link to="/forgot-password">Password reset</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          {notVerifiedUser ? (
            <div className="w-100 text-center mt-2">
              Didn't receive the email?{" "}
              <Link to="/resend-verification">Resend Verification Email</Link>
            </div>
          ) : null}
        </Card.Body>
      </Card>
    </>
  )
}
