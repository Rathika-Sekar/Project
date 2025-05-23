import React, { useState } from "react";
import Layout from '../Layout/layout';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  const trimmedUsername = username.trim().toLowerCase(); // 
  axios.post('http://localhost:7071/login', {
    username: trimmedUsername,
    password
  },{ withCredentials: true })
  .then(res => {
    alert(res.data);
    navigate('/todo');
  })
  .catch(err => {
    alert(err.response?.data || "Login failed");
  });
  };
  return (
    <>
      <Layout />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login}>
            <h3 className={styles.login.h3}>Welcome</h3>
            <label className={styles.loginlabel}htmlFor="username">User Name</label>
            <input className={styles.logininput}
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            /><br />

            <label className={styles.loginlabel} htmlFor="password">Password</label>
            <input className={styles.logininput}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            /><br />
            <label className={styles.loginlabel}>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </label><br />

            <button className={styles.loginbutton} type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
