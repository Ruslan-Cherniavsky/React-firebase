import {Container} from "react-bootstrap"
import Signup from "./components/Auth/Signup/Signup"
import {AuthProvider} from "./context/AuthContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashbord from "./components/Dashboard/Dashboard"
import Login from "./components/Auth/Login/Login"
import PrivateRouteUnverified from "./components/Auth/PrivateRoutes/PrivateRouteUnverified"
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword"
import UpdateProfile from "./components/Auth/UpdateProfile/UpdateProfile"
import CheckEmail from "./components/Auth/CheckEmail/CheckEmail"
import PrivateRouteVerified from "./components/Auth/PrivateRoutes/PrivateRouteVerified"

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
                  <PrivateRouteVerified>
                    <UpdateProfile />
                  </PrivateRouteVerified>
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
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
