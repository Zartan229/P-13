import classes from "./style.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../Utility";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginReact = async (e) => {
    e.preventDefault(); 

    dispatch(handleLogin({email, password}))
    setTimeout(() => {
      navigate('/profile');
    }, 750)
  };

  return (
      <main className={classes.bgDark}>
        <section className={classes.signInContent}>
          <i className={`fa fa-user-circle ${classes.signInIcon}`}></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLoginReact}>
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
            <button type="submit" className={classes.signInButton}>
              Sign In
            </button>
          </form>
        </section>
      </main>
  );
}
