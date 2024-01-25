import React, {useContext, useState, useEffect} from "react"
import {auth} from "../services/firebaseConfig"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"

const AuthContext = React.createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateCurrentEmail(email) {
    return updateEmail(auth.currentUser, email)
  }

  function updateCurrentPassword(newPassword) {
    return updatePassword(auth.currentUser, newPassword)
  }

  function reauthenticateCurrentWithCredential(password) {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    )
    return reauthenticateWithCredential(auth.currentUser, credential)
  }

  function sendCurrentEmailVerification() {
    return sendEmailVerification(auth.currentUser)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateCurrentEmail,
    updateCurrentPassword,
    sendCurrentEmailVerification,
    signInWithGoogle,
    reauthenticateCurrentWithCredential,
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  )
}
