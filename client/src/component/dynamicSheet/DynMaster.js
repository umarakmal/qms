import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const DynMaster = () => {

    const [emp, setEmp] = useState([]);
    const [process, setProcess] = useState([]);
    const [dataSource, setDataSource] = useState("")        
    const [duallist, setDualList] = useState({});
    const [tost, setToast] = useState("");
    const [er,setEr] = useState("")
    const [checkVal, setCheckVal] = useState([]);
    let { selected } = duallist;
    var m = [];
    m.push(selected);

    const onChanges = (selected) => {
        setDualList({ selected });
    };


    const opt = process
        ? process.map((element) => ({
            label: element.Process,
            value: element.Process +"|"+element.cm_id,
        }))
        : "";

    const setdata = (e) => {
        setCheckVal([]);
        $("#cs").prop("checked", false);
        $("#dr").prop("checked", false);
        $("#mr").prop("checked", false);
        const { name, value } = e.target;
        setDataSource((dataSource) => {
          return {
            ...dataSource,
            [name]: value,
          };
        });
        if (e.target.name === "employeeid") {
            var empvalue = e.target.value;
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
            if(checkVal.checkVal === undefined)
            {
                setCheckVal(checkVal => [...checkVal, value]);
            }
            else
            {
              var temp = checkVal.checkVal;
              setCheckVal(checkVal => [...temp, value]);
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
            }
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            if(data.length>0){
                setEmp(data);
            }
        }
    };

    const getdata2 = async () => {
        const res = await fetch(`${url}/api/get-active-client`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            console.log("error ");
        } else {
            if(data.length>0){
                setProcess(data);
            }
        }
    };

    useEffect(() => {
        getdata();
        getdata2()
        if(tost === "1"){
            toast.success("New Report Mapped Successfully!");
            
        }else {
           
        }
        if(er === "1"){
            toast.error("Report Mapping failed!");
        }else {
           
        }
    }, [tost,er]);

       
    const checkAssign = async(e)=>{
        const { value, checked } = e.target;
        // const { checkValue } = checkVal;
        if (checked) {
            if(checkVal.checkVal === undefined)
            {
                setCheckVal(checkVal => [...checkVal, value]);
            }
            else
            {
              var temp = checkVal.checkVal;
                setCheckVal(checkVal => [...temp, value]);
            }
          }
           // Case 2  : The user unchecks the box
          else {
            if(checkVal.checkVal === undefined)
            {
               setCheckVal({
              checkVal: checkVal.filter((e) => e !== value),
            });
            }
            else
            {
              var temp = checkVal.checkVal;
                setCheckVal({
                  checkVal: temp.filter((e) => e !== value),
                });
            }
          }
     
      }


    const handleSubmit = (e) => {
        e.preventDefault();
        
    const {employeeid} = dataSource
    let chkval = checkVal.checkVal;

    if(checkVal.checkVal === undefined)
    {
        chkval = checkVal;
    }
    
        if (!employeeid ) {
            return false
        } 
        else if(Object.values(chkval).length <= 0){
            alert("please check report type")
            return false
        } else if(Object.values(selected || {}).length <= 0){
            alert("please select process")
            return false
        }
        else {
 //Getting employeeid to delete the data 
            var empl = employeeid.split('-')
            const employeeId = empl[0]
            const employeeName = empl[1]
            const postdataDelete = async () => {
                const res = await fetch(`${url}/api/d-master-report-get`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        employeeId
                    }),
                });
                const data = await res.json();
                if (res.status === 422 || !data) {
                    console.log("error ");
                } else {
                    if (!data) {
                       
                    } else if (res.status === 200) {
 //Inserting the new data for deleted  employeeId
            chkval.map((el=>{
                const report_name = el
                selected.map((ele)=>{
                    var a = ele.split('|')
                    var b = a[0]
                    var c = a[1]
                    var d = a[2]
                    let r = b.concat("|",c);
                    var cm_id = a[3]
                    var process = ele
                        const createdBy = isAuth().EmployeeID
                            const postdata1 = async () => {
                                const res = await fetch(`${url}/api/report-master`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        process,employeeId,cm_id,
                                        createdBy,report_name,employeeName
                                    }),
                                });
                                const data = await res.json();
                                if (res.status === 422 || !data) {
                                    console.log("error ");
                                } else {
                                    if (!data) {
                                        setEr("1")
                                    } else if (res.status === 200) {
                                        setToast("1")
                                        setDataSource("")
                                        setDualList({})
                                        $("#selectsheet").val("")
                                        setCheckVal({
                                            checkValue: "",
                                            response: "",
                                          });
                                        $('#cs').prop('checked', false); 
                                        $('#dr').prop('checked', false); 
                                        $('#mr').prop('checked', false); 
                                        setTimeout(() => {
                                            setToast("")
                                        }, 200);
                                    } else {
                                        setEr("1")
                                    }
                                }
                            };
                            postdata1();
                })
           
            }))
                    } else {
                       
                    }
                }
            };
            postdataDelete();
        }
    };


    if (duallist.selected != null) {
        $("#dynCollection2").attr('disabled', false)
    } else {
        $("#dynCollection2").attr('disabled', true)
    }

    return (
        <div>
            <Header />
            <Menu />
            <ToastContainer />
            <div className="content-wrapper">
                <section className="content ">
                    <div className="container-fluid ">
                        <form noValidate
                            className="needs-validation" onSubmit={handleSubmit}>
                            <div className="row mt-2">
                                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                                    <div className="card card-info mt-3">
                                        <div className="card-header">
                                            <h3 className="card-title">Report Master Allocation</h3>
                                        </div >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-sm-6">
                                                    <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                                        Employee ID :
                                                    </label>
                                                    <select
                                                        name="employeeid"
                                                        onChange={setdata}
                                                        className="form-control form-control-sm"
                                                        style={{ fontSize: "12.4px" }}
                                                        id="selectsheet"
                                                        required
                                                    >
                                                        <option value="">Select</option>
                                                        {emp
                                                            ? emp.map((element) => {
                                                                return (
                                                                    <option
                                                                        value={element.EmployeeID + "-" + element.EmployeeName}
                                                                        key={element.EmployeeID + "jhyu"}
                                                                    >
                                                                        {element.EmployeeName + "-" + element.EmployeeID}
                                                                    </option>
                                                                );
                                                            })
                                                            : ""}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        Please choose an EmployeeID.
                                                    </div>
                                                </div>
                                                <div className="form-group  col ">
                                                    <label style={{ fontSize: "11px" }} className="ml-2" htmlFor="xyz">
                                                        REPORT TYPE/SHEET : 
                                                    </label>
                                                    <div className="form-check ml-2">
                                                        <input className="form-check-input" value="cs" onChange={checkAssign} name="report_name" type="checkbox" id="cs"/>
                                                        <label className="form-check-label">CREATE SHEET</label>
                                                    </div>
                                                    <div className="form-check ml-2">
                                                        <input className="form-check-input" value="dr" onChange={checkAssign} name="report_name" type="checkbox" id="dr"/>
                                                        <label className="form-check-label">DISCRIPTED REPORT</label>
                                                    </div>
                                                    <div className="form-check ml-2">
                                                        <input className="form-check-input" value="mr" onChange={checkAssign} name="report_name" type="checkbox" id="mr" />
                                                        <label className="form-check-label">MIS REPORT</label>
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
