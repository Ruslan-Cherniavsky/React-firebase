import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {Link, useNavigate} from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup, currentUser, sendCurrentEmailVerification, signInWithGoogle} =
    useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords must match")
    }

    try {
      setLoading(true)
      setError("")
      // Call the signup function to create a new user
      await signup(emailRef.current.value, passwordRef.current.value)
      // After signup, send email verification
      await sendVerificationEmail()
      // Navigate to a page or display a message indicating successful signup
      navigate("/check-email")
    } catch (error) {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  async function sendVerificationEmail() {
    if (currentUser) {
      try {
        await sendCurrentEmailVerification(currentUser)
        console.log("Verification email sent successfully")
      } catch (error) {
        console.error("Error sending verification email: ", error)
      }
    }
  }

  async function handleGoogleSignup() {
    try {
      setLoading(true)
      setError("")
      await signInWithGoogle()
      // After successful signup, you can redirect the user
      navigate("/") // Change "/redirected-page" to your desired path
    } catch (error) {
      setError("Failed to sign up with Google")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign up
            </Button>
            <Button
              disabled={loading}
              className="w-100 mt-3"
              onClick={handleGoogleSignup}>
              Sign up with Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  )
}

// import React, {useRef, useState} from "react"
// import {Form, Button, Card, Alert} from "react-bootstrap"
// import {useAuth} from "../context/AuthContext"
// import {Link, useNavigate} from "react-router-dom"

// export default function Signup() {
//   const navigate = useNavigate()
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()
//   const {signup, currentUser} = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(e) {
//     e.preventDefault()

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords must match")
//     }

//     try {
//       setLoading(true)
//       setError("")
//       await signup(emailRef.current.value, passwordRef.current.value)
//       navigate("/")
//     } catch (error) {
//       setError("Failed to create an account")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign up</h2>
//           {error && <Alert variant="danger">Error {error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control type="password" ref={passwordConfirmRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Sign up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Already have an account? <Link to="/login">Log in</Link>
//       </div>
//     </>
//   )
// }
