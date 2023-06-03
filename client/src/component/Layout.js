import React, { Fragment } from "react";
import { isAuth, signout } from "../auth/helpers";
import "../css/layout.css";
const Layout = ({ children, history }) => {

  const nav = () => (
    <ul className="navbar nav-tabs txt bg-white">
      <li className="nav-item">     
         <img
          src="images/logo.png"
          className="company-icon"
          alt="company icon"
        ></img>

      </li>

      {/* {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/private")} to="/private">
            {isAuth().name}
          </Link>
        </li>
      )} */}

      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "black" }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Logout
          </span>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
