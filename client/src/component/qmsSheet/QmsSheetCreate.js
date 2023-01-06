import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import '../../css/QmsSheetCreat.css'
const QmsSheetCreate = () => {
  const [dataSource, setDataSource] = useState("");
  const [formValues, setFormValues] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [getMaxMarks, setMaxMarks] = useState('')
  const [getMaxMarksSubpara, setMaxMarksSubpara] = useState('')
  const [subParameters, setSubParameters] = useState([]);
  const [newVal, setNewVal] = useState({ parameters, subParameters });
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  let handleChangeParameter = (i, e) => {
    let newFormValues = [...parameters];
    newFormValues[i][e.target.name] = e.target.value;
    setParameters(newFormValues);
    setNewVal(newFormValues);
  };
  let handleChangeSubParameter = (i, e) => {
    let newFormValues = [...subParameters];
    newFormValues[i][e.target.name] = e.target.value;
    setSubParameters(newFormValues);
    setNewVal(newFormValues);
  };
  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        fieldname: "",
        controltype: "text",
        isnumeric: "No",
        mandatory: "No",
        sel: "na",
      },
    ]);
  };
  let addFormFieldsSubParameters = () => {
    setSubParameters([
      ...subParameters,
      {
        subparameterr: "",
        aliass: "",
        maxmarkss: "",
        opt1s: "",
        opt2s: "",
        opt3s: "",
        opt4s: "",
        nas: "No",
        fatals: "No",
        legends: "",
        attributess: "",
      },
    ]);
  };
  let addFormFieldsParameters = () => {
    setParameters([
      ...parameters,
      {
        parameter: "",
        critical: "No",
        subparameter: "",
        alias: "",
        maxmarks: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        na: "No",
        fatal: "No",
        legend: "",
        attributes: "",
      },
    ]);
  };
  let removeFormFieldsSubParameters = (i) => {
    let newFormValues = [...subParameters];
    newFormValues.splice(i, 1);
    setSubParameters(newFormValues);
  };
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  let removeFormFieldsParameters = (i) => {
    let newFormValues = [...parameters];
    newFormValues.splice(i, 1);
    setParameters(newFormValues);
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
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

  var any = [];
  var param = [];
  var subparam = [];
  //Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    param = parameters;
    subparam = subParameters;
    const { collectionname, process } = dataSource;
    any = formValues;
    
   
    if (!process || !collectionname || !any[0].fieldname || !param[0].parameter || !param[0].subparameter || !param[0].alias ||!param[0].maxmarks || !param[0].opt1 || !param[0].opt2) {
      return false;
    } else {
      const res = await fetch(`/api/createsheet`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          any,
          subparam,
          param,
          collectionname,
          process,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Error Occurred!");
      } else if (res.status === 200) {
        toast.success("Submitted Successfully!");
      } else {
        toast.error("Error Occurred!");
      }
      $("#collectionname").val("")
      $("#select1").val("")
      setDataSource("")
    }
  };

  const keyUp = (e) => {
    e.preventDefault();
    const collectionname = e.target.value;
    const postDataSource = async () => {
      const res = await fetch("/api/get-dynamic-collection-with-name", {
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
        console.log("error");
      } else {
        if (data.length > 0) {
          $("#taken").show();
          $("#avail").hide();
          $(":submit").attr("disabled", true);
        } else {
          $("#avail").show();
          $("#taken").hide();
          $(":submit").removeAttr("disabled");
        }
      }
    };
    postDataSource();
  };

  useEffect(() => {
    xyz();
  }, []);

  const xyz = () => {
    $("#AddMoreHeader").trigger("click", function () {});
    $("#addParameters").trigger("click", function () {});
  };
  // });

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleMaxMark = (e) =>{
    setMaxMarks(e.target.value);
  }

  const handleMaxMarksSubpara= (e) =>{
    setMaxMarksSubpara(e.target.value);
  }

  const handleOpt1 = (e) =>{
    if((parseInt(getMaxMarks))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }

  const handleOpt2 = (e) =>{
    if((parseInt(getMaxMarks))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }

  const handleOpt3 = (e) =>{
    if((parseInt(getMaxMarks))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }

  const handleOpt4 = (e) =>{
    if((parseInt(getMaxMarks))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }

  const handleOpt1Subpara = (e) =>{
    if((parseInt(getMaxMarksSubpara))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }
  const handleOpt2Subpara = (e) =>{
    if((parseInt(getMaxMarksSubpara))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }
  const handleOpt3Subpara = (e) =>{
    if((parseInt(getMaxMarksSubpara))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }
  const handleOpt4Subpara = (e) =>{
    if((parseInt(getMaxMarksSubpara))  >= parseInt(e.target.value) ){
      e.target.value=e.target.value
    }
    else{
      e.target.value=""
    }
  }


  $(function(){
   $(".controlSelect").on('change', function(){
    if($(this).val()==="select"){
      $(".yesnumeric").hide()
    }else{
      $(".yesnumeric").show()
    }
   }) 
  })
  
  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="form" noValidate
              className="needs-validation"
              onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 className="card-title">New Sheet</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-sm-4">
                          <label htmlFor="xyz">Process</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            id="select1"
                            name="process"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            <option >
                              Information Technology|Software
                              Development|Software Development
                            </option>
                            <option>
                              Administration|Administration|Administration
                            </option>
                            <option>Airtel|DTH|L1</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>

                        <div className="col-sm-4">
                          <div className="form-group">
                            <label style={{ fontSize: "12.4px" }} htmlFor="xyz">
                              Sheet Name
                            </label>
                            <span style={{ color: "red" }}>*</span>
                            <input
                              className="form-control form-control-sm"
                              onChange={setdata}
                              id="collectionname"
                              type="text"
                              name="collectionname"
                              style={{ fontSize: "12.4px" }}
                              onKeyUp={keyUp}
                              onKeyDown={handleKeyDown}
                              required
                            />
                            <span
                              id="taken"
                              style={{ color: "red", display: "none" }}
                            >
                              Already Taken!
                            </span>
                            <span
                              id="avail"
                              style={{ color: "green", display: "none" }}
                            >
                              Available!
                            </span>
                            <div className="invalid-feedback">
                            Please input a sheet name.
                          </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ backgroundColor: "#17a2b8", padding: "5px" }}
                        className="button-section row"
                      >
                        <button
                          id="AddMoreHeader"
                          style={{ fontSize: "10px",backgroundColor:'#1f6653', color:'white' }}
                          type="button"
                          className="btn"
                          onClick={() => addFormFields()}
                        >
                          <i
                            className="nav-icon fas fa-plus"
                            style={{ fontSize: "11px" }}
                          />{" "}
                          Add Field
                        </button>
                        <div className="form-group col-sm-10">
                          <marquee
                            behavior="alternate"
                            scrolldelay="180"
                            style={{
                              fontSize: "12.5px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            No need to add (MSISDN,MobileNo,ContactNo,CLI,Bonus)
                          </marquee>
                        </div>
                      </div>

                      {formValues.map((element, index) => (
                        <div key={index}>
                          <div style={{ fontSize: "12.5px" }} id="filter">
                            <div
                              style={{ backgroundColor: "rgb(204 225 229)" }}
                              className="card-body border mt-2"
                            >
                              <div className="row">
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-3"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Fields Name:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="text"
                                    id="fieldname"
                                    value={element.fieldname || ""}
                                    onChange={(e) => handleChange(index, e)}
                                    name="fieldname"
                                    style={{ fontSize: "12.4px" }}
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  <div className="invalid-feedback">
                                    Please choose a fields name.
                                  </div>
                                </div>
                                <div className=" form-group col-sm-3">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Control Type:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <select
                                    name="controltype"
                                    id="controlSelect"
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-control form-control-sm controlSelect"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="text">TextBox</option>
                                    <option value="select">List</option>
                                    <option value="date">Calendar</option>
                                    <option value="datetime-local">
                                      Calendar With Time
                                    </option>
                                  </select>
                                </div>
                                <div className=" form-group col-sm-3">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Is Numeric:
                                  </label>
                                  <select
                                    name="isnumeric"
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option id="yesnumeric" className="yesnumeric" value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className="form-group col-sm-3">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Mandatory:
                                  </label>
                                  <select
                                    name="mandatory"
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          {index ? (
                            <button
                              type="button"
                              style={{ fontSize: "12px" }}
                              className="btn btn-danger mt-2 remove_btn"
                              onClick={() => removeFormFields(index)}
                            >
                              <i
                                className="nav-icon fas fa-minus "
                                style={{ fontSize: "11px" }}
                              />{" "}
                              Remove Field
                            </button>
                          ) : null}
                        </div>
                      ))}

                      {parameters.map((element, index) => (
                        <div key={index}>
                          <div style={{ fontSize: "12.5px" }}>
                            <div
                              style={{ backgroundColor: "rgb(204 225 229)" }}
                              className="card-body border mt-2"
                            >
                              <div className="row">
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-8"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Parameter:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="text"
                                    value={element.parameter || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="parameter"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  <div className="invalid-feedback">
                                    Please choose a parameter.
                                  </div>
                                </div>
                                <div className=" form-group col-sm-1">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Critical:
                                  </label>

                                  <select
                                    name="critical"
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className=" form-group ">
                                  <button
                                    // id="AddMoreHeader"
                                    style={{
                                      fontSize: "11px",
                                    }}
                                    type="button"
                                    className="btn  btn-success mt-4 ml-2 form-control form-control-sm"
                                    onClick={() => addFormFieldsSubParameters()}
                                  >
                                    <i
                                      className="nav-icon fas fa-plus"
                                      style={{ fontSize: "11px" }}
                                    />{" "}
                                    ADD SUB PARAMETER
                                  </button>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-3"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Sub Parameter:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="text"
                                    value={element.subparameter || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="subparameter"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  <div className="invalid-feedback">
                                    Please choose a subparameter.
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-2"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Alias:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="text"
                                    value={element.alias || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    maxLength="50"
                                    name="alias"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  <span style={{ color: "red" }}>
                                    *max length 50
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    MaxMark:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    value={element.maxmarks || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    onKeyUp={handleMaxMark}
                                    style={{ fontSize: "12.4px" }}
                                    name="maxmarks"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-1:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    value={element.opt1 || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    onKeyUp={handleOpt1}
                                    style={{ fontSize: "12.4px" }}
                                    name="opt1"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-2:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    value={element.opt2 || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    onKeyUp={handleOpt2}
                                    style={{ fontSize: "12.4px" }}
                                    name="opt2"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-3:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    value={element.opt3 || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    onKeyUp={handleOpt3}
                                    style={{ fontSize: "12.4px" }}
                                    name="opt3"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-4:
                                  </label>
                                  <span className="text-danger">*</span>
                                  <input
                                    type="number"
                                    value={element.opt4 || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    onKeyUp={handleOpt4}
                                    style={{ fontSize: "12.4px" }}
                                    name="opt4"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div className=" form-group col-sm-1">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    NA:
                                  </label>

                                  <select
                                    name="na"
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className=" form-group col-sm-1">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Fatal:
                                  </label>
                                  <select
                                    name="fatal"
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                    required
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-12"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Legend:
                                  </label>

                                  <input
                                    type="text"
                                    value={element.legend || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="legend"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-12"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Attributes:
                                  </label>
                                  <span style={{ color: "red" }}>
                                    * separated by |
                                  </span>
                                  <textarea
                                    type="text"
                                    value={element.attributes || ""}
                                    onChange={(e) =>
                                      handleChangeParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="attributes"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {index ? (
                            <button
                              type="button"
                              style={{ fontSize: "12px" }}
                              className="btn btn-danger mt-2 remove_btn"
                              onClick={() => removeFormFieldsParameters(index)}
                            >
                              <i
                                className="nav-icon fas fa-minus "
                                style={{ fontSize: "11px" }}
                              />{" "}
                              REMOVE PARAMETERS
                            </button>
                          ) : null}
                        </div>
                      ))}

                      {subParameters.map((element, index) => (
                        <div key={index}>
                          <div style={{ fontSize: "12.5px" }}>
                            <div
                              style={{ backgroundColor: "rgb(204 225 229)" }}
                              className="card-body border mt-2"
                            >
                              <div className="row">
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-3"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Sub Parameter:
                                  </label>
                                  <input
                                    type="text"
                                    value={element.subparameterr || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="subparameterr"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-2"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Alias:
                                  </label>
                                  <input
                                    type="text"
                                    value={element.aliass || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    maxLength="50"
                                    name="aliass"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  <span style={{ color: "red" }}>
                                    *max length 50
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    MaxMarks:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.maxmarkss || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    onKeyUp={handleMaxMarksSubpara}
                                    style={{ fontSize: "12.4px" }}
                                    name="maxmarkss"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-1:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.opt1s || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="opt1s"
                                    onKeyUp={handleOpt1Subpara}
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-2:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.opt2s || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="opt2s"
                                    onKeyUp={handleOpt2Subpara} 
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-3:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.opt3s || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="opt3s"
                                    onKeyUp={handleOpt3Subpara} 
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Opt-4:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.opt4s || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="opt4s"
                                    onKeyUp={handleOpt4Subpara} 
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div className=" form-group col-sm-1">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    NA:
                                  </label>

                                  <select
                                    name="nas"
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className="form-group col-sm-1">
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  >
                                    Fatal:
                                  </label>
                                  <select
                                    name="fatals"
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-12"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Legend:
                                  </label>

                                  <input
                                    type="text"
                                    value={element.legends || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="legends"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-sm-12"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Attributes:
                                  </label>
                                  <span style={{ color: "red" }}>
                                    * separated by |
                                  </span>
                                  <textarea
                                    type="text"
                                    value={element.attributess || ""}
                                    onChange={(e) =>
                                      handleChangeSubParameter(index, e)
                                    }
                                    style={{ fontSize: "12.4px" }}
                                    name="attributess"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {index ? (
                            <button
                              type="button"
                              style={{ fontSize: "12px" }}
                              className="btn btn-danger mt-2 remove_btn"
                              onClick={() =>
                                removeFormFieldsSubParameters(index)
                              }
                            >
                              <i
                                className="nav-icon fas fa-minus "
                                style={{ fontSize: "11px" }}
                              />{" "}
                              REMOVE SUB PARAMETERS
                            </button>
                          ) : null}
                        </div>
                      ))}
                      <div className="button-section">
                        <button
                          // id="AddMoreHeader"
                          style={{ fontSize: "11px" }}
                          type="button"
                          id="addParameters"
                          className="btn  btn-success mt-2"
                          onClick={() => addFormFieldsParameters()}
                        >
                          <i
                            className="nav-icon fas fa-plus"
                            style={{ fontSize: "11px" }}
                          />{" "}
                          ADD PARAMETER
                        </button>
                      </div>
                      <button
                        id="btn"
                        type="submit"
                        style={{ fontSize: "12.4px" }}
                        className="btn btn-primary mt-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <br></br>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default QmsSheetCreate;
