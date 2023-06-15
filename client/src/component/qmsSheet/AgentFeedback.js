import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { ToastContainer, toast } from 'react-toastify'
import { isAuth } from '../auth/helpers'
import Wave from "react-wavify";
import $ from 'jquery'
import { NavLink } from 'react-router-dom'
const url = `${process.env.REACT_APP_BACKEND_URL}`
const AgentFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([])
  const [agentData, getAgentData] = useState("")
  const [dataSource, setDataSource] = useState("")
  const [id1, setId1] = useState("")
  const [show, setShow] = useState(false)
  const [auditorRecording, getAuditorRecording] = useState("")
  //for recording
  const [audioURLs, setAudioURLs] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const acknow = (e, id, rbtlstatus, updatedAt, fclose, finalScore, audioURL) => {
    setId1(id)
    getAgentData(finalScore)
    getAuditorRecording(audioURL)
    //To show recording option
    $("#agentrecord").show()
    $("#agree").prop('checked', false);
    $("#disagree").prop('checked', false);
    $("#exceed").css('display', 'none')
    //To check agree disagree
    var date1 = new Date(updatedAt)
    var date2 = (new Date(Date.now()));
    var timeDiff = Math.abs(date1.getTime() - date2.getTime());
    var diffInHours = timeDiff / (1000 * 60 * 60);
    $(function () {
      $("#disagree").on('click', function () {
        if (diffInHours >= 72 || rbtlstatus === "2" || fclose === "closed") {
          $("#exceed").css('display', 'block')
          $("#disagree").prop("checked", false);
        } else {
          $("#exceed").css('display', 'none')
        }
      })
    })
  }

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  const postdata1 = async () => {
    const auditee_id = isAuth().EmployeeID
    const res = await fetch(`${url}/api/get-sheetList-for-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auditee_id
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
          setFeedbackData(data);
          setShow(true)
        }
      }
    }
  };

  //For data in the table
  useEffect(() => {
    postdata1()
  }, []);


  const handleReset = () => {
    setDataSource({})
    setId1("")
    $("#feedback").val("")
    $("#agree").prop('checked', false);
    $("#disagree").prop('checked', false);
    $("#agentrecord").hide()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { ackchk, Auditee_Remark } = dataSource
    if (!ackchk) {
      $(".agr").show()
      return false
    }
    else if (!Auditee_Remark) {
      $(".agr").hide()
      return false
    }
    else {

      fetch(audioURLs)
        .then((response) => response.blob())
        .then((blob) => {
          const fd = new FormData();
          fd.append("audioURL", blob, "audiofile.weba"); // where `.ext` matches file `MIME` type
          fd.append("Auditee_Remark", Auditee_Remark);
          fd.append("ackchk", ackchk);
          fd.append("id", id1);
          return fetch(`${url}/api/agent-feedback-update`, { method: "PUT", body: fd });
        })
        .then((response) => {
          if (response.status === 200) {
            handleReset()
            postdata1()
            toast.success("Succesfully saved!");
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Occured!");
        });
    }
  }

  //For audio recordin
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.

    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      const objectURL = URL.createObjectURL(e.data);
      setAudioURLs(objectURL);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };
  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return new MediaRecorder(stream);
  }



  //Audio recording
  $(function () {
    $("#recordbutton").on("click", function () {
      $("#audiofunction").hide();
      $("#wavediv").css("display", "block");
    });
    $("#stopbutton").on("click", function () {
      $("#audiofunction").show();
      $("#wavediv").hide();
    });
  });

  //Date convert function
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
            <form id="form1" noValidate
              className="needs-validation" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "1rem" }} className="card-title">
                        Agent Feedback
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className='card-body' id='agentrecord' style={{ display: 'none' }}>
                        <div className='row '>
                          <div className='mt-2 form-group col-sm-2'>
                            <label >Final Score : <span > {agentData ? agentData + '%' : '0'}</span></label>
                          </div>
                          <div className="form-group col-sm-2">
                            <div className="row">
                              <div className="icheck-primary mr-1">
                                <input
                                  type="radio"
                                  id="agree"
                                  value="agree"
                                  onChange={setdata}
                                  name="ackchk"
                                  required
                                />
                                <label htmlFor="agree">Agree</label>
                              </div>
                              <div className="icheck-primary ">
                                <input
                                  type="radio"
                                  id="disagree"
                                  value="disagree"
                                  onChange={setdata}
                                  name="ackchk"
                                  required
                                />
                                <label htmlFor="disagree">Disagree</label>
                              </div>
                              <p className="agr" style={{ display: 'none', color: 'red' }} >Please select agree or disagree</p>
                            </div>
                            <p id="exceed" style={{ color: 'red', display: 'none' }}>You exceed the limit for disagreed</p>
                          </div>
                          <div className="form-group col-md-4" >
                            <span className='ml-2'>Auditee Voice Feedback</span>
                            <audio src={audioURLs} id="audiofunction" style={{ width: '100%' }} controls />
                            <div
                              id="wavediv"
                              style={{
                                width: "300px",
                                height: "75px",
                                display: "none",
                              }}
                              className="ml-2"
                            >
                              <Wave
                                style={{ height: "80%", width: "75%" }}
                                fill="#4b4b4b"
                                paused={false}
                                options={{
                                  height: 15,
                                  amplitude: 15,
                                  speed: 0.15,
                                  points: 3,
                                }}
                                id="waveform"
                              />
                            </div>
                            {/* <div className="form-group row ml-5"> */}
                            <center>
                              <button
                                // style={{ marginLeft: "15px" }}
                                className="btn btn-sm btn-success "
                                onClick={startRecording}
                                disabled={isRecording}
                                id="recordbutton"
                              >
                                Record
                              </button>
                              <button
                                className="btn btn-sm btn-danger  ml-1"
                                onClick={stopRecording}
                                disabled={!isRecording}
                                id="stopbutton"
                              >
                                Stop
                              </button>
                            </center>
                            {/* </div> */}
                          </div>
                          <div className="form-group col-sm-4">
                            <span className='ml-2'>Auditor Voice Feedback</span>
                            <audio src={(__dirname =
                              "/uploads/files/" + auditorRecording)} id="audiofunction" style={{ width: '100%' }} controls />
                          </div>
                          <div
                            style={{ fontSize: "12.4px" }}
                            className="form-group col-sm-3"
                          >
                            <textarea
                              type="text"
                              onChange={setdata}
                              style={{ fontSize: "12.4px" }}
                              name="Auditee_Remark"
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              id="feedback"
                              placeholder='Agent Remark'
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              required
                            />
                            <div className="invalid-feedback ">Please input remark.</div>
                          </div>

                          <div className="form-group col-sm-2">
                            <button type='submit' className='btn btn-sm btn-info' >Submit</button>
                          </div>
                        </div>
                      </div>
                      {/* <hr></hr> */}
                      {show ?
                        <div style={{ overflow: "auto" }}>
                          <table className="table table-sm mt-3">
                            <thead style={{ fontSize: '11px' }} className="">
                              <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Action</th>
                                <th scope="col">Sheet View</th>
                                <th scope="col">Audit Date</th>
                                <th scope="col">Max. Marks</th>
                                <th scope="col">Obt. Marks</th>
                                <th scope="col">Final Score</th>
                                <th scope="col">Fetal count</th>
                                <th scope="col">Auditee Name</th>
                                <th scope="col">Auditor Name</th>
                                <th scope="col">Auditor Remark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {feedbackData ? feedbackData.map((el, id) => {
                                var d = formatDate(new Date(el.updatedAt))
                                return <tr key={el._id}>
                                  <td>{id + 1}</td>
                                  <td>{el.rbtlstatus === '1' && el.fclose === '0' ? <button type='button' style={{ fontSize: '12px' }} id={"ack" + id} onClick={(e) => acknow(e, el._id, el.rbtlstatus, el.updatedAt, el.fclose, el.finalScore, el.audioURL)} className='btn btn-sm btn-info' disabled>ACKNOWLEDGE</button> : <button type='button' style={{ fontSize: '12px' }} id={"ack" + id} onClick={(e) => acknow(e, el._id, el.rbtlstatus, el.updatedAt, el.fclose, el.finalScore, el.audioURL)} className='btn btn-sm btn-info'>ACKNOWLEDGE</button>}</td>
                                  <td className="d-flex " key={el._id + "tt"}>
                                    <NavLink target='_blank' to={`/agent-sheetview?id=${el._id}&sheetid=${el.sheet_name}&auditeeid=${el.auditee_id}&msisdn= ${el.msisdn}&calltype=${el.calltype}&callid=${el.callid}&acht=${el.acht}&extrafield1=${el.extrafield1}&extrafield2=${el.extrafield2}`}>
                                      {" "}
                                      <span
                                        key={el._id + "97700"}
                                        style={{ fontSize: "11px", color: '#0984e3' }}
                                        className="btn btn-sm "
                                      >
                                        Audit Sheet View
                                      </span>
                                    </NavLink>
                                  </td>
                                  <td>{d}</td>
                                  <td>{el.maximumMarks}</td>
                                  <td>{el.obtainedMarks}</td>
                                  <td>{el.finalScore + "%"}</td>
                                  <td>{el.fatalCount}</td>
                                  <td>{el.auditee_name}</td>
                                  <td>{el.auditor_name}</td>
                                  <td>{el.auditor_remark}</td>
                                </tr>
                              }) : null}
                            </tbody>
                          </table>
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

export default AgentFeedback