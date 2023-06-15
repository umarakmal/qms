import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, signout } from "./auth/helpers";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to="#" aria-expanded>
              <i className="fas fa-user " style={{ fontSize: '13px' }}>  {isAuth() ? isAuth().EmployeeName : null} </i>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{ minWidth: '180px' }}>

              {isAuth() && (
                <li className="nav-item" style={{ fontSize: '12px' }}>
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => {
                      signout(() => {
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </li>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
