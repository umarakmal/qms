import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { useLocation, NavLink, useHistory } from "react-router-dom";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";

const CalibrationAudit = () => {
  const history = useHistory()
  const location = useLocation();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [sheetData, setSheetData] = useState("");
  const [count, setCount] = useState(["0"]);
  const [fieldData, setFieldData] = useState({});
  const [obtainMarks, setObtainMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [s, sets] = useState("");
  const [percnt, setPercent] = useState({});
  const [attri1, setAttri1] = useState({});
  const [attri2, setAttri2] = useState({});
  const [attri3, setAttri3] = useState({});
  const [remark, setRemark] = useState("");
  const [subParaMarks, setSubParaMarks] = useState("");
  const [subParaAttributes1, setSubParaAttributes1] = useState("");
  const [subParaAttributes2, setSubParaAttributes2] = useState("");
  const [subParaAttributes3, setSubParaAttributes3] = useState("");
  const [subParaRemarks, setSubParaRemarks] = useState("");
  const [calibrationDetails, setCalibrationDetails] = useState([])
 
  const selectOpt = useRef()
  const achts = useRef()
  const callids = useRef()
  const calltypes = useRef()
  const msisdns = useRef()
  const empids = useRef()
  const remarks1 = useRef()
  const attribute1 = useRef()
  const attribute2 = useRef()
  const attribute3 = useRef()
  const maxmarks = useRef()
  const subparamarking = useRef()
  const subparaattributess1 = useRef()
  const subparaattributes2 = useRef()
  const subparaattributes3 = useRef()
  const remark1 = useRef()
  const feedbacks = useRef()
  const wow_call_options = useRef()
  const wow_call_remarks = useRef()
  const ztp_options = useRef()
  const ztp_remarks = useRef()
  const marking_bonus_calls = useRef()
  const option_bonus_calls = useRef()
  const bonus_call_remarks = useRef()
  const fatalcount = useRef()
  const maximummarks = useRef()
  const obtainedmarks = useRef()
  const finalscore = useRef()
const remarks = useRef()
const subParaRemark = useRef()

  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id")
    ? query.get("id")
    : ""
 const sheetid = query.get("sheetid") ? query.get("sheetid"):""
 const auditeeid = query.get("auditeeid") ? query.get("auditeeid"):""
 const call = query.get("call") ? query.get("call"):""
 const  mobile = query.get("mobile") ? query.get("mobile"):""
 const acht = query.get("acht") ? query.get("acht"):""
 const callid = query.get("callid") ? query.get("callid"): ""
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.msisdn) {
      errors.msisdn = "msisdn is required!";
      $("#msisdn").addClass("is-invalid");
    } else if (values.msisdn) {
      $("#msisdn").removeClass("is-invalid");
    }

    if (!values.callid) {
      errors.callid = "callid is required!";
      $("#callid").addClass("is-invalid");
    } else if (values.callid) {
      $("#callid").removeClass("is-invalid");
    }

    if (!values.feedback) {
      errors.feedback = "feedback is required!";
      $("#feedback").addClass("is-invalid");
    } else if (values.feedback) {
      $("#feedback").removeClass("is-invalid");
    }

    return errors;
  };


  const handleChange = (e, field) => {
    setFieldData({
      ...fieldData,
      [field]: e.target.value, //edit
    });
  };

  const handleChangeSelectMarks = (e, i) => {
    const list = { ...s }; //<-- object, not array
    list[i] = e.target.value;
    sets({ ...list })
  };

  const handleChangeSelectMarkss = (e, i) => {
    const list = { ...subParaMarks }; //<-- object, not array
    list[i] = e.target.value;
    setSubParaMarks({ ...list });
  };

  const handleChangeInputAttri1 = (e, i) => {
    const list = { ...attri1 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri1({ ...list });
  };

  const handleChangeInputAttri1s = (e, i) => {
    const list = { ...subParaAttributes1 }; //<-- object, not array
    list[i] = e.target.value;
    setSubParaAttributes1({ ...list });
  };

  const handleChangeInputAttri2 = (e, i) => {
    const list = { ...attri2 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri2({ ...list });
  };
  const handleChangeInputAttri2s = (e, i) => {
    const list = { ...subParaAttributes2 }; //<-- object, not array
    list[i] = e.target.value;
    setSubParaAttributes2({ ...list });
  };

  const handleChangeInputAttri3 = (e, i) => {
    const list = { ...attri3 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri3({ ...list });
  };

  const handleChangeInputAttri3s = (e, i) => {
    const list = { ...subParaAttributes3 }; //<-- object, not array
    list[i] = e.target.value;
    setSubParaAttributes3({ ...list });
  };

  const handleChangeInputRemark = (e, i) => {
    const list = { ...remark }; //<-- object, not array
    list[i] = e.target.value;
    setRemark({ ...list });
  };
  const handleChangeInputRemarks = (e, i) => {
    const list = { ...subParaRemarks }; //<-- object, not array
    list[i] = e.target.value;
    setSubParaRemarks({ ...list });
  };

  let mark = [];
  let percent = [];
  let mark2 = [];
  const handleCheckButton = (e) => {
    e.preventDefault();

    sheetData.map((li) => {
      if (li.subparam.length != 0) {
        //To find sum of obtained marks
        var sum = 0;
        for (var i = 0; i < Object.keys(selectOpt.current.value).length; i++) {
          sum += parseInt(selectOpt.current.value[i]);
        }
        mark.push(sum);

        var sum2 = 0;
        for (var i = 0; i < Object.keys(subparamarking.current.value).length; i++) {
          sum2 += parseInt(subparamarking.current.value[i]);
        }
        var c = parseInt(sum) + parseInt(sum2);
        mark2.push(sum2);
        setObtainMarks(String(c));
        // To find percentage
        var prcnt = (String(c) / finalMarks) * 100;
        percent.push(prcnt);
        setPercent(String(percent).slice(0, 5));
        setTotalMarks(finalMarks);
      } else {
        //To find sum of obtained marks
        var sum = 0;
        for (var i = 0; i < Object.keys(selectOpt.current.value).length; i++) {
          sum += parseInt(selectOpt.current.value[i]);
        }
        mark.push(sum);
        setObtainMarks(String(mark));
        // To find percentage
        var prcnt = (String(mark) / itemList) * 100;
        percent.push(prcnt);
        setPercent(String(percent).slice(0, 5));
        setTotalMarks(itemList);
      }
    });

    // To check fatal count
    sheetData.forEach((el) => {
      el.param.forEach((element) => {
        if (element.fatal === "Yes") {
          setCount(1);
        } else {
        }
      });
    });
  };

  useEffect(()=>{
    const postdata = async () => {
      const  getdynamiccollection  = sheetid;
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
          $("#textbox1").show();
          $("#textbox2").show();
          $("#textbox3").show();
          $("#textbox4").show();
          $("#textbox5").show();
          $("#textbox6").show();
          $("#sheethide").hide();
          setSheetData(data);
        }
      }
    };
    postdata();
    
    const postdata2 = async () => {
      const  sheet_name  = sheetid;
      const employeeid = auditeeid
      const res = await fetch("/api/get-sheetlistdetails-calibration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sheet_name,employeeid
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          
          setCalibrationDetails(data)
          
        }
      }
    };
    setTimeout(()=>{
      postdata2();
    },1000)
    
  },[])
   
  

  const finalHandleSubmit = (e) => {
    e.preventDefault();

   var callid = (callids.current.value);  
   var msisdn = (msisdns.current.value); 
   var employeeid = (empids.current.value); 
   var attri1 = (attribute1.current.value);
   var attri2 = (attribute2.current.value);
   var attri3 = (attribute3.current.value);
   var inputFields = selectOpt.current.value
   
   var subParaMarks = subparamarking.current.value
   
   var subParaAttributes1 = (subparaattributess1.current.value);
   var subParaAttributes2 = (subparaattributes2.current.value);
   var subParaAttributes3 = (subparaattributes3.current.value);
   var feedback = (feedbacks.current.value)                                                              
    let totalmarks = totalMarks[0];
   var obtainMarks = (obtainedmarks.current.value);
   var maximumMarks = (maximummarks.current.value);
   var fatalCount = (fatalcount.current.value);
   var sheet_name = sheetid
   var bonus_call_remark = (bonus_call_remarks.current.value);
   var option_bonus_call = (option_bonus_calls.current.value);
   var marking_bonus_call = (marking_bonus_calls.current.value);
   var ztp_remark = (ztp_remarks.current.value);
   var ztp_option = (ztp_options.current.value);
   var wow_call_remark = (wow_call_remarks.current.value);
   var  wow_call_option=(wow_call_options.current.value);
    let counts = count[0];
    var remark = remarks.current.value
    var subParaRemarks = subParaRemark.current.value
  
    setFormErrors(validate(sheet_name));
    setIsSubmit(true);

    if (!msisdn || !feedback || !callid ) {
      return false;
    } else {
    
      const postdata1 = async () => {
        const res1 = await fetch("/api/sheet-list-submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalmarks,
            inputFields,
            sheet_name,
            attri1,
            attri2,
            attri3,
            obtainMarks,
            percnt,
            employeeid,
            wow_call_option,
            ztp_option,
            ztp_remark,
            callid,
            feedback,
            remark,
            msisdn,
            option_bonus_call,
            fieldData,
            counts,
            marking_bonus_call,
            bonus_call_remark,
            wow_call_remark,
            parameter,
            subparameter,
            subParaMarks,
            subParaAttributes1,
            subParaAttributes2,
            subParaAttributes3,
            subParaRemarks,
            fatalCount,
            maximumMarks,
            remark
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          toast.success("Successfully Saved!");
          history.push("/calibration-view", {state: "Successfully Calibrated!"})
        } else {
          toast.error("Something went wrong");
        }
      };

    //Insert data into calibration status
     const auditor_id = "CE90980192"
      const postdataCalibrationStatus = async () => {
        const res1 = await fetch("/api/calibration-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sheetid,auditeeid,auditor_id
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          console.log("Success");
        } else {
          toast.error("Something went wrong");
        }
      };

        //Update audit status into calibration Assignment
        const updateCalibrationAssignment = async () => {
          const res1 = await fetch("/api/update-calibration-assignment", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id
            }),
          });

          const data1 = await res1.json();
          if (res1.status === 422 || !data1) {
            toast.error("something went wrong");
          } else if (res1.status === 200) {
            console.log("Success");
          } else {
            toast.error("Something went wrong");
          }
        };


      postdata1();
      postdataCalibrationStatus()
      updateCalibrationAssignment()
    }
  };

  $(function () {
    $("#option1").on("change", function () {
      if ($(this).val() === "no") {
        $("#inputoption").hide();
      } else if ($(this).val() === "yes") {
        $("#inputoption").show();
      }
    });

    $("#option2").on("change", function () {
      if ($(this).val() === "no") {
        $("#inputoption1").hide();
      } else if ($(this).val() === "yes") {
        $("#inputoption1").show();
      }
    });

    $("#option3").on("change", function () {
      if ($(this).val() === "no") {
        $("#inputoption2").hide();
      } else if ($(this).val() === "yes") {
        $("#inputoption2").show();
      }
    });

    

    $("#selectsheet").on("change", function () {
      if ($(this).val() === "Select") {
        $("#textbox1").hide();
        $("#textbox2").hide();
        $("#textbox3").hide();
        $("#textbox4").hide();
        $("#textbox5").hide();
        $("#textbox6").hide();
      }
    });
    if (indx === 0) {
      console.log("0 hai");
    }
  });
  let itemList = [];
  let parameter = [];
  let subparameter = [];
  let subparameter2 = [];
  let maxMarks2 = [];
  let finalMarks = [];
  let indx = [];
  let mark1 = []


  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row">
                      <div className="col">
                      <h4 className="card-title mt-2" style={{fontSize:'14px'}}> Evaluation Form-<span>{sheetid}</span></h4>
                      </div>
                      <div className="col">
                      <NavLink
                        style={{
                          color: "#2980b9",
                          fontWeight: "bolder",
                          color:"white",
                          fontSize:"13px"
                        }}
                        to="/calibration-view"
                        className="btn btn-dark offset-7"
                      >
                        <i
                          style={{ marginRight: "5px" }}
                          className="nav-icon fas fa-arrow-left"
                        />
                        Back to Calibration View
                      </NavLink></div>
                    </div>
                    </div>
                    <div className="card-body">
                      <div
                        className="row mt-2"
                        id="textbox6"
                        style={{
                          border: "solid #4b4e4e 1px",
                          backgroundColor: "rgb(204 225 229)",
                          display: "none",
                        }}
                      >
                        <div className="form-group col-sm-3">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Impact/Emp ID:
                          </label>
                          <select
                            name="employeeid"
                            id="employeeid"
                            ref={empids}
                            defaultValue={auditeeid?auditeeid:null}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                          >
                            <option defaultValue="">Select</option>
                            <option value="CE331221222">xyz-CE331221222</option>
                            <option value="CE022232233">abc-CE022232233</option>
                            <option value="CE032291876">Tom-CE032291876</option>
                          </select>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              MSISDN:
                            </label>
                            <span className="text-danger">*</span>
                            <input
                              className="form-control form-control-sm"
                              // onChange={setdata}
                              ref={msisdns}
                              type="number"
                              name="msisdn"
                              id="msisdn"
                              defaultValue={mobile?mobile:null}
                              style={{ fontSize: "12.4px" }}
                            />
                            <p className="text-danger">{formErrors.msisdn}</p>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              CALL ID:
                            </label>
                            <span className="text-danger">*</span>
                            <input
                              className="form-control form-control-sm"
                              // onChange={setdata}
                              ref={callids}
                              type="text"
                              defaultValue={callid?callid:null}
                              name="callid"
                              id="callid"
                              style={{ fontSize: "12.4px" }}
                            />
                            <p className="text-danger">{formErrors.callid}</p>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              CALL TYPE:
                            </label>
                            <span className="text-danger">*</span>
                            <input
                              className="form-control form-control-sm"
                              // onChange={setdata}
                              ref={calltypes}
                              type="text"
                              name="calltype"
                              defaultValue={call?call:null}
                              id="calltype"
                              style={{ fontSize: "12.4px" }}
                            />
                          
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              ACHT:
                            </label>
                            <span className="text-danger">*</span>
                            <input
                              className="form-control form-control-sm"
                              // onChange={setdata}
                              ref={achts}
                              type="text"
                              name="acht"
                              defaultValue={acht?acht:null}
                              id="acht"
                              style={{ fontSize: "12.4px" }}
                            />
                           
                          </div>
                        </div>
                       
                        {sheetData
                          ? sheetData.map((resp) => {
                            
                              return resp.any.map((element) => {
                                if (element.controltype === "select") {
                                  var p = [];

                                  p = element.sel.split(",");
                                  return (
                                    <div
                                      id="selectoption"
                                      
                                      className="form-group col-sm-3 "
                                    >
                                      <label
                                        style={{ fontSize: "11px" }}
                                        className="form-label text-capitalize"
                                        
                                      >
                                        {element.fieldname}
                                      </label>
                                      <select
                                        
                                        style={{ fontSize: "12.4px" }}
                                        name={element.fieldname}
                                        className="form-control form-control-sm"
                                        onChange={(e) => {
                                          handleChange(e, element.fieldname);
                                        }}
                                        // value={fieldData[resp.fieldname]}
                                      >
                                        <option>Select</option>
                                        {p
                                          ? p.map((el) => {
                                              return <option>{el}</option>;
                                            })
                                          : ""}
                                      </select>
                                    </div>
                                  );
                                } else if (
                                  element.isnumeric === "Yes" &&
                                  element.controltype === "text"
                                ) {
                                  return (
                                    <div
                                      className="form-group col-sm-3"
                                      key={element._id}
                                      // style={{ display: "none" }}
                                    >
                                      <label
                                        style={{ fontSize: "11px" }}
                                        className="form-label text-capitalize"
                                        key={element._id + "46484"}
                                      >
                                        {element.fieldname}
                                      </label>
                                      <input
                                        key={element._id + "98698"}
                                        type="number"
                                        style={{ fontSize: "12.4px" }}
                                        name={element.fieldname}
                                        className="form-control form-control-sm"
                                        onChange={(e) => {
                                          handleChange(e, element.fieldname);
                                        }}
                                        // value={fieldData[resp.fieldname]}
                                      />
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      className="form-group col-sm-3"
                                      key={element._id}
                                      // style={{ display: "none" }}
                                    >
                                      <label
                                        style={{ fontSize: "11px" }}
                                        className="form-label text-capitalize"
                                        key={element._id + "46484"}
                                      >
                                        {element.fieldname}
                                      </label>
                                      <input
                                        key={element._id + "98698"}
                                        type={element.controltype}
                                        style={{ fontSize: "12.4px" }}
                                        name={element.fieldname}
                                        className="form-control form-control-sm"
                                        onChange={(e) => {
                                          handleChange(e, element.fieldname);
                                        }}
                                        // value={fieldData[resp.fieldname]}
                                      />
                                    </div>
                                  );
                                }
                              });
                            })
                          : ""}
                      </div>
                      <div
                        className="row mt-2"
                        id="textbox1"
                        style={{
                          border: "solid #4b4e4e 1px",
                          display: "none",
                          backgroundColor: "rgb(204 225 229)",
                        }}
                      >
                        {sheetData
                          ? sheetData.map((element) => {
                              let addMaxMartks = 0;
                              for (var i = 0; i < element.param.length; i++) {
                                addMaxMartks += parseInt(
                                  element.param[i].maxmarks
                                );
                              }
                              itemList.push(addMaxMartks);

                              //For subparameter total marks addition
                              let addMaxMarks2 = 0;
                              for (
                                var i = 0;
                                i < element.subparam.length;
                                i++
                              ) {
                                addMaxMarks2 += parseInt(
                                  element.subparam[i].maxmarkss
                                );
                              }
                              maxMarks2.push(addMaxMarks2);
                              finalMarks.push(
                                parseInt(maxMarks2) + parseInt(itemList)
                              );

                              // itemList.push(
                              //   parseInt(maxMarks2) + parseInt(itemList)
                              // );
                              return element.param.map((el, i) => {
                                if (element.subparam.length === 0) {
                                  var x = [];
                                  x = el.attributes.split("|");
                                  parameter.push(el.parameter);
                                  subparameter.push(el.subparameter);

                                  return (
                                    <div
                                      style={{ backgroundColor: "rgb(204 225 229)" }}
                                      className="card-body mt-2"
                                    >
                                      <div className="row ">
                                        <div
                                          style={{
                                            fontSize: "12.4px",
                                          }}
                                          className="form-group col-sm-2"
                                        >
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="exampleInputEmail"
                                          >
                                            {el.parameter}
                                          </label>
                                          <p>{el.subparameter}</p>
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "12.4px",
                                          }}
                                          className="form-group col-sm-1"
                                        >
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="exampleInputEmail"
                                          >
                                            Max Marks:
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              el.maxmarks ? el.maxmarks : ""
                                            }
                                            ref={maxmarks}
                                            style={{ fontSize: "12.4px" }}
                                            name="maxmarks"
                                            className="form-control form-control-sm"
                                            aria-describedby="emailHelp"
                                            readOnly
                                          />
                                        </div>

                            { calibrationDetails ? calibrationDetails.map((elems)=>{ 
                              return <>
                                    <div className=" form-group col-sm-1">
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="xyz"
                                          >
                                            Marking:
                                          </label>
                                          <span className="text-danger">*</span>
                                          <select
                                            name="marking"
                                            id="marking"
                                            defaultValue={elems?elems.marks[0]:null}
                                            // onChange={(e) =>
                                            //   handleChangeSelectMarks(e, i)
                                            // }
                                            ref={selectOpt}
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                          >
                                            <option >
                                              Select
                                            </option>
                                            <option>{el.opt1}</option>
                                            <option>{el.opt2}</option>
                                            <option>{el.opt3}</option>
                                            <option>{el.opt4}</option>
                                          </select>
 
                                          <p
                                            id="errmark"
                                            style={{ display: "none" }}
                                            className="text-danger"
                                          >
                                            required!
                                          </p>
                                          
                                        </div>
                                        

                                        <div className=" form-group col-sm-2">
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="xyz"
                                          >
                                            Attribute 1:
                                          </label>
                                          <select
                                            name="attributes1"
                                            // onChange={(e) =>
                                            //   handleChangeInputAttri1(e, i)
                                            // }
                                            defaultValue={elems? elems.attributes1[0]:null}
                                            ref={attribute1}
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                          >
                                            <option defaultValue="">
                                              Select
                                            </option>
                                            {x.map((ind) => {
                                                return <option >{ind}</option>; })}
                                          </select>
                                        </div>
                                        <div className=" form-group col-sm-2">
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="xyz"
                                          >
                                            Attribute 2:
                                          </label>
                                          <select
                                            name="attribute2"
                                            // onChange={(e) =>
                                            //   handleChangeInputAttri2(e, i)
                                            // }
                                            defaultValue={elems?elems.attributes2[0]:null}
                                            ref={attribute2}
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                          >
                                            <option defaultValue="">
                                              Select
                                            </option>
                                            {x.map((ind) => {
                                              return <option>{ind}</option>;
                                            })}
                                          </select>
                                        </div>
                                        <div className=" form-group col-sm-2">
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="xyz"
                                          >
                                            Attribute 3:
                                          </label>
                                          <select
                                            name="attribute3"
                                            // onChange={(e) =>
                                            //   handleChangeInputAttri3(e, i)
                                            // }
                                            defaultValue={elems? elems.attributes3[0]:null}
                                            ref={attribute3}
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                          >
                                            <option defaultValue="">
                                              Select
                                            </option>
                                            {x.map((ind) => {
                                              return <option>{ind}</option>;
                                            })}
                                          </select>
                                        </div>
                                         </> }):null} 
                                        <div
                                          style={{ fontSize: "12.4px" }}
                                          className="form-group col-sm-2"
                                        >
                                          <label
                                            style={{ fontSize: "11px" }}
                                            htmlFor="exampleInputEmail"
                                          >
                                            Remark:
                                          </label>
                                          <input
                                            type="text"
                                            // onChange={(e) =>
                                            //   handleChangeInputRemark(e, i)
                                            // }
                                            ref={remarks}
                                            style={{ fontSize: "12.4px" }}
                                            name="remark"
                                            className="form-control form-control-sm"
                                            aria-describedby="emailHelp"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                } else {
                                  return element.subparam.map((m, y) => {
                                    indx.push(y);
                                    var x = [];
                                    x = el.attributes.split("|");
                                    var z = [];
                                    z = m.attributess.split("|");
                                    parameter.push(el.parameter);
                                    subparameter.push(el.subparameter);
                                    subparameter2.push(m.subparameterr);
                                    return (
                                      <div
                                        style={{ backgroundColor: "rgb(204 225 229)" }}
                                        className="card-body mt-2"
                                      >
                                        <div className="row ">
                                          <div
                                            style={{
                                              fontSize: "12.4px",
                                            }}
                                            className="form-group col-sm-2"
                                          >
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="exampleInputEmail"
                                            >
                                              {el.parameter}
                                            </label>
                                            <p>{el.subparameter}</p>

                                            <p>{m.subparameterr}</p>
                                            {/* if (element.subparam[0] != null) {
                                            return <p>{ind.subparameterr}</p>;
                                          }
                                        })} */}
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "12.4px",
                                            }}
                                            className="form-group col-sm-1"
                                          >
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="exampleInputEmail"
                                            >
                                              Max Marks:
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                el.maxmarks ? el.maxmarks : ""
                                              }
                                              ref={maxmarks}
                                              style={{ fontSize: "12.4px" }}
                                              name="maxmarks"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                              readOnly
                                            />
                                            <input
                                              type="text"
                                              value={
                                                m.maxmarkss ? m.maxmarkss : ""
                                              }
                                              ref={maxmarks}
                                              style={{ fontSize: "12.4px" }}
                                              name="maxmarkss"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                              readOnly
                                            />
                                          </div>
                                          { calibrationDetails? calibrationDetails.map((elem)=>{  
                                        return <>
                                          <div className=" form-group col-sm-1">
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="xyz"
                                            >
                                              Marking:
                                            </label>
                                            <span className="text-danger">
                                              *
                                            </span>
                                            <select
                                              name="marking"
                                              id="marking"
                                              defaultValue={elem?elem.marks[0]:null}
                                              ref={selectOpt}
                                              // onChange={(e) =>
                                              //   handleChangeSelectMarks(e, i)
                                              // }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              <option>{el.opt1}</option>
                                              <option>{el.opt2}</option>
                                              <option>{el.opt3}</option>
                                              <option>{el.opt4}</option>
                                            </select>
                                            <select
                                              name="marking"
                                              id="marking"
                                              // onChange={(e) =>
                                              //   handleChangeSelectMarkss(e, i)
                                              // }
                                              ref={subparamarking}
                                              defaultValue={elem?elem.subParaMarks[0]:null}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              <option>{m.opt1s}</option>
                                              <option>{m.opt2s}</option>
                                              <option>{m.opt3s}</option>
                                              <option>{m.opt4s}</option>
                                            </select>
                                            <p
                                              id="errmark"
                                              style={{ display: "none" }}
                                              className="text-danger"
                                            >
                                              required!
                                            </p>
                                          </div>
                                         </>  }):null} 
                                           { calibrationDetails ? calibrationDetails.map((ele)=>{
                                          return <> 
                                         <div className=" form-group col-sm-2">
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="xyz"
                                            >
                                              Attribute 1:
                                            </label>
                                            <select
                                              name="attributes1"
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri1(e, i)
                                              // }
                                              ref={attribute1}
                                              defaultValue={ele? ele.attributes1[0]: null}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {x.map((ind) => {
                                                return <option >{ind}</option>;
                                                
                                              })}
                                            </select>
                                            <select
                                              name="attributes1s"
                                              ref={subparaattributess1}
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri1s(e, i)
                                              // }
                                              defaultValue={ele? ele.subParaAttributes1[0]:null}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {z.map((data) => {
                                                return <option>{data}</option>;
                                              })}
                                            </select>
                                          </div>
                                           
                                          <div className=" form-group col-sm-2">
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="xyz"
                                            >
                                              Attribute 2:
                                            </label>
                                            <select
                                              name="attribute2"
                                              defaultValue={ele? ele.attributes2[0]:null}
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri2(e, i)
                                              // }
                                              ref={attribute2}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {x.map((ind) => {
                                                return <option>{ind}</option>;
                                              })}
                                            </select>
                                            <select
                                              name="attributes2s"
                                              defaultValue={ele? ele.subParaAttributes2[0]:null}
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri2s(e, i)
                                              // }
                                              ref={subparaattributes2}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {z.map((data) => {
                                                return <option>{data}</option>;
                                              })}
                                            </select>
                                          </div>
                                          
                                          <div className=" form-group col-sm-2">
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="xyz"
                                            >
                                              Attribute 3:
                                            </label>
                                            <select
                                              name="attribute3"
                                              defaultValue={ele? ele.attributes3[0]:null}
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri3(e, i)
                                              // }
                                              ref={attribute3}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {x.map((ind) => {
                                                return <option>{ind}</option>;
                                              })}
                                            </select>
                                            <select
                                              name="attributes3s"
                                              defaultValue={ele? ele.subParaAttributes3[0]:null}
                                              // onChange={(e) =>
                                              //   handleChangeInputAttri3s(e, i)
                                              // }
                                              ref={subparaattributes3}
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {z.map((data) => {
                                                return <option>{data}</option>;
                                              })}
                                            </select>
                                          </div>
                                          </>
                                          }):null
                                        }
                                          <div
                                            style={{ fontSize: "12.4px" }}
                                            className="form-group col-sm-2"
                                          >
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="exampleInputEmail"
                                            >
                                              Remark:
                                            </label>
                                            <input
                                              type="text"
                                              // onChange={(e) =>
                                              //   handleChangeInputRemark(e, i)
                                              // }
                                              ref={remarks}
                                              style={{ fontSize: "12.4px" }}
                                              name="s"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                            />
                                            <input
                                              type="text"
                                              // onChange={(e) =>
                                              //   handleChangeInputRemarks(e, i)
                                              // }
                                              ref={subParaRemark}
                                              style={{ fontSize: "12.4px" }}
                                              name="remarks"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  });
                                }
                              });
                            })
                          : ""}
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                        {calibrationDetails ? calibrationDetails.map((index)=>{
                          return <>
                          <div
                            className="row mt-1 col-md-12"
                            id="textbox2"
                            style={{
                              backgroundColor: "rgb(204 225 229)",
                              border: "solid #4b4e4e 1px",
                              
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              className="form-group col-sm-2"
                            >
                              <label
                                style={{
                                  fontSize: "11px",
                                }}
                                htmlFor="exampleInputEmail"
                              >
                                WOW Call:
                              </label>

                              <p>It is wow call.</p>
                            </div>
                              <div className=" form-group col-sm-2">
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Option:
                              </label>
                              <select
                                name="wow_call_option"
                                id="option1"
                                defaultValue={index?index.wow_call_option:null}
                                ref={wow_call_options}
                                className="form-control form-control-sm"
                                style={{ fontSize: "12.4px" }}
                              >
                                <option defaultValue="">Select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                              </select>
                            </div>
                           
                            <div
                              style={{ fontSize: "12.4px", display: "none" }}
                              className="form-group col-sm-5"
                              id="inputoption"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="xyz"
                              ></label>
                              <input
                                type="text"
                                // value={element.parameter || ""}
                                ref={wow_call_remarks}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="wow_call_remark"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                          <div
                            className="row mt-1 col-md-12"
                            id="textbox3"
                            style={{
                              
                              backgroundColor: "rgb(204 225 229)",
                              border: "solid #4b4e4e 1px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              // border-bottom: solid #4b4e4e  1px;
                              className="form-group col-sm-2"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="exampleInputEmail"
                              >
                                ZTP:
                              </label>
                              <p>It is ZTP.</p>
                            </div>
                            <div className=" form-group col-sm-2">
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Option:
                              </label>
                              <select
                                name="ztp_option"
                                ref={ztp_options}
                                defaultValue={index.ztp_option}
                                className="form-control form-control-sm"
                                id="option2"
                                style={{ fontSize: "12.4px" }}
                              >
                                <option defaultValue="">Select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                              </select>
                            </div>
                            <div
                              style={{ fontSize: "12px", display: "none" }}
                              className="form-group col-sm-5"
                              id="inputoption1"
                            >
                              <label
                                style={{ fontSize: "12.4px" }}
                                htmlFor="xyz"
                              ></label>
                              <input
                                type="text"
                                ref={ztp_remarks}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="ztp_remark"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                          
                          <div
                            className="row mt-1 col-md-12"
                            id="textbox4"
                            style={{
                            
                              border: "solid #4b4e4e 1px",
                              backgroundColor: "rgb(204 225 229)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              className="form-group col-sm-2"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="exampleInputEmail"
                              >
                                Bonus:
                              </label>
                              <p>It is Bonus call.</p>
                            </div>
                            <div className=" form-group col-sm-2">
                              <label
                                style={{
                                  fontSize: "11px",
                                }}
                                htmlFor="xyz"
                              >
                                Marking:
                              </label>
                              <select
                                name="marking_bonus_call"
                                ref={marking_bonus_calls}
                                className="form-control form-control-sm"
                                style={{ fontSize: "12.4px" }}
                              >
                                <option defaultValue="0">0</option>
                              </select>
                            </div>
                            <div className=" form-group col-sm-2">
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Option:
                              </label>
                              <select
                                name="option_bonus_call"
                                id="option3"
                                ref={option_bonus_calls}
                                defaultValue={index?index.option_bonus_call:null}
                                className="form-control form-control-sm"
                                style={{ fontSize: "12.4px" }}
                              >
                                <option defaultValue="">Select</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                              </select>
                            </div>
                            <div
                              style={{
                                fontSize: "12.4px",
                                display: "none",
                              }}
                              className="form-group col-sm-5"
                              id="inputoption2"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="xyz"
                              ></label>
                              <input
                                type="text"
                                ref={bonus_call_remarks}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="bonus_call_remark"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                          </>
                        }):null}
                        </div>
                        <div
                          className="col-md-4 mt-1"
                          id="textbox5"
                          style={{
                            float: "right",
                            border: "solid #4b4e4e 1px",
                            backgroundColor: "rgb(204 225 229)",
                            display: "none",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-10 mt-2"
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
                              ref={feedbacks}
                              style={{ fontSize: "12.4px" }}
                              name="feedback"
                              id="feedback"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                            />
                            <p className="text-danger">{formErrors.feedback}</p>
                          </div>
                          <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-10"
                          >
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Fatal Count:
                            </label>
                            <input
                              type="text"
                              ref={fatalcount}
                              value={count ? count : ""}
                              style={{ fontSize: "12.4px", marginTop: "8px" }}
                              name="fatalcount"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              readOnly
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-10"
                          >
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Maximum Marks:
                            </label>
                            <input
                              type="text"
                              id="maxmarks"
                              ref={maximummarks}
                              value={totalMarks ? totalMarks : ""}
                              style={{ fontSize: "12.4px", marginTop: "8px" }}
                              name="maximummarks"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              readOnly
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-10"
                          >
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Obtained Marks:
                            </label>
                            <input
                              type="text"
                              ref={obtainedmarks}
                              value={obtainMarks ? obtainMarks : ""}
                              style={{ fontSize: "12.4px", marginTop: "8px" }}
                              name="obtainedmarks"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              readOnly
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "12.4px",
                            }}
                            className="form-group col-sm-10"
                          >
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Final Score:
                            </label>
                            <input
                              type="text"
                              ref={finalscore}
                              value={percnt ? percnt + "%" : ""}
                              style={{ fontSize: "12.4px", marginTop: "8px" }}
                              name="finalscore"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              readOnly
                            />
                          </div>
                          <div className="row offset-3">
                            <button
                              type="click"
                              onClick={handleCheckButton}
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              }}
                              className="btn btn-primary form-group "
                            >
                              CHECK
                            </button>
                            <button
                              type="submit"
                              id="submitbutton"
                              onClick={finalHandleSubmit}
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              
                              }}
                              className="btn btn-primary form-group ml-2"
                            >
                              SUBMIT
                            </button>
                          </div>
                        </div>
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

export default CalibrationAudit;
