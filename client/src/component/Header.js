import React from "react";

const Header = () => {
  return (
    <div style={{ fontSize: "13px" }}>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto"></ul>
      </nav>
    </div>
  );
};

export default Header;
