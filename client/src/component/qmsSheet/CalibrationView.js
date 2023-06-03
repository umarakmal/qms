import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { NavLink, useLocation } from 'react-router-dom'
import Menu from '../Menu'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth } from '../auth/helpers'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const CalibrationView = () => {
  const [getCalibrationViewData, setCalibrationViewData] = useState("");
  const location = useLocation()

  useEffect(() => {
    if (location.state != null) {
      toast.success("successfully Calibrated!");
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [])

  useEffect(() => {
    const postdata1 = async () => {
      const auditorid = isAuth().EmployeeID
      const res = await fetch(`${url}/api/get-calibration-view-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditorid
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setCalibrationViewData(data);
        }
      }
    };
    postdata1()

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
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Calibration View
                      </h3>
                    </div>
                    <div className="card-body">
                      <div style={{ overflow: "auto" }}>
                        <table className="table table-sm mt-3">
                          <thead style={{ fontSize: '11px' }} className="">
                            <tr>
                              <th scope="col">Audit Form</th>
                              <th scope="col">Auditor ID</th>
                              <th scope="col">Agent ID</th>
                              <th scope="col">Call Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getCalibrationViewData ? getCalibrationViewData.map((el) => {
                              return <tr>
                                <td className="d-flex " key={el._id + "tt"}>
                                  <NavLink to={`edit?id=${el._id}&sheetid=${el.sheetid}&auditeeid=${el.auditeeid}&acht=${el.acht}&mobile=${el.mobileno}&call=${el.calltype}&callid=${el.callid}`}>
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
            <div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default CalibrationView