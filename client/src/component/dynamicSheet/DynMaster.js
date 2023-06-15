import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import $ from "jquery";
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { isAuth } from "../auth/helpers";
import { FixedSizeList as List } from "react-window";
import Select, { createFilter } from "react-select";
const url = `${process.env.REACT_APP_BACKEND_URL}`;


const height = 35;
const MenuList = ({ children, maxHeight, getValue }) => {
  const [emp, setEmp] = useState([]);
  const [value] = getValue();
  const options = emp ? emp.map((el) => ({
    label: el.EmployeeName + "-" + el.EmployeeID,
    value: el.EmployeeID + "-" + el.EmployeeName
  })) : null

  const initialOffset = options.indexOf(value) * height;
  const getdata = async () => {
    const res = await fetch(`${url}/api/get-active-empid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setEmp(data);
      }
    }
  };
  useEffect(() => {
    getdata()
  }, []);
  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};



const DynMaster = () => {
  const location = useLocation()
  const [emp, setEmp] = useState([]);
  const [process, setProcess] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [duallist, setDualList] = useState({});
  const [tost, setToast] = useState("");
  const [er, setEr] = useState("");
  const [checkVal, setCheckVal] = useState([]);
  let { selected } = duallist;
  var m = [];
  m.push(selected);

  const onChanges = (selected) => {
    setDualList({ selected });
  };

  const options = emp
    ? emp.map((el) => ({
      label: el.EmployeeName + "-" + el.EmployeeID,
      value: el.EmployeeID + "-" + el.EmployeeName,
    }))
    : null;

  const opt = process
    ? process.map((element) => ({
      label: element.Process,
      value: element.Process + "|" + element.cm_id,
    }))
    : "";

  const setdata = (e) => {
    setCheckVal([]);
    $("#cs").prop("checked", false);
    $("#dr").prop("checked", false);
    $("#mr").prop("checked", false);
    setDataSource(e);
    if (e !== null) {
      var empvalue = e.value;
      empvalue = empvalue.split("-");
      idProcess(empvalue[0]);
    }
  };

  const idProcess = async (empid) => {
    const res = await fetch(`${url}/api/get-report-master-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empid,
      }),
    });
    const data = await res.json();
    //call onchnge
    onChanges(data[0]);

    for (let value of data[1]) {
      if (checkVal.checkVal === undefined) {
        setCheckVal((checkVal) => [...checkVal, value]);
      } else {
        var temp = checkVal.checkVal;
        setCheckVal((checkVal) => [...temp, value]);
      }
      $("#" + value).prop("checked", true);
    }
  };

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

  const getdata = async () => {
    const res = await fetch(`${url}/api/get-active-empid`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setEmp(data);
      }
    }
  };

  const getdata2 = async () => {
    const res = await fetch(`${url}/api/get-active-client`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setProcess(data);
      }
    }
  };

  useEffect(() => {
    getdata();
    getdata2();
    if (tost === "1") {
      toast.success("New Report Mapped Successfully!");
    } else {
    }
    if (er === "1") {
      toast.error("Report Mapping failed!");
    } else {
    }
  }, [tost, er]);

  const checkAssign = async (e) => {
    const { value, checked } = e.target;
    // const { checkValue } = checkVal;
    if (checked) {
      if (checkVal.checkVal === undefined) {
        setCheckVal((checkVal) => [...checkVal, value]);
      } else {
        var temp = checkVal.checkVal;
        setCheckVal((checkVal) => [...temp, value]);
      }
    }
    // Case 2  : The user unchecks the box
    else {
      if (checkVal.checkVal === undefined) {
        setCheckVal({
          checkVal: checkVal.filter((e) => e !== value),
        });
      } else {
        var temp = checkVal.checkVal;
        setCheckVal({
          checkVal: temp.filter((e) => e !== value),
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var empid = dataSource.value.split("-");
    let chkval = checkVal.checkVal;
    const employeeid = empid[0];

    if (checkVal.checkVal === undefined) {
      chkval = checkVal;
    }

    if (!employeeid) {
      return false;
    } else if (Object.values(chkval).length <= 0) {
      alert("please check report type");
      return false;
    } else if (Object.values(selected || {}).length <= 0) {
      alert("please select process");
      return false;
    } else {
      //Getting employeeid to delete the data
      var empl = dataSource.value.split("-");
      const employeeId = empl[0];
      const employeeName = empl[1];
      const postdataDelete = async () => {
        const res = await fetch(`${url}/api/d-master-report-get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
          } else if (res.status === 200) {
            //Inserting the new data for deleted  employeeId
            chkval.map((el) => {
              const report_name = el;
              selected.map((ele) => {
                var a = ele.split("|");
                var b = a[0];
                var c = a[1];
                var d = a[2];
                let r = b.concat("|", c);
                var cm_id = a[3];
                var process = ele;
                const createdBy = isAuth().EmployeeID;
                const postdata1 = async () => {
                  const res = await fetch(`${url}/api/report-master`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      process,
                      employeeId,
                      cm_id,
                      createdBy,
                      report_name,
                      employeeName,
                    }),
                  });
                  const data = await res.json();
                  if (res.status === 422 || !data) {
                    console.log("error ");
                  } else {
                    if (!data) {
                      setEr("1");
                    } else if (res.status === 200) {
                      setToast("1");
                      setDataSource("");
                      setDualList({});
                      $("#selectsheet").val("");
                      setCheckVal({
                        checkValue: "",
                        response: "",
                      });
                      $("#cs").prop("checked", false);
                      $("#dr").prop("checked", false);
                      $("#mr").prop("checked", false);
                      setTimeout(() => {
                        setToast("");
                      }, 200);
                    } else {
                      setEr("1");
                    }
                  }
                };
                postdata1();
              });
            });
          } else {
          }
        }
      };
      postdataDelete();
    }
  };

  if (duallist.selected != null) {
    $("#dynCollection2").attr("disabled", false);
  } else {
    $("#dynCollection2").attr("disabled", true);
  }

  useEffect(() => {
    if (location.state != null) {
      const obj = location.state.split("-")
      const emp2 = obj.reduce(function (result, item, index, array) {
        result["Label"] = array[0] + "-" + array[1];
        result["value"] = array[1] + "-" + array[0];
        return result;

      }, {});
      setTimeout(() => {
        window.history.replaceState({}, document.title)
      }, 1);
      setDataSource(emp2)
      var empvalue = emp2.value;
      empvalue = empvalue.split("-");
      idProcess(empvalue[0]);
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [location])

  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form
              noValidate
              className="needs-validation"
              onSubmit={handleSubmit}
            >
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Report Master Allocation</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-sm-6">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Employee ID :
                          </label>
                          <Select
                            name="employeeid"
                            onChange={setdata}
                            value={
                              dataSource
                                ? options.find((x) => x.value === dataSource.value)
                                : null
                            }
                            style={{ fontSize: "12.4px" }}
                            id="selectsheet"
                            options={options}
                            filterOption={createFilter({ ignoreAccents: false })}
                            components={{ MenuList }}
                            required

                          ></Select>
                          <div className="invalid-feedback">
                            Please choose an EmployeeID.
                          </div>
                        </div>
                        <div className="form-group  col ">
                          <label
                            style={{ fontSize: "11px" }}
                            className="ml-2"
                            htmlFor="xyz"
                          >
                            REPORT TYPE/SHEET :
                          </label>
                          <div className="form-check ml-2">
                            <input
                              className="form-check-input"
                              value="cs"
                              onChange={checkAssign}
                              name="report_name"
                              type="checkbox"
                              id="cs"
                            />
                            <label className="form-check-label">
                              CREATE SHEET
                            </label>
                          </div>
                          <div className="form-check ml-2">
                            <input
                              className="form-check-input"
                              value="dr"
                              onChange={checkAssign}
                              name="report_name"
                              type="checkbox"
                              id="dr"
                            />
                            <label className="form-check-label">
                              DISCRIPTED REPORT
                            </label>
                          </div>
                          <div className="form-check ml-2">
                            <input
                              className="form-check-input"
                              value="mr"
                              onChange={checkAssign}
                              name="report_name"
                              type="checkbox"
                              id="mr"
                            />
                            <label className="form-check-label">
                              MIS REPORT
                            </label>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div
                        // style={{ fontSize: "12.5px" }}
                        className="col-md-12 mt-2"
                      >
                        <div className="row">
                          <legend
                            className="col-md-6  font-weight-bold"
                            style={{ fontSize: "11px" }}
                          >
                            All Process
                          </legend>
                          <legend
                            className="col-md-6 font-weight-bold"
                            style={{ fontSize: "11px" }}
                          >
                            Selected Process
                          </legend>
                        </div>
                        <DualListBox
                          options={opt}
                          selected={selected}
                          onChange={onChanges}
                          name="duallistt"
                          id="dls"
                          canFilter
                          alignActions="top"
                          style={{ fontSize: "12.4px" }}
                          required
                        />
                        <div className="invalid-feedback">
                          Please choose an option.
                        </div>
                      </div>
                      <div>
                        <center>
                          <button
                            type="submit"
                            style={{
                              fontSize: "12px",
                              marginTop: "1.6rem",
                            }}
                            className="btn btn-info btn-sm"
                          >
                            Save
                          </button>
                        </center>
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
    </div>
  );
};

export default DynMaster;
