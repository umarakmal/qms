import React, { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { isAuth } from '../auth/helpers'
import { DataGrid } from "@mui/x-data-grid";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const AuditView = () => {
  const [getAuditViewData, setAuditViewData] = useState([]);
  const [dataSource, setDataSource] = useState("");
  const [show, setShow] = useState(false);
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

  const columns = [
    {
      field: "auditform",
      headerName: "Audit Form",
      headerClassName: " small",
      cellClassName: "small font-weight-bold ",
      width: 150,
      renderCell: (row) =>
        <td className="d-flex " key={row.row._id + "tt"}>
          <NavLink to={`edit/evaluation-rdmz?id=${row.row._id}&sheetid=${row.row.sheetid}&auditeeid=${row.row.agentid}&acht=${row.row.acht}&mobile=${row.row.mobileno}&call=${row.row.calltype}&callid=${row.row.callid}`}>
            {" "}

            <button
              key={row.row._id + "97700"}
              style={{ fontSize: "11px" }}
              className="btn btn-sm btn-info"
            >
              <i className="nav-icon fas fa-edit" />
            </button>
          </NavLink>
        </td>
    },
    {
      field: "skipaudit",
      headerName: "Skip Audit",
      headerClassName: " small ",
      cellClassName: "small font-weight-bold",
      width: 200,
      renderCell: (row) =>
        <td key={row.row._id + "tt894865"}>
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
        </td>
    },
    {
      field: "f",
      headerName: "",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 130,
      renderCell: (row) =>
        <td key={row.row._id + "tt894865"}>
          <div >
            <button
              key={row.row._id + "hi9870"}
              style={{ fontSize: "11px" }}
              onClick={(e) => handleSkip(e, row.row._id)}
              className="btn btn-sm btn-info "
            >
              Skip
            </button>
          </div>
        </td>
    },
    {
      field: "auditorid",
      headerName: "Auditor ID",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "agentid",
      headerName: "AgentID",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "allocationdate",
      headerName: "Allocation Date",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
  ];

  var d = [];
  const rows = getAuditViewData.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    auditorid: element.auditor_id,
    agentid: element.agentid,
    dateeee: (d = formatDate(new Date(element.createdAt))),
    allocationdate: d,
    sheetid: element.sheetid,
    acht: element.acht,
    mobileno: element.mobileno,
    callid: element.callid,
    calltype: element.calltype
  }));

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
          if (data.length > 0) {
            setAuditViewData(data);
            setShow(true)
          }
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
        setDataSource([])
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
            if (data.length > 0) {
              setAuditViewData(data);
              setShow(true)
            }
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
                      {show ?
                        <div style={{ height: "100%" }}>
                          <DataGrid
                            style={{ fontWeight: "400" }}
                            density="compact"
                            autoHeight
                            getRowId={(element) => element._id}
                            rows={rows}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 10,
                                },
                              },
                            }}
                          />
                        </div>
                        : <center><div className='text-gray-dark'><b>No Data</b></div></center>}
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