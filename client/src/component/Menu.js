import React from "react";
import logo from "../images/banner-logo.png";
import { Link, useLocation } from "react-router-dom";
import { isAuth } from "./auth/helpers";
import Dropdown from 'react-bootstrap/Dropdown';
import '../css/Responsive.css'
const Menu = () => {

  const location = useLocation();
  let qhd2 = "No"
  let usertype="Null"
  let qh = "Null"
  let EmployeeID="null"
  let desid = "null"
if(isAuth()){
   usertype = isAuth().usertype
   qh = isAuth().qh
   EmployeeID = isAuth().EmployeeID
   desid = isAuth().des_id
}
  if (EmployeeID === qh) {
    qhd2 = "Yes"
  }
  
  return (
    <>
      <aside
        style={{ fontSize: "12px" }}
        className="main-sidebar sidebar-dark-primary elevation-4"
      >
        <Link to="#" className="brand-link">
          <img
            src={logo}
            alt="Logo"
            className="brand-image"
            style={{ opacity: "5", maxHeight: "43px" }}
          />
          <span style={{ color: '#17a2b8' }} className="brand-text font-weight-bold">COGENT</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-4">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item  mb-2 ">
                <Link
                  to="/app"
                  className={`nav-link ${location.pathname === "/app" ? "active" : ""
                    }`}
                >
                  <i
                    className="nav-icon fas fa-tachometer-alt"
                    style={{ color: "white", fontSize: "12px" ,
                    marginRight: "20px",}}
                  />
                  <p style={{ color: "white", fontSize: "12px" }}>
                    Welcome
                  </p>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/sheetlist"
                  className={`nav-link ${(location.pathname === "/sheetlist" || location.pathname === "/evaluation") ? "active" : ""
                    }`}
                >
                  <i
                    style={{ color: "white", fontSize: "12px" ,
                    marginRight: "20px",}}
                    className="nav-icon fas fa-list "
                  ></i>
                  <p style={{ color: "white", fontSize: "12px" }}>
                    Audit Sheet List
                  </p>
                </Link>
              </li>
          
              {usertype !== "DEMO" && qhd2 !== 'No' ?
                <>
                  <li className="nav-item mb-2">
                    <Link
                      to="/createqmssheet"
                      className={`nav-link ${location.pathname === "/createqmssheet" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-edit "
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        New Sheet
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/manage-attributes"
                      className={`nav-link ${location.pathname === "/manage-attributes" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px",
                        marginRight: "20px", }}
                        className="nav-icon fas fa-pen"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Manage Attributes
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/manage-listitems"
                      className={`nav-link ${location.pathname === "/manage-listitems" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-pen"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Manage List Items
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/update-sheet"
                      className={`nav-link ${location.pathname === "/update-sheet" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-edit"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Update Existing Sheet
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/manage-sheet"
                      className={`nav-link ${location.pathname === "/manage-sheet" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px",
                        marginRight: "20px", }}
                        className="nav-icon fas fa-file"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Manage Sheet
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/import-list-data"
                      className={`nav-link ${location.pathname === "/import-list-data" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px",
                        marginRight: "20px", }}
                        className="nav-icon fas fa-file-import"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Import List Data
                      </p>
                    </Link>
                  </li>
                </>
                : null}

              {usertype !== "DEMO" && qh !== 'No' && (EmployeeID === 'CE10091236' || EmployeeID === 'CE03070003' || EmployeeID === 'CE07147134' || EmployeeID === 'CE01145570' || EmployeeID === 'CE01080195' || EmployeeID === 'CE02145717') ?
                <>
                  <li className="nav-item mb-2">
                    <Link
                      to="/sheet-status"
                      className={`nav-link ${location.pathname === "/sheet-status" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-bars"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Sheet Status
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link
                      to="/dashboard"
                      className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-user"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Dashboard
                      </p>
                    </Link>
                  </li>
                </>
                : null}



<Dropdown style={{marginLeft:'2px'}} className={`mb-2 nav-item ${location.pathname.includes("/random/") ? "active" : ""}`} >
        <Dropdown.Toggle style={{ color: "white", fontSize: "14px" }} id="dropdown-button-dark-example1" to="#"  variant="dark">
        <i className="nav-icon fas fa-poll" style={{ color: "white", fontSize: "11px" , marginRight: "20px",}}/> <b style={{ color: "white", fontSize: "12px" }}>Randomizer</b> </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" style={{background:'#212529',margin:'0'}}>
        {usertype !== "DEMO" && qhd2 !== 'No' ?
  <>
    <ul className="nav abc mb-1" >
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/sample-upload" className={`nav-link ${location.pathname === "/random/sample-upload" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/sample-upload" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/sample-upload" ? 'black' : 'white'} ` }}>
            Sample Upload
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/ryg-assignment" className={`nav-link ${location.pathname === "/random/ryg-assignment" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/ryg-assignment" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/ryg-assignment" ? 'black' : 'white'} ` }}>
            RYG Assignment
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/sample-allocation" className={`nav-link ${location.pathname === "/random/sample-allocation" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/sample-allocation" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/sample-allocation" ? 'black' : 'white'} ` }}>
            Sample Allocation
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/re-allocation" className={`nav-link ${location.pathname === "/random/re-allocation" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/re-allocation" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/re-allocation" ? 'black' : 'white'} ` }}>
            Re-Allocation
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/calibration" className={`nav-link ${location.pathname === "/random/calibration" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/calibration" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/calibration" ? 'black' : 'white'} ` }}>
            Calibration
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/random/super-audit" className={`nav-link ${location.pathname === "/random/super-audit" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/super-audit" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/super-audit" ? 'black' : 'white'} ` }}>
            Super Audit
          </p>
        </Link>
      </li>
    </ul>
    <ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/skipped-allocation" className={`nav-link ${location.pathname === "/random/skipped-allocation" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/skipped-allocation" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/skipped-allocation" ? 'black' : 'white'} ` }}>
       Skipped Allocation
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/superaudited-data" className={`nav-link ${location.pathname === "/random/superaudited-data" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/superaudited-data" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/superaudited-data" ? 'black' : 'white'} ` }}>
       Super Audited data
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/calibrated-data" className={`nav-link ${location.pathname === "/random/calibrated-data" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/calibrated-data" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/calibrated-data" ? 'black' : 'white'} ` }}>
       Calibrated data
      </p>
    </Link>
  </li>
</ul>
  </>
  : null}

<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/calibration-view" className={`nav-link ${location.pathname === "/random/calibration-view" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/calibration-view" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/calibration-view" ? 'black' : 'white'} ` }}>
        Calibration View
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/audit-view" className={`nav-link ${location.pathname === "/random/audit-view" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/audit-view" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/audit-view" ? 'black' : 'white'} ` }}>
        Audit View
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/rebuttal-view" className={`nav-link ${location.pathname === "/random/rebuttal-view" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/rebuttal-view" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/rebuttal-view" ? 'black' : 'white'} ` }}>
        Rebuttal View
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/random/super-audit-view" className={`nav-link ${location.pathname === "/random/super-audit-view" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/random/super-audit-view" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/super-audit-view" ? 'black' : 'white'} ` }}>
        Super Audit View
      </p>
    </Link>
  </li> 
</ul>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown style={{marginLeft:'2px'}} className={`mb-3 nav-item ${location.pathname.includes("/d/") ? "active" : ""}`} >
        <Dropdown.Toggle style={{ color: "white", fontSize: "14px" }} id="dropdown-button-dark-example1" to="#"  variant="dark">
        <i className="nav-icon fas fa-poll" style={{ color: "white", fontSize: "11px" , marginRight: "20px",}}/> <b style={{ color: "white", fontSize: "12px" }}>Settings </b></Dropdown.Toggle> 
        <Dropdown.Menu variant="dark" style={{background:'#212529',margin:'0'}}>
        {usertype !== "DEMO" && (EmployeeID === 'CE10091236' || EmployeeID === 'CE03070003' || EmployeeID === 'CE01145570') ?
  <>
    <ul className=" nav abc mb-1">
      <li className="nav-item " style={{fontSize:'11px'}}>
        <Link to="/d/d-master" className={`nav-link ${location.pathname === "/d/d-master" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/d/d-master" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/d/d-master" ? 'black' : 'white'} ` }}>
            Manage Rights
          </p>
        </Link>
      </li>
    </ul>
    <ul className=" nav abc mb-1">
      <li className="nav-item" style={{fontSize:'11px'}}>
        <Link to="/d/master-report" className={`nav-link ${location.pathname === "/d/master-report" ? "active" : ""
          }`}>
          <i
            className="far fa-circle nav-icon"
            style={{ fontSize: "7.3px", color: `${location.pathname === "/d/master-report" ? 'black' : 'white'} ` }}
          />
          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/d/master-report" ? 'black' : 'white'} ` }}>
            Rights View
          </p>
        </Link>
      </li>
    </ul>
  </>
  : null}
  
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/d/d-create-sheet" className={`nav-link ${location.pathname === "/d/d-create-sheet" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/d/d-create-sheet" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/d/d-create-sheet" ? 'black' : 'white'} ` }}>
        Create Audit Sheet
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/d/d-mis-report" className={`nav-link ${location.pathname === "/d/d-mis-report" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/d/d-mis-report" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/d/d-mis-report" ? 'black' : 'white'} ` }}>
        MIS Report
      </p>
    </Link>
  </li>
</ul>
<ul className="nav abc mb-1">
  <li className="nav-item" style={{fontSize:'11px'}}>
    <Link to="/d/d-get-report" className={`nav-link ${location.pathname === "/d/d-get-report" ? "active" : ""
      }`}>
      <i
        className="far fa-circle nav-icon"
        style={{ fontSize: "7.3px", color: `${location.pathname === "/d/d-get-report" ? 'black' : 'white'} ` }}
      />
      <p style={{ fontSize: "10.5px", color: `${location.pathname === "/d/d-get-report" ? 'black' : 'white'} ` }}>
        Report
      </p>
    </Link>
  </li>
</ul>
        </Dropdown.Menu>
      </Dropdown>

       {usertype !== "DEMO" && qh !== 'No' && (EmployeeID === 'CE10091236' || EmployeeID === 'CE03070003' || EmployeeID === 'CE07147134' || EmployeeID === 'CE01145570' || EmployeeID === 'CE01080195' || EmployeeID === 'CE02145717') ?
                <li className="nav-item mb-2">
                 <Link
                      to="/mis-report"
                      className={`nav-link ${location.pathname === "/mis-report" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-file-alt"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        MIS Report
                      </p>
                    </Link>
                </li>
                : null}

      {usertype !== "DEMO" && (EmployeeID === 'CE12102224' || EmployeeID === 'CE0321936544') ?
                <li className="nav-item mb-2">
                  <Link
                    to="/mis-report"
                    className={`nav-link ${location.pathname === "/mis-report" ? "active" : ""
                      }`}
                  >
                    <i
                      style={{ color: "white", fontSize: "12px" ,
                      marginRight: "20px",}}
                      className="nav-icon fas fa-file-alt"
                    ></i>
                    <p style={{ color: "white", fontSize: "12px" }}>
                      MIS Report
                    </p>
                  </Link>
                </li>
                : null}

                {usertype !== "DEMO" ?
                  <li className="nav-item mb-2">
                    <Link
                      to="/get-report"
                      className={`nav-link ${location.pathname === "/get-report" ? "active" : ""
                        }`}
                    >
                      <i
                        style={{ color: "white", fontSize: "12px" ,
                        marginRight: "20px",}}
                        className="nav-icon fas fa-file"
                      ></i>
                      <p style={{ color: "white", fontSize: "12px" }}>
                        Report
                      </p>
                    </Link>
                  </li>
                  : null}

                <li className="nav-item mb-2">
                  <Link to="/agent-feedback" className={`nav-link ${location.pathname === "/agent-feedback" ? "active" : ""
                    }`}>
                    <i
                      className="nav-icon far  fa-envelope"
                      style={{ color: "white", fontSize: "12px" ,
                      marginRight: "20px",}}
                    />
                    <p style={{ color: "white", fontSize: "12px" }}>
                      Agent Feedback
                    </p>
                  </Link>
                </li>

                {/* <li className="nav-item mb-2 ">
                  <Link
                    to="/feedback"
                    className={`nav-link ${location.pathname === "/feedback" ? "active" : ""
                      }`}
                  >
                    <i
                      style={{ color: "white", fontSize: "12px" }}
                      className="nav-icon fas fa-envelope"
                    ></i>
                    <p style={{ color: "white", fontSize: "12.4px" }}>
                      Feedback
                    </p>
                  </Link>
                </li> */}



                {EmployeeID === "BP-PUNEET" ?
                  <>
                    <ul className="nav nav-treeview mt-2">
                      <li className="nav-item">
                        <Link to="/random/calibration-view" className={`nav-link ${location.pathname === "/random/calibration-view" ? "active" : ""
                          }`}>
                          <i
                            className="far fa-circle nav-icon"
                            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/calibration-view" ? 'black' : 'white'} ` }}
                          />
                          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/calibration-view" ? 'black' : 'white'} ` }}>
                            Calibration View
                          </p>
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav nav-treeview mt-2">
                      <li className="nav-item">
                        <Link to="/random/audit-view" className={`nav-link ${location.pathname === "/random/audit-view" ? "active" : ""
                          }`}>
                          <i
                            className="far fa-circle nav-icon"
                            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/audit-view" ? 'black' : 'white'} ` }}
                          />
                          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/audit-view" ? 'black' : 'white'} ` }}>
                            Audit View
                          </p>
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav nav-treeview mt-2">
                      <li className="nav-item">
                        <Link to="/random/rebuttal-view" className={`nav-link ${location.pathname === "/random/rebuttal-view" ? "active" : ""
                          }`}>
                          <i
                            className="far fa-circle nav-icon"
                            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/rebuttal-view" ? 'black' : 'white'} ` }}
                          />
                          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/rebuttal-view" ? 'black' : 'white'} ` }}>
                            Rebuttal View
                          </p>
                        </Link>
                      </li>
                    </ul>
                    <ul className="nav nav-treeview mt-2">
                      <li className="nav-item">
                        <Link to="/random/super-audit-view" className={`nav-link ${location.pathname === "/random/super-audit-view" ? "active" : ""
                          }`}>
                          <i
                            className="far fa-circle nav-icon"
                            style={{ fontSize: "7.3px", color: `${location.pathname === "/random/super-audit-view" ? 'black' : 'white'} ` }}
                          />
                          <p style={{ fontSize: "10.5px", color: `${location.pathname === "/random/super-audit-view" ? 'black' : 'white'} ` }}>
                            Super Audit View
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </>
                  : null}
            </ul>
          </nav>
        </div>
      </aside>

    </>
  );
};

export default Menu;
