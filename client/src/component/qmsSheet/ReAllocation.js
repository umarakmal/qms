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
const ReAllocation = () => {
  const [dataSource, setDataSource] = useState("");
  const [processName, setProcessName] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [process, setProcess] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [qaTlTrainerGet, setQaTlTrainer] = useState("")
  const [assigningData, setAssigningData] = useState([])
  const [sheetName, setSheetName] = useState("")
  const [callidtype, setCallidType] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [prcss, setProcesses] = useState("")
  const [ids, setIds] = useState({
    idall: [],
    response: [],
  });

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

  const getCallid = async () => {
    const y = process.split("|");
    // const c = y[0] + y[1];
    const cm_id = y[3]
    // var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
    // var collectionname = x
    const res = await fetch(`${url}/api/get-callid`, {
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
      setCallidType(data);
    }
  };

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
    $("#selectAuditor").attr('disabled', true)
    $("#selectAuditor").val("")

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
      const postdata1 = async () => {

        const sheetid = sheetName
        const res = await fetch(`${url}/api/get-assign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date1, date2, process, sheetid
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
              setAssigningData(data);
              setShow(true)
              setShow1(false)
            } else {
              setAssigningData([]);
              setShow(false)
              setShow1(true)
            }

            handleQaTlTrainer()
          }
        }
      };
      postdata1();
      getCallid()
    }
  }

  $(function () {
    $("#reallocate").on('click', function () {
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


  const checkAssign = async (id, e) => {
    const { value, checked } = e.target;
    const { idall } = ids;
    if (checked) {
      setIds({
        idall: [...idall, value],
        response: [...idall, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setIds({
        idall: idall.filter((e) => e !== value),
        response: idall.filter((e) => e !== value),
      });
    }

  }

  const handleSubmitAllocate = async (e) => {
    e.preventDefault()
    e.persist();
    const { auditor } = dataSource
    if (!auditor) {
      return false
    } else {

      const id1 = ids.response
      if (id1.length <= 0) {
        alert("Please select data to be assigned!")
        return false
      } else {
        var a = auditor.split(',')
        const auditor_id = a[0]
        const auditor_post = a[1]
        const res2 = await fetch(`${url}/api/re-allocation`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auditor_id, id1, auditor_post
          }),
        });
        const data = await res2.json();
        if (res2.status === 422 || !data) {
          toast.error("error");
        } else if (res2.status === 200) {
          var i = 0
          $('input:checked').each(function () {
            var p = "#action" + i
            $(p).attr('disabled', true)
            i++;
          });
          handleSubmit(e)
          toast.success("Re-Allocated Successfully!")
        } else {
          toast.error("error")
        }
      }
    }
  }

  var d = ''

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
                        Re-Allocation
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-md-2">
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
                        <div className='col-md-2 mt-4'>
                          <button
                            type='submit'
                            style={{ fontSize: '11.7px' }}
                            className="btn btn-info btn-sm"
                          >GET DATA</button>
                        </div>
                        <div className='form-group col-md-2 mt-4'>
                          <p className='font-weight-bold'>No. Of Records: {assigningData ? assigningData.length : "0"} </p>
                        </div>
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
                        <div className='form-group col-sm-3'>
                          <select
                            id="selectAuditor"
                            name="auditor"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                            disabled
                          >
                            <option value="">--Select--</option>
                            {qaTlTrainerGet ? qaTlTrainerGet.map((elements) => {
                              return <option key={elements._id} value={elements.EmployeeID + ',' + elements.Designation}>{elements.Name + "  (" + elements.Designation + ")"}</option>
                            }) : ''
                            }
                          </select>
                        </div>
                        <div className='form-group ml-2'>
                          <button
                            type='submit'
                            id='allocatesubmit'
                            onClick={handleSubmitAllocate}
                            style={{ fontSize: '11.6px' }}
                            className="btn btn-info btn-sm"
                          >ALLOCATE</button>
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
                <div className='mt-4 ml-2'>
                  <button
                    type='submit'
                    // onClick={handleSubmit}
                    id='reallocate'
                    style={{ fontSize: '11.6px' }}
                    className="btn btn-info btn-sm"
                  >RE-ALLOCATE THE SELECTED ITEM</button>
                </div>
                <div style={{ overflow: "auto" }}>
                  <table className="table table-sm mt-3">
                    <thead style={{ fontSize: '11px' }} className="">
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
                      {assigningData ? assigningData.map((el, id) => {

                        (d = formatDate(new Date(el.createdAt)))


                        return <tr style={{ fontSize: "12px" }} key={el._id}>
                          <th scope="row">{id + 1}</th>
                          <td><input type='checkbox' value={el._id} id={"action" + id} onClick={(e) => checkAssign(el._id, e)} /></td>
                          <td>{el.acht}</td>
                          <td>{el.callid}</td>
                          <td>{d}</td>
                          <td>{el.auditor_id}</td>
                          <td>{el.agentid}</td>
                        </tr>
                      }) : null}

                    </tbody>
                  </table>
                </div>
              </>
              : null}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default ReAllocation