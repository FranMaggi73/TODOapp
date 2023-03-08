import React, { useState } from "react";
import './login.css';
import SignUp from "./signup";
import SignIn from "./signin";

export default function Login() {
  const [signup, setSignup] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passConfError, setPassConfError] = useState('');

  const fetchUrl = () => signup ? '/signup' : '/signin';

  const sendData = async (e) => {
    e.preventDefault();
    const { errors } = await fetch(fetchUrl(), {
      method: 'POST',
      body: new URLSearchParams(new FormData(e.target))
    })
    .then((res) => {
      return res.json()
    })

    setEmailError('');
    setPasswordError('');
    setPassConfError('');
    if (errors) {
      if(errors.email) setEmailError(errors.email);
      if(errors.password) setPasswordError(errors.password);
      if(errors.passwordConfirmation) setPassConfError(errors.passwordConfirmation);
      return
    };

    window.location.reload();
  }

  const switchLogin = () => setSignup(!signup)

  if (signup) {
    return <SignUp 
      submit={sendData}
      switch={switchLogin}
      emailError={emailError}
      passwordError={passwordError}
      passConfError={passConfError}
    />
  }

  return <SignIn 
      submit={sendData}
      switch={switchLogin}
      emailError={emailError}
      passwordError={passwordError}
    />
}