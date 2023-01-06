import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Calibration = () => {
    const [dataSource, setDataSource] = useState("");
    const [processName, setProcessName] = useState("");
    const [sheetData, setSheetData] = useState("");
    const [process, setProcess] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [getCalibration, setGetCalibration] = useState("")
    const [sheetName, setSheetName]= useState("")
    const [qaTlTrainerGet, setQaTlTrainer]= useState("")
    const [calibrationAssignId, setCalibrationAssignId]= useState("")
    const [multipleSelect, setMultipleSelect] = useState("")
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

    const setdata = (e) => {
        const { name, value } = e.target;
        setDataSource((dataSource) => {
          return {
            ...dataSource,
            [name]: value,
          };
        });
      };

    const handleMultipleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, option => option.value);
        setMultipleSelect( {value});
      }

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

      const handleQaTlTrainer = async () => {
        const res = await fetch("/api/get-qa-tl-trainer", {
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
          setQaTlTrainer(data);
        }
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
        if(!startDate || !endDate || !process || !sheetName ){
          return false
        }else{
        const date1 = startDate.toLocaleDateString();
        const date2 = endDate.toLocaleDateString();
            const postdata1 = async () => {
          const sheet_name = sheetName
              const res = await fetch("/api/get-calibration-data", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  date1,date2,process,sheet_name
                }),
              });
              const data = await res.json();
              if (res.status === 422 || !data) {
                console.log("error ");
              } else {
                if (!data) {
                  console.log("No Data!");
                } else {
                  setGetCalibration(data);
                }
              }
            };
            postdata1()
          }
      }

const handleCalibrate = async(id)=>{
    setCalibrationAssignId(id);
    $("#qatlget").attr('disabled', false)
    handleQaTlTrainer() }

   
const handleSubmitAssign = async(e) => {
e.preventDefault()

const sheetlistJoin = multipleSelect.value

const id = calibrationAssignId
const calibration_status = "1"
if(!id){
  return false
}else{
      const postdata2 = async () => {
    
          const res = await fetch("/api/calibration-status-update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             calibration_status,id
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
              console.log("No Data!");
            } else {
              toast.success("Successful!")
            }
          }
        };
      
        postdata2()
        setTimeout(()=>{
          handleSubmit(e)
        },1000)
  
        const postdata3 = async () => {
          const res = await fetch("/api/calibration-assignment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error ");
          } else {
            if (!data) {
              console.log("No Data!");
            } else {
              console.log("success");
            }
          }
        };
        postdata3()
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
                            id="select1"
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
                        style={{fontSize:'11.6px'}}
                        className="btn btn-primary btn-sm"
                        >GET DATA</button>
                        </div>
                        <p style={{marginTop:'2rem'}} className=' ml-2 font-weight-bold'>No. Of Records: {getCalibration?getCalibration.length:"0"}</p >
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form id="form1">
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card">
                  
                    <div className="card-body">
                      <div className="row">
                        <div className=" form-group">
                          <label htmlFor="xyz">Auditor Name</label>
                          <span style={{ color: "red" }}>*</span>
                          </div>
                          <div className='col-sm-3'>
                          <select
                            id="qatlget"
                            name="au_name"
                            onChange={handleMultipleSelect}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            multiple
                            required
                            disabled
                          >
                            <option value="">--Select--</option>
                            { qaTlTrainerGet ? qaTlTrainerGet.map((elements)=>{
                          return  <option key={elements._id}>{elements.qa}</option>
                           }):''
                           }
                          </select>
                        </div>
                        <div className='mt-4 ml-2'>
                        <button
                        type='submit'
                        onClick={handleSubmitAssign}
                        style={{fontSize:'11.6px'}}
                        className="btn btn-primary btn-sm"
                        >Assign</button>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </form>
          
            <div>
  <table className="table table-sm mt-3">
    <thead style={{fontSize:'11px'}} className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Action</th>
        <th scope="col">MSISDN</th>
        <th scope="col">Call ID</th>
        <th scope="col">Call Type</th>
        <th scope="col">Audit Date</th>
        <th scope="col">Max. marks</th>
        <th scope="col">Obt. marks</th>
        <th scope="col">Final Score</th>
        <th scope="col">Fetal Count</th>
        <th scope="col">Auditor Name</th>
        <th scope="col">Auditee ID</th>
      </tr>
    </thead>
    <tbody>
    { getCalibration ? getCalibration.map((elem,id)=>{
       var d = formatDate(new Date(elem.updatedAt))
       
    return  <tr style={{fontSize:'11.6px'}} key={elem._id}>
      <td>{id+1}</td>
      { elem.calibration_status==="1" ?<td><button id='calibrateBtn' onClick={()=>handleCalibrate(elem._id)} className='btn btn-primary btn-sm' disabled>Calibrate</button></td>:<td><button id='calibrateBtn' onClick={()=>handleCalibrate(elem._id)} className='btn btn-primary btn-sm'>Calibrate</button></td>}
      
        <td>{elem.msisdn}</td>
        <td>{elem.callid}</td>
        <td>{elem.calltype}</td>
        <td>{d}</td>
        <td>{elem.maximumMarks}</td>
        <td>{elem.obtainedMarks}</td>
        <td>{elem.finalScore}</td>
        <td>{elem.fatalCount}</td>
        <td>{elem.auditor_name}</td>
        <td>{elem.auditee_id}</td>
        </tr>
    }):null }
      
    </tbody>
  </table>
 
</div>

            </div>
            </section>
            </div>
            <Footer />
    </>
  )
}

export default Calibration