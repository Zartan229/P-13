import React from "react";
import { useSelector } from "react-redux";
import classes from "./style.module.css";
import logo from "../../img/argentBankLogo.png";

export default function Header() {
  const authenticated = useSelector((state) => state.authenticated); // Utilisateur de redux pour avoir accès aux donnée
  const user = useSelector((state) => state.user);

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
              <a className={classes.logoutButton} href="/index">
                <i class="fa fa-sign-out"></i>
                Logout
              </a>
            </div>
          ) : (
            <a className={classes.mainNavItem} href="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
