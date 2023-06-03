import React, { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import { NavLink } from 'react-router-dom';
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAuth } from "../auth/helpers";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
// import { DataGrid,GridToolbar } from '@material-ui/data-grid';
const url = `${process.env.REACT_APP_BACKEND_URL}`
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const DynReport = () => {
  const [processName, setProcessName] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [process, setProcess] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sheetName, setSheetName] = useState("")
  const [prcss, setProcesses] = useState("")
  const [datas, setData] = useState([])
  const [show, setShow] = useState(false);

  //Validation
  useEffect(() => {
    (() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 120,
    },
    {
      field: "agentname",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Agent Name",
      width: 130,
      renderCell: (row) =>
        <td>
          <NavLink target='_blank' to={`/d-agent-sheetview?id=${row.row._id}&calltype=${row.row.calltype}&callid=${row.row.callid}&mobile=${row.row.mobile}&acht=${row.row.acht}&auditeeid=${row.row.auditeeid}&sheetid=${row.row.sheetid}&extrafield1=${row.row.extrafield1}&extrafield2=${row.row.extrafield2}`}>
            {row.row.agentname}
          </NavLink>
        </td>
    },
    {
      field: "obtainedMarks",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Obtained Marks",
      width: 150,
    },
    {
      field: "fatalcount",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Fatal Count",
      width: 150,
    },
    {
      field: "maximummarks",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Maximum Marks",
      width: 140,
    },
    {
      field: "feedback",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Feedback",
      width: 150,
    },
    {
      field: "finalScore",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Final Score",
      width: 140,
    },
    {
      field: "auditor_name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Auditor Name",
      width: 140,
    },

    {
      field: "rebuttalstatus",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Is Rebuttal?",
      width: 150,
    },
    {
      field: "calibrationstatus",
      headerName: "Is Calibrated?",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
  ];


  const handleChangeProcess = (e) => {
    e.preventDefault();
    const getdata = async () => {
      const process = e.target.value;
      var a = process.split('|')
      var cm_id = a[3]
      setProcess(e.target.value);
      const res = await fetch(`${url}/api/find-data-with-process-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cm_id,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setProcessName(data);
      }
    };
    getdata();
  };

  const handleSheetData = (e) => {
    e.preventDefault();
    const postdata = async () => {
      const getdynamiccollection = e.target.value;
      setSheetName(getdynamiccollection)
      const res = await fetch(`${url}/api/get-dynamic-collection-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          getdynamiccollection,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setSheetData(data);
        }
      }
    };
    postdata();

  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      return false
    } else {
      const date1 = startDate.toLocaleDateString();
      const date2 = endDate.toLocaleDateString();
      const employeeId = isAuth().EmployeeID
      const postdata1 = async () => {
        const sheet_name = sheetName
        const res = await fetch(`${url}/api/d-report-get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date1, date2, process, sheet_name, employeeId
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            setData(data);
          }
        }
      };
      postdata1();
      setShow(true);
    }
  }
  var rbtl = ""
  var cal = ""
  const rows = datas.map((element, index) => ({
    abc: (element.rebuttalJoin.length > 0) ? rbtl = "Yes" : rbtl = 'No',
    ccf: element.caliJoin.length > 0 ? cal = "Yes" : cal = "No",
    id: index + 1,
    _id: element._id,
    auditor_name: element.auditor_name,
    maximummarks: element.maximumMarks,
    obtainedMarks: element.obtainedMarks,
    finalScore: element.finalScore,
    fatalcount: element.fatalCount,
    agentname: element.auditee_name,
    feedback: element.auditor_remark,
    rebuttalstatus: rbtl,
    calibrationstatus: cal,
    calltype: element.calltype,
    extrafield1: element.extrafield1,
    extrafield2: element.extrafield2,
    callid: element.callid,
    mobile: element.msisdn,
    acht: element.acht,
    auditeeid: element.auditee_id,
    sheetid: element.sheet_name
  }));

  //For process
  useEffect(() => {
    const postdata1 = async () => {
      const employeeId = isAuth().EmployeeID
      const res = await fetch(`${url}/api/d-master-report-process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId
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
            setProcesses(data);
          }

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
            <form id="form1" noValidate
              className="needs-validation" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Report
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-md-3">
                          <label htmlFor="xyz">Process:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            id="Auditor"
                            name="process"
                            onChange={handleChangeProcess}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {

                              return <option value={element.Process} key={element.cm_id}>{element}</option>
                            }) : null : null}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                        <div className=" form-group col-md-3">
                          <label htmlFor="xyz">Sheet:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="collectionname"
                            onChange={handleSheetData}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {processName
                              ? processName.map((element) => {
                                var collection = element.collectionname.split('_')
                                var newSheetName = collection.slice(1);
                                return (
                                  <option key={element._id} value={element.collectionname}>
                                    {newSheetName.join('_')}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a sheet.
                          </div>
                        </div>
                        <div className="form-group col-md-2">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date1"
                            className="form-label"
                          >
                            From:
                          </label>
                          <DatePicker
                            selected={startDate}
                            selectsStart
                            className="form-control form-control-sm"
                            placeholderText="Select Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            id="date1"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div className="form-group col-md-2">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date2"
                            className="form-label"
                          >
                            To:
                          </label>
                          <DatePicker
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-sm"
                            selectsEnd
                            placeholderText="Select Date"
                            minDate={startDate}
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            id="date2"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <div className='mt-4 col-md-2'>
                          <button
                            type='submit'
                            style={{ fontSize: '11.7px' }}
                            className="btn btn-info btn-sm"
                          >GET DATA</button>
                        </div>
                      </div>
                      <div className="card mt-5">
                        {show ? (
                          <DataGrid
                            style={{ fontWeight: "400" }}
                            components={{
                              Toolbar: MyExportButton,
                            }}
                            density="compact"
                            autoHeight
                            getRowId={(element) => element._id}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                          />
                        ) : null}
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

export default DynReport