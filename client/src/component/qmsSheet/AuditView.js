import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth } from '../auth/helpers'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const AuditView = () => {
  const [getAuditViewData, setAuditViewData] = useState("");
  const [dataSource, setDataSource] = useState("");
  const location = useLocation()

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (location.state != null) {
      toast.success("successfully Audited!");
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [location])

  useEffect(() => {
    const postdata1 = async () => {
      const auditorid = isAuth().EmployeeID
      const res = await fetch(`${url}/api/get-audit-view-data`, {
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
          setAuditViewData(data);
        }
      }
    };
    postdata1()
  }, []);

  const handleSkip = async (e, id) => {
    e.preventDefault()
    const { skip_reason } = dataSource
    if (!skip_reason) {
      alert("please select skip reason.")
      return false
    } else {
      const res2 = await fetch(`${url}/api/update-allocation-assignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id, skip_reason
        }),
      });

      const data1 = await res2.json();
      if (res2.status === 422 || !data1) {
        toast.error("error");
      } else {
        toast("Skipped")
      }

      //Get data api
      const postdata1 = async () => {
        const auditorid = isAuth().EmployeeID
        const res = await fetch(`${url}/api/get-audit-view-data`, {
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
            setAuditViewData(data);
          }
        }
      };
      postdata1()
    }
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }

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
                        Audit View
                      </h3>
                    </div>
                    <div className="card-body">
                      <div style={{ overflow: "auto" }}>
                        <table className="table table-sm mt-3">
                          <thead style={{ fontSize: '11px' }} className="">
                            <tr>
                              <th scope="col">Audit Form</th>
                              <th scope="col">Skip Audit</th>
                              <th scope="col">Auditor ID</th>
                              <th scope="col">Agent ID</th>
                              <th scope="col">Allocation Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getAuditViewData ? getAuditViewData.map((el) => {

                              const d = formatDate(new Date(el.createdAt))
                              return <tr>
                                <td className="d-flex " key={el._id + "tt"}>
                                  <NavLink to={`edit/audit?id=${el._id}&sheetid=${el.sheetid}&auditeeid=${el.agentid}&acht=${el.acht}&mobile=${el.mobileno}&call=${el.calltype}&callid=${el.callid}`}>
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

                                <td key={el._id + "tt894865"}>

                                  <div className='row'>
                                    <div className='col-md-3'>
                                      <select
                                        name="skip_reason"
                                        onChange={setdata}
                                        className="form-control form-control-sm "
                                        style={{ fontSize: "11.4px", width: "100%" }}
                                      >
                                        <option value="">--select--</option>
                                        <option>Non-Auditable</option>
                                        <option>Call Not Found</option>
                                        <option>Crossed 2 audits for week</option>
                                        <option>Crossed 3 audits for week</option>
                                        <option>UCID or Calling Issue</option>
                                      </select>
                                    </div>
                                    <div className='col'>
                                      <button
                                        key={el._id + "hi9870"}
                                        style={{ fontSize: "11px" }}
                                        onClick={(e) => handleSkip(e, el._id)}
                                        className="btn btn-sm btn-info "
                                      >
                                        Skip
                                      </button>
                                    </div>
                                  </div>

                                </td>
                                <td>{el.auditor_id}</td>
                                <td>{el.agentid}</td>
                                <td>{d}</td>
                              </tr>

                            }) : null
                            }

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

export default AuditView