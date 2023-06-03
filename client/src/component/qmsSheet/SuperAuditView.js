import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { isAuth } from '../auth/helpers'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const SuperAuditView = () => {
  const [getuserdata, setUserdata] = useState([])
  const location = useLocation()
  useEffect(() => {
    if (location.state != null) {
      toast.success("successfully Saved!");
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [location])
  useEffect(() => {
    const auditor_id = isAuth().EmployeeID
    const getdata = async () => {
      const res = await fetch(`${url}/api/get-super-assignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({
          auditor_id,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setUserdata(data);
        }
      }
    };
    getdata();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="form1">
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "0.9rem" }} className="card-title">
                        Super Audit View
                      </h3>
                    </div>
                    <div className="card-body">
                      <div style={{ overflow: "auto" }}>
                        <table className="table table-sm mt-3">
                          <thead style={{ fontSize: '11px' }} className="">
                            <tr>
                              <th scope="col">Skip Audit</th>
                              <th scope="col">Auditor ID</th>
                              <th scope="col">Agent ID</th>
                              <th scope="col">Calltype</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getuserdata ? getuserdata.map((el) => {
                              return <tr key={el._id + "tt"}>
                                <td className="d-flex " >
                                  <NavLink to={`super-assignment-audit?id=${el._id}&sheetid=${el.sheetid}&auditeeid=${el.auditeeid}&mobile=${el.mobileno}&callid=${el.callid}&acht=${el.acht}&calltype=${el.calltype}&supraudit=1`}>
                                    {" "}
                                    <button
                                      key={el._id + "97700"}
                                      style={{ fontSize: "11px" }}
                                      className="btn btn-sm btn-info"
                                    >
                                      <i className="nav-icon fas fa-edit" />
                                    </button>
                                  </NavLink>
                                </td>
                                <td>{el.auditor_id}</td>
                                <td>{el.auditeeid}</td>
                                <td>{el.calltype}</td>
                              </tr>
                            }) : null}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default SuperAuditView