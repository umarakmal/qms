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
const Feedback = () => {
  const [dataSource, setDataSource] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [getFeedbackData, setFeedbackData] = useState("")

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

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      return false
    } else {

      const date1 = startDate.toLocaleDateString();
      const date2 = endDate.toLocaleDateString();
      const postdata1 = async () => {
        const { sheet } = dataSource
        const sheet_name = sheet
        const auditee_id = isAuth().result[0].EmployeeID
        const res = await fetch(`${url}/api/feedback-get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date1, date2, auditee_id, sheet_name
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            setFeedbackData(data);
          }
        }
      };
      postdata1();
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

  useEffect(() => {
    const postdata = async () => {
      const auditee_id = isAuth().result[0].EmployeeID
      const res = await fetch(`${url}/api/get-sheet-auditee-feedback`, {
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
          setSheetData(data);
        }
      }
    };
    postdata();
  }, [])

  const handleUpdate = async (e, id) => {
    e.preventDefault()
    e.persist()
    const dataSourceLength = Object.keys(dataSource).length;

    const { Auditee_Remark } = dataSource
    if (dataSourceLength < 3) {
      $(".agr").show()
      return false
    } else if (!Auditee_Remark) {
      $(".agr").hide()
      $(".auditeerr").show()
      return false
    }
    else {
      const dataSourcevalues = Object.values(dataSource);
      const Acknowledgement = dataSourcevalues[1];
      const postdata2 = async () => {

        const res = await fetch(`${url}/api/update-feedback-sheetdetails`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Acknowledgement, Auditee_Remark, id
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            toast.success("Successfully updated")
            handleSubmit(e)
          }
        }
      };
      postdata2();
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
              className="needs-validation" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Feedback
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-md-3">
                          <label htmlFor="xyz">Sheet:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="sheet"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {sheetData ? sheetData.map((el) => {
                              var zz = el.split('_')
                              return <option value={el} key={el}>{zz[1]}</option>
                            }) : null}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a Sheet.
                          </div>
                        </div>

                        <div className="form-group col-md-3">
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
                        <div className="form-group col-md-3">
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
                        <div className='form-group mt-4 col-md-3'>
                          <button
                            type='submit'
                            style={{ fontSize: '11.7px' }}
                            className="btn btn-info btn-sm"
                          >GET DATA</button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div style={{ overflow: "auto" }} className='card'>
              <table className="table table-sm mt-3">
                <thead style={{ fontSize: '11px' }} className="">
                  <tr >
                    <th scope="col">#</th>
                    <th scope="col">Audit Date</th>
                    <th scope="col">Max. Marks</th>
                    <th scope="col">Obt. Marks</th>
                    <th scope="col">Final Score</th>
                    <th scope="col">Fetal Count</th>
                    <th scope="col">Auditee Name</th>
                    <th scope="col">Auditor Name</th>
                    <th scope="col">Auditor Remark</th>
                    <th scope="col">Acknowledgement</th>
                    <th scope="col">Remark</th>
                    <th scope="col"></th>

                  </tr>
                </thead>
                <tbody style={{ fontSize: '12px' }}>
                  {getFeedbackData ? getFeedbackData.map((el, id) => {
                    var d = formatDate(new Date(el.updatedAt))

                    return <tr key={el._id}>
                      <td>{id + 1}</td>
                      <td>{d}</td>
                      <td>{el.maximumMarks}</td>
                      <td>{el.obtainedMarks}</td>
                      <td>{el.finalScore + "%"}</td>
                      <td>{el.fatalCount}</td>
                      <td>{el.auditee_name}</td>
                      <td>{el.auditor_name}</td>
                      <td>{el.auditor_remark}</td>
                      <td>
                        <div className="form-group ">
                          <div className="row">
                            <div className="mr-1">
                              <input
                                type="radio"
                                id={"agree" + id}
                                value="agree"
                                checked={el.Acknowledgement ? el.Acknowledgement === "agree" : null}
                                onChange={setdata}
                                name={"ackchk" + id}
                                required
                                disabled={
                                  el.Acknowledgement === "" ? false : true
                                }
                              />
                              <label htmlFor="agree" className='ml-1'>Agree</label>
                            </div>
                            <div className=" ">
                              <input
                                type="radio"
                                id={"disagree" + id}
                                value="disagree"
                                checked={el.Acknowledgement ? el.Acknowledgement === "disagree" : null}
                                onChange={setdata}
                                name={"ackchk" + id}
                                required
                                disabled={
                                  el.Acknowledgement === "" ? false : true
                                }
                              />
                              <label htmlFor="disagree" className='ml-1'>Disagree</label>
                            </div>
                            <p className="agr" style={{ display: 'none', color: 'red' }} >Please select.</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          style={{ fontSize: "12.4px" }}
                          className="form-group "
                        >
                          <textarea
                            type="text"
                            onChange={setdata}
                            style={{ fontSize: "12.4px" }}
                            name="Auditee_Remark"
                            defaultValue={el.Auditee_Remark}
                            id={"feedback" + id}
                            placeholder='Agent Remark'
                            className="form-control form-control-sm autee"
                            aria-describedby="emailHelp"
                            required
                            disabled={
                              el.Acknowledgement === "" ? false : true
                            }
                          />
                          <span className="auditeerr" style={{ display: 'none', color: 'red' }}>Please input.</span>
                        </div>
                      </td>
                      <td><button id={'btnupd' + id} onClick={(e) => handleUpdate(e, el._id)} className='btn btn-sm btn-info' disabled={el.Auditee_Remark !== '' || el.Acknowledgement !== ''}>Submit</button></td>
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

export default Feedback