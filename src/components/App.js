import {Container} from "react-bootstrap"
import Signup from "./Signup"
import {AuthProvider} from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Dashbord from "./Dashbord"
import Login from "./Login"
import PrivateRouteUnverified from "./PrivateRouteUnverified"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import CheckEmail from "./CheckEmail"
import ResendVerification from "./ResendVerification"
import PrivateRouteVerified from "./PrivateRouteVerified"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}>
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRouteVerified>
                    <Dashbord />
                  </PrivateRouteVerified>
                }></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRouteUnverified>
                    <UpdateProfile />
                  </PrivateRouteUnverified>
                }></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/check-email"
                element={
                  <PrivateRouteUnverified>
                    <CheckEmail />
                  </PrivateRouteUnverified>
                }
              />
              {/* ... other routes ... */}
              <Route
                path="/resend-verification"
                element={
                  <PrivateRouteUnverified>
                    <ResendVerification />
                  </PrivateRouteUnverified>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
