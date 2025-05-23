import React, { useState } from "react";
import Layout from '../Layout/layout';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // <-- redirect flag

  const handleSubmit = (e) => {
  e.preventDefault();
  const trimmedUsername = username.trim().toLowerCase();

  axios.post('http://localhost:7071/signup', {
    username: trimmedUsername,
    email,
    password
  })
  .then(res => {
    alert(res.data);
    navigate('/login');
  })
  .catch(err => {
    alert(err.response?.data || "Signup failed");
  });
};


  return (
    <>
      <Layout />
      <div className={styles.signupcontainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.signuplogin}>
            <p > Create an account</p>
            <label className={styles.signuplabel} htmlFor="username">User Name</label>
            <input className={styles.signupinput} type="text" name="username" onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"/><br />
            <label className={styles.signuplabel} htmlFor="email">Enter Email ID</label>
            <input className={styles.signupinput} type="email" name="email" onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"/><br />
            <label className={styles.signuplabel} htmlFor="password">Password</label>
            <input className={styles.signupinput} type="password" name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"/><br />
            <button className={styles.signupbutton}type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
