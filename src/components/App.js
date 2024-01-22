import {Container} from "react-bootstrap"
import Signup from "./Signup"
import {AuthProvider} from "../context/AuthContext"
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Dashbord from "./Dashbord"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

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
                  <PrivateRoute>
                    <Dashbord />
                  </PrivateRoute>
                }></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
