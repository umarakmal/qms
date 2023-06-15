import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const Calibration = () => {
  const [processName, setProcessName] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [process, setProcess] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [callidd, setcallid] = useState("");
  const [getCalibration, setGetCalibration] = useState([])
  const [sheetName, setSheetName] = useState("")
  const [qaTlTrainerGet, setQaTlTrainer] = useState("")
  const [calibrationAssignId, setCalibrationAssignId] = useState("")
  const [multipleSelect, setMultipleSelect] = useState("")
  const [prcss, setProcesses] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [tost, setToast] = useState("");
  const [er, setEr] = useState("")
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

  useEffect(() => {
    if (tost === "1") {
      toast.success("Succesfully calibrated");

    } else {

    }
    if (er === "1") {
      toast.error("Callid is different")
    } else {

    }
  }, [tost, er]);

  const handleMultipleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelect({ value });
  }

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

  const handleQaTlTrainer = async () => {
    var a = process.split('|')
    var cm_id = a[3]
    const res = await fetch(`${url}/api/get-qa-tl-tr`, {
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
      setQaTlTrainer(data);
    }
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
    if (!startDate || !endDate || !process || !sheetName) {
      return false
    } else {
      const date1 = startDate.toLocaleDateString();
      const date2 = endDate.toLocaleDateString();
      const postdata1 = async () => {
        var a = process.split('|')
        var cm_id = a[3]
        const sheet_name = sheetName
        const res = await fetch(`${url}/api/get-calibration-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date1, date2, cm_id, sheet_name
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
              setGetCalibration(data);
              setShow(true)
              setShow1(false)
            } else {
              setGetCalibration([]);
              setShow(false)
              setShow1(true)
            }
          }
        }
      };
      postdata1()
    }
  }

  const handleCalibrate = async (id, callid) => {
    setCalibrationAssignId(id);
    setcallid(callid);
    $("#qatlget").attr('disabled', false)
    handleQaTlTrainer()
  }


  const handleSubmitAssign = async (e) => {
    e.preventDefault()
    e.persist()

    const id = calibrationAssignId
    const calibration_status = "1"

    if (!id) {
      return false
    } else {
      const postdata2 = async () => {

        const res = await fetch(`${url}/api/calibration-status-update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            calibration_status, id,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            handleSubmit(e)
            setToast("1")
            setProcessName("")
            setSheetData("")
            setProcess("")
            setStartDate("")
            setEndDate("")
            setcallid("")
            setGetCalibration([])
            setQaTlTrainer("")
            setCalibrationAssignId("")
            setMultipleSelect("")
            setProcesses("")
            setTimeout(() => {
              setToast("")
            }, 200);
          }
        }
      };

      multipleSelect.value.map((el) => {
        const auditor_id = el
        const postdata3 = async () => {
          const res = await fetch(`${url}/api/calibration-assignment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              callidd, auditor_id
            }),
          });
          const data = await res.json();
          if (res.status === 500 || !data) {
            setEr("1")
            setTimeout(() => {
              setEr("")
            }, 200);

          } else {
            if (!data) {
              console.log("No Data!");
            } else {
              postdata2()
            }
          }
        };
        postdata3()

      })
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


  //For process
  useEffect(() => {
    const postdata1 = async () => {
      const qh = isAuth().EmployeeID
      const res = await fetch(`${url}/api/get-process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qh
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
                      <h3 style={{ fontSize: "1rem" }} className="card-title">
                        Calibration
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-md-2">
                          <label htmlFor="xyz">Process:</label>
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
                            {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {

                              return <option value={element.Process + '|' + element.cm_id} key={element.cm_id}>{element.Process}</option>
                            }) : null : null}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                        <div className=" form-group col-md-2">
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
                                var sheetname = element.collectionname.split('_')
                                var newSheetName = sheetname.slice(1);
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
                            className="form-label "
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
                        <div className='form-group col-md-2 mt-4'>
                          <button
                            type='submit'
                            style={{ fontSize: '11.6px' }}
                            className="btn btn-info btn-sm"
                          >GET DATA</button>
                        </div>
                        <div className='col-md-2'>
                          <p style={{ marginTop: '2rem' }} className='font-weight-bold'>No. Of Records: {getCalibration ? getCalibration.length : "0"}</p >
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </form>
            {show1 ? <center><div className='text-gray-dark'><b>No Data</b></div></center> : null}
            {show ?
              <>
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
                                {qaTlTrainerGet ? qaTlTrainerGet.map((elements) => {
                                  return <option key={elements._id} value={elements.EmployeeID + "-" + elements.Designation}>{elements.Name + "  (" + elements.Designation + ")"}</option>
                                }) : ''
                                }
                              </select>
                            </div>
                            <div className='mt-4 ml-2'>
                              <button
                                type='submit'
                                onClick={handleSubmitAssign}
                                style={{ fontSize: '11.6px' }}
                                className="btn btn-info btn-sm"
                              >Assign</button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                <div style={{ overflow: "auto" }}>
                  <table className="table table-sm mt-3">
                    <thead style={{ fontSize: '11px' }} className="">
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
                      {getCalibration ? getCalibration.map((elem, id) => {
                        var d = formatDate(new Date(elem.updatedAt))

                        return <tr style={{ fontSize: '11.6px' }} key={elem._id}>
                          <td>{id + 1}</td>
                          {elem.calibration_status === "1" ? <td><button id='calibrateBtn' onClick={() => handleCalibrate(elem._id, elem.calllid)} className='btn btn-info btn-sm' disabled>Calibrate</button></td> : <td><button id='calibrateBtn' onClick={() => handleCalibrate(elem._id, elem.callid)} className='btn btn-info btn-sm'>Calibrate</button></td>}

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
                      }) : null}

                    </tbody>
                  </table>

                </div>
              </> : null}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Calibration