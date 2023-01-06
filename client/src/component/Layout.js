import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import "../css/layout.css";
const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };

  const nav = () => (
    <ul className="navbar nav-tabs txt bg-white">
      <li className="nav-item">
        {/* <Link to="/" className="nav-link" style={isActive('/')}> */}
        <img
          src="images/logo.png"
          className="company-icon"
          alt="company icon"
        ></img>
        {/* </Link> */}
      </li>

      {!isAuth() && (
        <Fragment>
          {/* <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Signin
                        </Link>
                    </li> */}
          <li className="nav-item">
            {/* <Link
              to="/signup"
              className="nav-link"
              style={isActive("/signup")}
            ></Link> */}
          </li>
        </Fragment>
      )}

      {/* {isAuth() && isAuth().role === '626cc4e94a5b3bd069355dd7' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/admin')} to="#">
                       <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>{isAuth().name}</div> 
                       <div> <img src="images/dp.png" className="dp-icon" alt="dp icon"></img></div>
                    </Link>
                </li>
            )} */}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/private")} to="/private">
            {isAuth().name}
          </Link>
        </li>
      )}

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

export default withRouter(Layout);
