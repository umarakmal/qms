import React, { useEffect } from "react";
import logo from "../images/logo3.png";
import { Link, useLocation } from "react-router-dom";
import $ from "jquery";
const Menu = () => {
  const location = useLocation();
  // useEffect(() => {
  //   const trees = window.$('[data-widget="treeview"]');
  //   trees.Treeview("init");
  // }, []);

  return (
    <div>
      <aside
        style={{ fontSize: "12px" }}
        className="main-sidebar sidebar-dark-primary elevation-4"
      >
        <a href="#" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: ".9", maxHeight: "43px" }}
          />
          <span className="brand-text font-weight-light invisible">Cogent</span>
        </a>
        <div className="sidebar">
          <nav className="mt-5">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item  mb-2 ">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <i
                    className="nav-icon fas fa-user"
                    style={{ color: "white", fontSize: "12px" }}
                  />
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/sheetlist"
                  className={`nav-link ${
                    location.pathname === "/sheetlist" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file "
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Sheet List
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/createqmssheet"
                  className={`nav-link ${
                    location.pathname === "/createqmssheet" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file "
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    New Sheet
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/manage-attributes"
                  className={`nav-link ${
                    location.pathname === "/manage-attributes" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Manage Attributes
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/manage-listitems"
                  className={`nav-link ${
                    location.pathname === "/manage-listitems" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Manage List Items
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/update-sheet"
                  className={`nav-link ${
                    location.pathname === "/update-sheet" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Update Existing Sheet
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/manage-sheet"
                  className={`nav-link ${
                    location.pathname === "/manage-sheet" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Manage Sheet
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/import-list-data"
                  className={`nav-link ${
                    location.pathname === "/import-list-data" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Import List Data
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/sheet-status"
                  className={`nav-link ${
                    location.pathname === "/sheet-status" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Sheet Status
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/dashboard"
                  className={`nav-link ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/mis-report"
                  className={`nav-link ${
                    location.pathname === "/mis-report" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    MIS Report
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="#" className="nav-link ">
                  <i
                    // <i class="fa-solid fa-square-poll-vertical"></i>
                    className="nav-icon fas fa-poll"
                    style={{ color: "white", fontSize: "12px" }}
                  />
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    New
                    <i
                      className="right fas fa-angle-left"
                      style={{ color: "white", fontSize: "12px" }}
                    />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/sample-upload" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Sample Upload
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/ryg-assignment" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        RYG Assignment
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/sample-allocation" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Sample Allocation
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/re-allocation" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Re-Allocation
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/calibration" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Calibration
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/super-audit" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Super Audit
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/calibration-view" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Calibration View
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/audit-view" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Audit View
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/rebuttal-view" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Rebuttal View
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/super-audit-view" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Super Audit View
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/agent-feedback" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Agent Feedback
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item mb-2">
                <Link to="#" className="nav-link ">
                  <i
                    // <i class="fa-solid fa-square-poll-vertical"></i>
                    className="nav-icon fas fa-poll"
                    style={{ color: "white", fontSize: "12px" }}
                  />
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                    Dynamic Report
                    <i
                      className="right fas fa-angle-left"
                      style={{ color: "white", fontSize: "12px" }}
                    />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/master-report" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Master Report
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/d-create-sheet" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        Create Sheet
                      </p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/d-mis-report" className="nav-link ">
                      <i
                        className="far fa-circle nav-icon"
                        style={{ color: "white", fontSize: "7px" }}
                      />
                      <p style={{ color: "white", fontSize: "10.4px" }}>
                        MIS Report
                      </p>
                    </Link>
                  </li>
                </ul>
                <li className="nav-item mb-2">
                <Link
                  to="/get-report"
                  className={`nav-link ${
                    location.pathname === "/get-report" ? "active" : ""
                  }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" }}
                    className="nav-icon fas fa-file"
                  ></i>
                  <p style={{ color: "white", fontSize: "12.4px" }}>
                   Report
                  </p>
                </Link>
              </li>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div id="overlay-scrollbar"></div>
    </div>
  );
};

export default Menu;
