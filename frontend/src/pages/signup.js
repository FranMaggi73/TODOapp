import React from "react";

export default function SignUp(props) {
  return (
    <div className="login-form">
      <form onSubmit={props.submit}>
        <h1>Sign Up</h1>
        <div className="field">
          <label>Email</label>
          <input required placeholder="Email" name="email" />
          <p>{props.emailError}</p>
        </div>
        <div className="field">
          <label>Password</label>
          <input required type='password' placeholder="Password" name="password" />
          <p>{props.passwordError}</p>
        </div>
        <div className="field">
          <label>Password Confirmation</label>
          <input required type='password' placeholder="Password Confirmation" name="passwordConfirmation" />
          <p>{props.passConfError}</p>
        </div>
        <div className="form-options">
          <p>Already have an account? <label onClick={props.switch}>Log In</label></p>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}