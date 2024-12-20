import classes from "./style.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login", // http://localhost:3001/api/v1/ base d'utilisation de l'api
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const token = response.data.body.token;
      if (token) {
        // Dispatch envoie le toke au store et joue LOGIN_SUCCESS
        dispatch({ type: "LOGIN_SUCCESS", payload: { token } });
  
        // Va a dashboard si token récupérer
        navigate('/dashboard');
      }
    } catch (err) {
      setError("Une erreur c'est produite.");
    }
  };

  return (
    <body>
      <main className={classes.bgDark}>
        <section className={classes.signInContent}>
          <i className={`fa fa-user-circle ${classes.signInIcon}`}></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className={classes.inputWrapper}>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.inputRemember}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className={classes.signInButton}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </body>
  );
}
