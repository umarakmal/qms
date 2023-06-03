import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import $ from 'jquery'
import { isAuth } from '../auth/helpers'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const RebuttalView = () => {
  const [getRebuttelView, setRebuttelView] = useState("");
  const [audio, setAudio] = useState("")
  const [auditorRemark, setAuditorRemark] = useState("")
  const [rebuttalId, setRebuttalId] = useState("")
  const [auditeeId, setAuditeeId] = useState("")
  const [sheetid, setSheetId] = useState("")
  const [oldScore, setOldScore] = useState("")
  const [dataId, setDataId] = useState("")
  const location = useLocation()
  useEffect(() => {
    if (location.state != null) {
      toast.success("successfull!");
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [])

  const setdata = (e) => {
    const { name, value } = e.target;
    setAuditorRemark((auditorRemark) => {
      return {
        ...auditorRemark,
        [name]: value,
      };
    });
  };

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

  var xyz = []


  const postdata1 = async () => {
    const auditorid = await isAuth().EmployeeID
    const qh = await isAuth().qh
    if (qh === auditorid) {
      xyz.push(1);
    } else if (qh !== auditorid) {
      xyz.push(0)
    } else {
      xyz.push(2)
    }

    var flag = xyz[0]
    const res = await fetch(`${url}/api/get-rebuttel-view-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auditorid, flag
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
          setRebuttelView(data);
          setRebuttalId(data[0]._id)
          setSheetId(data[0].sheet_name)
          setAudio(data[0].audioURL)
          setAuditeeId(data[0].auditee_id)
          setOldScore(data[0].finalScore)
          setDataId(data[0].dataId)
        }
        else {
          setRebuttalId("")
          setRebuttelView("")
          setSheetId("")
          setAudio("")
          setAuditeeId("")
          setOldScore("")
        }
      }
    }
  }

  useEffect(() => {
    postdata1()
  }, []);

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

  const handleAudio = (e, id, auditeeRec) => {
    e.preventDefault()
    $("#audio").show()
    setAudio(auditeeRec)
  }

  const handleReject = (e, id, auditeeRec) => {
    e.preventDefault()
    $("#feedback").attr("disabled", false)
    $("#submit").attr("disabled", false)
    $("#audio").show()
    setAudio(auditeeRec)
  }

  const handleReset = () => {
    setRebuttelView("")
    setRebuttalId("")
    setSheetId("")
    setAudio("")
    setAuditeeId("")
    setOldScore("")
    setAuditorRemark({})
    $("#feedback").val("")
    $("#feedback").attr("disabled", true)
    $("#submit").attr("disabled", true)
    $("#audio").hide()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { feedback } = auditorRemark
    if (!feedback) {
      return false
    }
    else {
      const auditorid = isAuth().EmployeeID
      const qh = await isAuth().qh
      if (qh === auditorid) {
        xyz.push(1);
      } else if (qh !== auditorid) {
        xyz.push(0)
      } else {
        xyz.push(2)
      }

      //To update rebuttal    
      var flag = xyz[0]
      const reject_by = isAuth().EmployeeID
      const ids = rebuttalId
      const postdataUpd = async () => {
        const res = await fetch(`${url}/api/update-rebuttal-sheetlistdetails`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids, reject_by, flag
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else if (res.status === 200) {
            toast.success("Success")
            postdata1()
          }
        }
      }

      //To input data into rebuttal status table
      const remark = feedback
      const pre_score = oldScore
      const dataid = dataId
      //create rebuttal status
      const CreateRebuttalStatus = async () => {
        const res1 = await fetch(`${url}/api/create-rebuttal-status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sheetid, auditeeId, auditorid, pre_score, remark, flag, dataid
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          postdataUpd()
          handleReset()
        } else {
          toast.error("Something went wrong");
        }
      };
      CreateRebuttalStatus()

    }
  }


  const checkSpecialChar = (e) => {
    if (!/[0-9a-zA-Z\s_.,]/.test(e.key)) {
      e.preventDefault();
    }
  };

  function handlePaste(event) {
    const pasteData = event.clipboardData.getData('text/plain');
    const regex = /^[a-zA-Z0-9\s_.,]*$/; // only allow alphanumeric characters

    if (!regex.test(pasteData)) {
      event.preventDefault();
      // show an error message or take other actions as needed
    }
  }

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form noValidate className="needs-validation" id="form" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: ".9rem" }} className="card-title">
                        Rebuttal View
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className='row'>
                        <div className='form-group col-md-4 '>
                          <label >Auditee audio feedback</label>
                          <audio id='audio' style={{ fontSize: "11px", display: 'none', width: '100%' }} controls="controls" src={
                            (__dirname =
                              "/uploads/files/" + audio)
                          }></audio>
                        </div>
                        <div
                          style={{
                            fontSize: "12.4px",
                          }}
                          className="form-group col-md-4"
                        >
                          <label
                            style={{ fontSize: "11px" }}
                            htmlFor="exampleInputEmail"
                          >
                            Feedback:
                          </label>
                          <span className="text-danger">*</span>
                          <textarea
                            type="text"
                            onChange={setdata}
                            style={{ fontSize: "12.4px" }}
                            placeholder="Auditor Remark"
                            name="feedback"
                            onPaste={handlePaste}
                            onKeyDown={checkSpecialChar}
                            id="feedback"
                            className="form-control form-control-sm"
                            aria-describedby="emailHelp"
                            disabled
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide feedback.
                          </div>
                        </div>
                        <div className='form-group col-md-2'>
                          <button
                            style={{ fontSize: "11px" }}
                            className="btn btn-sm btn-info mt-4 "
                            id='submit'
                            type='submit'
                            disabled
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <div style={{ overflow: "auto" }} >
                        <table className="table table-sm  mt-3" >
                          <thead style={{ fontSize: '11px' }} className="">
                            <tr>
                              <th scope="col" >Action</th>
                              <th scope="col">Auditee Audio Feedback</th>
                              <th scope="col">Audit Date</th>
                              <th scope="col">Max. Marks</th>
                              <th scope="col">Obt. Marks</th>
                              <th scope="col">Final Score</th>
                              <th scope="col">Fetal Count</th>
                              <th scope="col">Auditee Name</th>
                              <th scope="col">Auditee Remark</th>
                              <th scope="col">Auditor Name</th>
                              <th scope="col">Auditor Remark</th>
                              <th scope="col">Rebuttal Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              getRebuttelView ? getRebuttelView.map((el) => {
                                const d = formatDate(new Date(el.createdAt))
                                const e = formatDate(new Date(el.updatedAt))

                                return <tr>
                                  <td className='form-group col-md-2'>
                                    <NavLink to={`edit/rebuttel?id=${el._id}&sheetid=${el.sheet_name}&auditeeid=${el.auditee_id}`}>
                                      <button
                                        key={el._id + "97700"}
                                        style={{ fontSize: "11px" }}
                                        id="accept"
                                        className="btn btn-sm btn-info form-group"
                                      >
                                        Accept
                                      </button>
                                    </NavLink>
                                    <button
                                      key={el._id + "97154870"}
                                      style={{ fontSize: "11px" }}
                                      id="reject"
                                      onClick={(e) => handleReject(e, el._id, el.auditee_feedurl)}
                                      className="btn btn-sm btn-info form-group"
                                    >
                                      Reject
                                    </button></td>
                                  <td className='form-group col-md-2'><button
                                    key={el._id + "erg757/00"}
                                    id="selectaudio"
                                    style={{ fontSize: "11px" }}
                                    onClick={(e) => handleAudio(e, el._id, el.auditee_feedurl)}
                                    className="btn btn-sm btn-info "
                                  >
                                    Select Audio
                                  </button></td>
                                  <td>{d}</td>
                                  <td>{el.maximumMarks}</td>
                                  <td>{el.obtainedMarks}</td>
                                  <td>{el.finalScore}</td>
                                  <td>{el.fatalCount}</td>
                                  <td>{el.auditee_id}</td>
                                  <td>{el.Auditee_Remark}</td>
                                  <td>{el.auditor_name}</td>
                                  <td>{el.auditor_remark}</td>
                                  <td>{e}</td>
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

export default RebuttalView