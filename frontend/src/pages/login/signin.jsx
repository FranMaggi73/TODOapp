import React from "react";

export default function SignIn(props) {
  return (
    <div className="login-form">
      <form method="POST" action='/signin' onSubmit={props.submit}>
        <h1>Sign In</h1>
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
        <div className="form-options">
          <p><label onClick={props.switch}>Create an account</label></p>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  )
}