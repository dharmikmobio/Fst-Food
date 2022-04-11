import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
// import { Link } from "react-router-dom"
import "../Stylesheets/forget.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
    //   setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    // setLoading(false)
  }

  return (
    <>
            <div className="all">
            <form class="login-form" onSubmit={handleSubmit}>
            <h1>Password Reset</h1>
            <div class="form-input-material">
            {error && <p variant="danger" style={{"color" : "red"}} className="form-control-material">{error}</p>}
            {message && <p variant="success" style={{"color" : "green"}} className="form-control-material" >{message}</p>}
            <label htmlFor="Email">Email : </label><br></br>
            <input type="email" name="username" id="Email" placeholder="Your Mail id"   ref={emailRef}  autocomplete="off" class="form-control-material" required />
            </div>
           
            <button type="submit"  class="btn btn-primary btn-ghost">Reset Password</button>
            </form>
            </div>
    </>
  )
}
