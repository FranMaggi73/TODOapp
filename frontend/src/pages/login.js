import React, { useState } from "react";
import './login.css';
import SignUp from "./signup";
import SignIn from "./signin";

export default function Login(props) {
  const [signup, setSignup] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passConfError, setPassConfError] = useState('');

  const fetchUrl = () => signup ? '/signup' : 'signin';

  const sendData = async (e) => {
    e.preventDefault();
    const { token } = await fetch(fetchUrl(), {
      method: 'POST',
      body: new URLSearchParams(new FormData(e.target))
    })
    .then((res) => {
      return res.json()
    });

    props.login(token)
  }

  const switchLogin = () => setSignup(!signup)

  if (signup) {
    return <SignUp 
      login={props.login} 
      submit={sendData}
      switch={switchLogin}
      emailError={emailError}
      passwordError={passwordError}
      passConfError={passConfError}
    />
  }

  return <SignIn 
      login={props.login} 
      submit={sendData}
      switch={switchLogin}
      emailError={emailError}
      passwordError={passwordError}
    />
}