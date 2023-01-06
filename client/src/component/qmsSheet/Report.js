import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
    const [dataSource, setDataSource] = useState("");
    const [processName, setProcessName] = useState("");
    const [sheetData, setSheetData] = useState("");
    const [process, setProcess] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sheetName,setSheetName] = useState("")
    const [datas,setData] = useState([])
    const [show, setShow] = useState(false);

    //Validation
    useEffect(() => {
      (() => {
        "use strict";
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
    });

    const columns = [
      {
        field: "id",
        headerName: "S.No.",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        width: 120,
      },
      {
        field: "agentname",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Agent Name",
        width: 130,
      },
      {
        field: "obtainedMarks",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Obtained Marks",
        width: 150,
      },
      {
        field: "fatalcount",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Fatal Count",
        width: 150,
      },
      {
        field: "maximummarks",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Maximum Marks",
        width: 140,
      },
      {
        field: "feedback",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Feedback",
        width: 150,
      },
      {
        field: "finalScore",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Final Score",
        width: 140,
      },
      {
        field: "auditor_name",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Auditor Name",
        width: 140,
      },
     
      {
        field: "rebuttalstatus",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        headerName: "Is Rebuttal?",
        width: 150,
      },
      {
        field: "calibrationstatus",
        headerName: "Is Calibrated?",
        headerClassName: "bg-dark h6 small",
        cellClassName: "small font-weight-bold",
        width: 150,
      },
    ];


    const setdata = (e) => {
        const { name, value } = e.target;
        setDataSource((dataSource) => {
          return {
            ...dataSource,
            [name]: value,
          };
        });
      };

   
    const handleChangeProcess = (e) => {
        e.preventDefault();
        const getdata = async () => {
          const process = e.target.value;
          setProcess(e.target.value);
          const res = await fetch("/api/find-data-with-process-name", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              process,
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
          const res = await fetch("/api/get-dynamic-collection-data", {
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
    
      const handleSubmit = async(e) => {
        e.preventDefault()
        if(!startDate || !endDate){
          return false
        }else{
    const date1 = startDate.toLocaleDateString();
    const date2 = endDate.toLocaleDateString();
  
        const postdata1 = async () => {
      const sheetid = sheetName
          const res = await fetch("/api/get-report", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date1,date2,process,sheetid
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
      const rows = datas.map((element, index) => ({
        id: index + 1,
        _id: element._id,
        auditor_name: element.auditor_name,
        maximummarks: element.maximumMarks,
        obtainedMarks: element.obtainedMarks,
        finalScore: element.finalScore,
        fatalcount: element.fatalCount,
        agentname: element.auditee_id,
        feedback: element.feedback,
        rebuttalstatus: "Yes",
        calibrationstatus: "No",
      }));
 
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
                        Calibration
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-sm-2">
                          <label htmlFor="xyz">Process</label>
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
                            <option>
                              Information Technology|Software
                              Development|Software Development
                            </option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                        <div className=" form-group col-sm-2">
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
                                return (
                                  <option key={element._id}>
                                    {element.collectionname}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a sheet.
                          </div>
                        </div>
                        <div className="form-group ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date1"
                            className="form-label text-muted"
                          >
                            From
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
                        <div className="form-group ml-2">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date2"
                            className="form-label text-muted"
                          >
                            To
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
                        <div className='mt-4 ml-2'>
                        <button
                        type='submit'
                        style={{fontSize:'11.7px'}}
                        className="btn btn-primary btn-sm"
                        >GET DATA</button>
                        </div>
                        </div>
                        <div style={{ margin: "15px" }} className="card">
                        {show ? (
                          <DataGrid
                            style={{ fontWeight: "400" }}
                            components={{
                              Toolbar: MyExportButton,
                            }}
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

export default Report