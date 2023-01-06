import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const ReAllocation = () => {
    const [dataSource, setDataSource] = useState("");
    const [processName, setProcessName] = useState("");
    const [sheetData, setSheetData] = useState("");
    const [process, setProcess] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [qaTlTrainerGet,setQaTlTrainer] = useState("")
    const [assigningData,setAssigningData] = useState("")
    const [sheetName,setSheetName] = useState("")
    const [callidtype, setCallidType] = useState("")

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
    },[]);

    const setdata = (e) => {
        const { name, value } = e.target;
        setDataSource((dataSource) => {
          return {
            ...dataSource,
            [name]: value,
          };
        });
      };
      //QA TL Trainer
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

      const getCallid = async () => {
        const y = process.split("|");
        const c = y[0] + y[1];
        var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
        var collectionname = x
        const res = await fetch("/api/get-callid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collectionname,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          setCallidType(data);
        }
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
        handleQaTlTrainer()
        if(!startDate || !endDate){
          return false
        }else{

    const date1 = startDate.toLocaleDateString();
    const date2 = endDate.toLocaleDateString();
        const postdata1 = async () => {
      const sheetid = sheetName
          const res = await fetch("/api/get-assign", {
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
              setAssigningData(data);
            }
          }
        };
        postdata1();
        getCallid()
      }
      }

      $(function(){
       $("#reallocate").on('click', function(){
        $("#selectAuditor").attr('disabled', false)
       })
      })

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

    const id1 = []
    const checkAssign = async(id)=>{
    id1.push(id)
    }

 const handleSubmitAllocate = async(e) =>{
  e.preventDefault()
  const {auditor_id} = dataSource
  if(!auditor_id){
    return false
  }else{
   const res2 = await fetch("/api/re-allocation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditor_id,id1
        }),
      });
      const data = await res2.json();
      if (res2.status === 422 || !data) {
        toast.error("error");
      } else if(res2.status === 200){
        toast.success("Re-Allocated Successfully!")
      }else{
        toast.error("error")
      }
    }
 }

 var d = ''

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
                        <p style={{marginTop:'2rem'}} className='ml-2 font-weight-bold'>No. Of Records: {assigningData ? assigningData.length:"0"} </p >
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
                            id="selectAuditor"
                            name="auditor_id"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
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
                        <div className=' ml-2'>
                        <button
                        type='submit'
                        id='allocatesubmit'
                        onClick={handleSubmitAllocate}
                        style={{fontSize:'11.6px'}}
                        className="btn btn-primary btn-sm"
                        >ALLOCATE</button>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className='mt-4 ml-2'>
                        <button
                        type='submit'
                        // onClick={handleSubmit}
                        id='reallocate'
                        style={{fontSize:'11.6px'}}
                        className="btn btn-primary btn-sm"
                        >RE-ALLOCATE THE SELECTED ITEM</button>
                        </div>
                       <div>
  <table className="table table-sm mt-3">
    <thead style={{fontSize:'11px'}} className="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Action</th>
        <th scope="col">MSISDN</th>
        <th scope="col">Call ID</th>
        <th scope="col">Allocation Date</th>
        <th scope="col">Auditor ID</th>
        <th scope="col">Auditee ID</th>
      </tr>
    </thead>
    <tbody>
    {assigningData ? assigningData.map((el,id)=>{
      
        ( d = formatDate(new Date(el.createdAt)))
       var ass= (el.assigningData).split(",");
       var callid = ass[1].substring(6)
       var msisdn = ass[6].substring(7,17)


    return  <tr style={{fontSize:"12px"}} key={el._id}>
        <th scope="row">{id + 1}</th>
       <td><input type='checkbox' value={el._id} id={"action"+id} onClick={() => checkAssign(el._id)}/></td> 
        <td>{msisdn}</td>
        <td>{callid}</td>
        <td>{d}</td>
        <td>{el.auditor_id}</td>
        <td>{el.auditeeid}</td>
      </tr>
    }):null}
      
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

export default ReAllocation