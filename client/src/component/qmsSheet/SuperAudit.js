import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const SuperAudit = () => {
  const [processName, setProcessName] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [process, setProcess] = useState("");
  const [getSuperAudit, setGetSuperAudit] = useState("")
  const [sheetName, setSheetName] = useState("")
  const [qaTlTrainerGet, setQaTlTrainer] = useState("")
  const [superAuditAssignId, setSuperAuditAssignId] = useState("")
  const [multipleSelect, setMultipleSelect] = useState("")
  const [prcss, setProcesses] = useState("")
  const [callidd, setCallid] = useState("")

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

  const resetForm = () => {
    setCallid("")
    setGetSuperAudit("")
    setQaTlTrainer("")
    setSuperAuditAssignId("")
    setMultipleSelect("")
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
    if (!sheetName || !process) {
      return false
    } else {

      const postdata1 = async () => {
        const sheetid = sheetName
        const res = await fetch(`${url}/api/get-super-audit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            process, sheetid
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            setGetSuperAudit(data);
          }
        }
      };
      postdata1()
    }
  }

  const handleSuperAudit = async (id, callid) => {
    setSuperAuditAssignId(id);
    setCallid(callid)
    $("#qatlget").attr('disabled', false)
    handleQaTlTrainer()
  }


  const handleSubmitAssign = async (e) => {
    e.preventDefault()
    e.persist()

    const id = superAuditAssignId
    const auditor_id = multipleSelect

    if (!auditor_id) {
      alert("Please select auditor name!")
      return false
    }
    else {
      const postdata2 = async () => {

        const res = await fetch(`${url}/api/super-audit-save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auditor_id, id, callidd
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else if (res.status === 500) {
          toast.error("Call id is not matched to the allocation")
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            handleSubmit(e)
            toast.success("Allocated Successfully!")
            resetForm()
          }
        }
      };
      postdata2()
      $("#qatlget").attr('disabled', true)
    }
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
          } else {

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
                        Super/Cross Assignment
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-sm-3">
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
                            {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {

                              return <option value={element.Process + '|' + element.cm_id} key={element.cm_id}>{element.Process}</option>
                            }) : null : null}

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
                                const sheetsname1 = element.collectionname.split('_')
                                var newSheetName1 = sheetsname1.slice(1);
                                return (
                                  <option key={element._id} value={element.collectionname}>
                                    {newSheetName1.join('_')}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a sheet.
                          </div>
                        </div>

                        <div className='mt-4 ml-2'>
                          <button
                            type='submit'
                            style={{ fontSize: '11.6px' }}
                            className="btn btn-info btn-sm"
                          >GET DATA</button>
                        </div>
                        <p style={{ marginTop: '2rem' }} className=' ml-2 font-weight-bold'>No. Of Records: {getSuperAudit ? getSuperAudit.length : "0"}</p >
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
                        <div className='col-md-3'>
                          <select
                            id="qatlget"
                            name="au_name"
                            value={multipleSelect}
                            onChange={event => setMultipleSelect(event.target.value)}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
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
                        <div className='form-group col-md-3'>
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
                <thead style={{ fontSize: '11px' }} className="thead">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Action</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Call ID</th>
                    <th scope="col">Call Type</th>
                    <th scope="col">Auditor ID</th>
                    <th scope="col">Auditor Post</th>
                    <th scope="col">Auditee ID</th>
                  </tr>
                </thead>
                <tbody>
                  {getSuperAudit ? getSuperAudit.map((elem, id) => {

                    return <tr style={{ fontSize: '11.6px' }} key={elem._id}>
                      <td>{id + 1}</td>
                      {elem.is_superaudit === "1" ? <td><button id='calibrateBtn' style={{ fontSize: "11px" }} onClick={() => handleSuperAudit(elem._id, elem.callid)} className='btn btn-info btn-sm' disabled>Super Assign</button></td> : <td><button id='calibrateBtn' style={{ fontSize: "11px" }} onClick={() => handleSuperAudit(elem._id, elem.callid)} className='btn btn-info btn-sm'>Super Assign</button></td>}

                      <td>{elem.mobileno}</td>
                      <td>{elem.callid}</td>
                      <td>{elem.calltype}</td>
                      <td>{elem.auditor_id}</td>
                      <td>{elem.auditor_post}</td>
                      <td>{elem.agentid}</td>
                    </tr>
                  }) : null}

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

export default SuperAudit