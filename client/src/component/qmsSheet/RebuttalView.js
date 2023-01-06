import React,{useEffect,useState} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import $ from 'jquery'
const RebuttalView = () => {
  const [getRebuttelView, setRebuttelView] =  useState("");
  const [auditorRemark,setAuditorRemark] = useState("")
  const [rebuttalId,setRebuttalId] = useState("")
  const location = useLocation()

  useEffect(()=>{
    if(location.state != null){
      toast.success("successfull!");
    }
  },[])

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

  useEffect(() => {
    const postdata1 = async () => {
        const auditorid = "CE90980192"
            const res = await fetch("/api/get-rebuttel-view-data", {
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
                setRebuttelView(data);
                setRebuttalId(data[0]._id)
              }
            }
          };
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

const handleAudio=(e,id)=>{
e.preventDefault()
  //  console.log(id);
}

const handleReject=(e,id)=>{
  e.preventDefault()
}
// const handleAccept=(e,id)=>{
//   e.preventDefault()
// }

$(function(){
  $("#reject").on('click', function(){
    $("#feedback").attr("disabled", false)
    $("#submit").attr("disabled", false)
  })
  $("#selectaudio").on('click', function () {
    $("#audio").show()
     })
})

const handleSubmit= async(e)=>{
e.preventDefault()
const {feedback} = auditorRemark
if(!feedback){
  return false
}
else{
        const reject_by = "CE90980192"
        const ids = rebuttalId
            const res = await fetch("/api/update-rebuttal-sheetlistdetails", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ids,reject_by
              }),
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
              console.log("error ");
            } else {
              if (!data) {
                console.log("No Data!");
              } else {
                toast.success("Success")
              }
            }

            const postdata1 = async () => {
              const auditorid = "CE90980192"
                  const res = await fetch("/api/get-rebuttel-view-data", {
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
                      setRebuttelView(data);
                      setRebuttalId(data[0]._id)
                    }
                  }
                };
                postdata1()
          
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
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Rebuttal View
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className='row'>
                        <div className='form-group col-sm-3 mr-5'>
                      <label >Auditee audio feedback</label>
                      <audio id='audio' style={{fontSize:"11px", display:'none'}} controls="controls" src=''></audio>
                      </div>
                      <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-3 ml-5"
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
                          <div>
                          <button
                                  style={{fontSize:"11px"}}
                                  className="btn btn-sm btn-primary mt-4 ml-5"
                                  id='submit'
                                  type='submit'
                                  disabled
                                >
                                  Submit
                                </button>
                                </div>
                          </div>
                    <div>
  <table className="table table-sm mt-3">
    <thead style={{fontSize:'11px'}} className="thead-dark">
      <tr>
        <th scope="col">Action</th>
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
    getRebuttelView? getRebuttelView.map((el)=>{
   const   d = formatDate(new Date(el.createdAt))
   const e = formatDate(new Date(el.updatedAt))
  //  var v= el.assigningData.split(",")
  //  var call = v[3].substring(7,42)
  //  var acht = v[5].substring(7,10)
  //  var mobile=v[6].substring(7,17)
  //  var callid = v[1].substring(7,25)
return <tr>
  <td>
  <NavLink to={`edit/rebuttel?id=${el._id}&sheetid=${el.sheet_name}&auditeeid=${el.employeeid}`}>
                       <button
                                  key={el._id + "97700"}
                                  style={{fontSize:"11px"}}
                                  id="accept"
                                
                                  className="btn btn-sm btn-primary "
                                >
                                  Accept
                                </button> 
                                </NavLink>
                                <button
                                  key={el._id + "97154870"}
                                  style={{fontSize:"11px"}}
                                  id="reject"
                                  onClick={(e)=>handleReject(e,el._id)}
                                  className="btn btn-sm btn-primary ml-2"
                                >
                                  Reject
                                </button></td>
  <td><button
                                  key={el._id + "erg757/00"}
                                  id="selectaudio"
                                  style={{fontSize:"11px"}}
                                  onClick={(e)=>handleAudio(e,el._id)}
                                  className="btn btn-sm btn-primary"
                                >
                                  Select Audio
                                </button></td>
  <td>{d}</td>
  <td>{el.maximumMarks}</td>
  <td>{el.obtainedMarks}</td>
  <td>{el.finalScore}</td>
  <td>{el.fatalCount}</td>
  <td>{el.auditee_id}</td>
  <td></td>
  <td>{el.auditor_name}</td>
  <td>{el.feedback}</td>
  <td>{e}</td>
      </tr>
    }):null
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