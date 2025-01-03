import React from "react";
import classes from "./style.module.css";
import logo from "../../img/argentBankLogo.png";
import out from "../../img/out.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux";



export default function Header() {
  const authenticated = useSelector((state) => state.authenticated); // Utilisateur de redux pour avoir accès aux donnée
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()); // Vide Redux store
    window.location.href = "/index"; //va a index après avoir vider store
  };

  return (
    <header>
      <nav className={classes.mainNav}>
        <a className={classes.mainNavLogo} href="/index">
          <img
            className={classes.mainNavLogoImage}
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className={classes.srOnly}>Argent Bank</h1>
        </a>
        <div>
          {authenticated ? (
            <div className={classes.profile}>
              <span className={classes.profileName}>
                <i className="fa fa-user-circle"></i>
                {user?.lastName || "User"}
              </span>
              <a className={classes.logoutButton} href="/index" onClick={handleLogout}>
                <img className={classes.imhIcon} src={out} alt="Icone de sortie"/>
                Logout
              </a>
            </div>
          ) : (
            <a className={classes.mainNavItem} href="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
