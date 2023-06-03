import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { ToastContainer } from "react-toastify";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const url = `${process.env.REACT_APP_BACKEND_URL}`
const AgentSheetView = () => {
  const [sheetData, setSheetData] = useState("");
  const [calibrationDetails, setCalibrationDetails] = useState([])
  const [getEmpId, setEmpId] = useState([])
  const [getAuditorRemark, setAuditorRemark] = useState("")
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [finalScore, setFinalScore] = useState("");
  const [maxMark, setMaxMark] = useState("");
  const [fatal, setFatal] = useState("");
  const [isFatal, setIsFatal] = useState("")
  const [fieldDynamic, setFieldDynamic] = useState("")
  const [emails, setEmails] = useState("")

  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id") ? query.get("id") : ""
  const sheetid = query.get("sheetid") ? query.get("sheetid") : ""
  const calltype = query.get("calltype") ? query.get("calltype") : ""
  const msisdn = query.get("msisdn") ? query.get("msisdn") : ""
  const acht = query.get("acht") ? query.get("acht") : ""
  const callid = query.get("callid") ? query.get("callid") : ""
  const extrafield1 = query.get("extrafield1") ? query.get("extrafield1") : ""
  const extrafield2 = query.get("extrafield2") ? query.get("extrafield2") : ""

  useEffect(() => {
    const postdata = async () => {
      const getdynamiccollection = sheetid;
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
          $("#textbox1").show();
          $("#textbox2").show();
          $("#textbox3").show();
          $("#textbox4").show();
          $("#textbox5").show();
          $("#textbox6").show();
          $("#sheethide").hide();
          setSheetData(data);
          setIsFatal(data[0].param)
          const postdata2 = async () => {
            const res = await fetch(`${url}/api/get-rebuttel-score-data`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id
              }),
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
              console.log("error");
            } else {
              if (!data) {
                console.log("No Data!");
              } else {
                setCalibrationDetails(data)
                setEmpId(data[0].employeeid)
                setEmails(data[0].email)
                setAuditorRemark(data[0].auditor_remark)
                setObtainedMarks(data[0].obtainedMarks)
                setFinalScore(data[0].finalScore)
                setMaxMark(data[0].maximumMarks)
                setFatal(data[0].fatalCount)
                setFieldDynamic(data[0].fieldData)
                if (data[0].bonus_call_remark === "") {
                  $("#bonuscallremark").css('display', 'none')
                }
                if (data[0].ztp_remark === "") {
                  $("#ztpremark").css('display', 'none')
                }
                if (data[0].wow_call_remark === "") {
                  $("#wowremark").css('display', 'none')
                }
              }
            }
          };
          postdata2()
        }
      }
    };
    postdata();

  }, [])


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

  });
  let itemList = [];
  let parameter = [];
  let subparameter = [];
  let maxMarks2 = [];
  let finalMarks = [];

  const fv = isFatal ? isFatal.map((el, ind) => {
    var z = "#mxmrk" + ind
    var subp = "#subpara" + ind
    var rmk = "#rempara" + ind
    var mrk = "#marking" + ind
    var att1 = "#att1para" + ind
    var att2 = "#attpara2" + ind
    var att3 = "#attpara3" + ind
    var fatloption = "#fatalOption" + ind
    if (el.fatal !== "No") {
      $(z).css('color', 'red')
      $(subp).css('color', 'red')
      $(rmk).css('color', 'red')
      $(mrk).css('color', 'red')
      $(att1).css('color', 'red')
      $(att2).css('color', 'red')
      $(att3).css('color', 'red')
      $(fatloption).show()
    } else {
      $(z).css('color', '#495057')
      $(subp).css('color', '#495057')
      $(rmk).css('color', '#495057')
      $(mrk).css('color', '#495057')
      $(att1).css('color', '#495057')
      $(att2).css('color', '#495057')
      $(att3).css('color', '#495057')
      $(fatloption).hide()
    }

    var naopt = "#naOption" + ind
    if (el.na !== "No") {
      $(naopt).show()
    } else {
      $(naopt).hide()
    }

  }) : null

  const sheetsname = sheetid.split('_')
  var newSheetName = sheetsname.slice(1);
  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form encType="multipart/form-data">
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row">
                        <div className="col">
                          <h4 className="card-title mt-2" style={{ fontSize: '.9rem' }}> Evaluation Form-<span>{newSheetName.join('_')}</span></h4>
                        </div>

                      </div>
                    </div>
                    <div className="card-body">
                      <div
                        className="row mt-2"
                        id="textbox6"
                        style={{
                          border: "solid #dfe6e9 1px",
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
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                          >
                            <option>{getEmpId ? getEmpId : null}</option>
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
                              type="text"
                              name="msisdn"
                              id="msisdn"
                              defaultValue={msisdn ? msisdn : null}
                              style={{ fontSize: "12.4px" }}
                            />

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
                              type="text"
                              defaultValue={callid ? callid : null}
                              name="callid"
                              id="callid"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              CALL TYPE:
                            </label>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              name="calltype"
                              defaultValue={calltype ? calltype : null}
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
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              name="acht"
                              defaultValue={acht ? acht : null}
                              id="acht"
                              style={{ fontSize: "12.4px" }}
                            />

                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Email:
                            </label>
                            <input
                              className="form-control form-control-sm"
                              type="email"
                              defaultValue={emails ? emails : null}
                              name="email"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              EXTRA FIELD1:
                            </label>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              name="acht"
                              defaultValue={extrafield1 ? extrafield1 : null}
                              id="extrafield1"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              EXTRA FIELD2:
                            </label>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              name="extrafield2"
                              defaultValue={extrafield2 ? extrafield2 : null}
                              id="extrafield2"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>

                        {sheetData
                          ? sheetData.map((resp) => {

                            return resp.any.map((element) => {
                              const defaultValues = {};
                              for (const key in fieldDynamic) {
                                if (fieldDynamic.hasOwnProperty(key)) {
                                  const value = fieldDynamic[key];
                                  // Set the default value for each select element that matches the field name
                                  if (element.fieldname === key) {
                                    defaultValues[key] = value;
                                  }
                                }
                              }

                              if (element.controltype === "select") {
                                var p = [];
                                p = element.list.split(",");
                                return (
                                  <div
                                    id="selectoption"
                                    className="form-group col-sm-3 "
                                  >
                                    <label
                                      style={{ fontSize: "11px" }}
                                      className="form-label text-capitalize"
                                    >
                                      {element.fieldname}:
                                    </label>
                                    <select
                                      value={defaultValues[element.fieldname]}
                                      style={{ fontSize: "12.4px" }}
                                      name={element.fieldname}
                                      className="form-control form-control-sm"

                                    >
                                      <option value="">Select</option>
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
                                  >
                                    <label
                                      style={{ fontSize: "11px" }}
                                      className="form-label text-capitalize"
                                      key={element._id + "46484"}
                                    >
                                      {element.fieldname}:
                                    </label>
                                    <input
                                      key={element._id + "98698"}
                                      type="number"
                                      style={{ fontSize: "12.4px" }}
                                      name={element.fieldname}
                                      className="form-control form-control-sm"
                                      value={defaultValues[element.fieldname]}
                                    />
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    className="form-group col-sm-3"
                                    key={element._id}
                                  >
                                    <label
                                      style={{ fontSize: "11px" }}
                                      className="form-label text-capitalize"
                                      key={element._id + "46484"}
                                    >
                                      {element.fieldname}:
                                    </label>
                                    <input
                                      key={element._id + "98698"}
                                      type={element.controltype}
                                      style={{ fontSize: "12.4px" }}
                                      name={element.fieldname}
                                      className="form-control form-control-sm"
                                      value={defaultValues[element.fieldname]}
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
                          border: "solid #dfe6e9 1px",
                          display: "none",
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

                            return element.param.map((el, i) => {
                              var x = [];
                              x = el.attributes.split("|");
                              parameter.push(el.parameter);
                              subparameter.push(el.subparameter);

                              var x = [];
                              x = el.attributes.split("|");
                              parameter.push(el.parameter);
                              subparameter.push(el.subparameter);

                              let addMaxMarks2 = 0;
                              for (var j = 0; j < Object.values(el.subFields).length; j++) {
                                addMaxMarks2 += parseInt(el.subFields[j].maxmarkss);
                              }
                              maxMarks2.push(addMaxMarks2);
                              let it = 0
                              var sum = []
                              maxMarks2.forEach((mrk) => {
                                it += mrk
                                sum = it
                              })
                              finalMarks = parseInt(sum) + parseInt(itemList)

                              return (
                                <div
                                  id={"fatalColor" + i}
                                  className="card-body mt-2"
                                >
                                  <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                      className="bg-info"
                                    >
                                      <Typography>{el.parameter}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography>
                                        {calibrationDetails ? calibrationDetails.map((elems) => {
                                          return <>
                                            <div className="row ">
                                              <div className="row col-md-12">
                                                <div
                                                  className=" col-md-12"
                                                  style={{ fontSize: ".8rem" }}
                                                >
                                                  <label
                                                    className="text-uppercase"
                                                    title={"Legend : " + el.legend}
                                                    id={"subpara" + i}
                                                  >
                                                    {el.subparameter}
                                                  </label>
                                                </div>

                                                <div className="row col-md-12">
                                                  <div className="form-group col-md-2 ">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="exampleInputEmail"
                                                    >
                                                      Max Marks:
                                                    </label>
                                                    <input
                                                      type="text"
                                                      value={
                                                        el.maxmarks
                                                          ? el.maxmarks
                                                          : ""
                                                      }
                                                      id={"mxmrk" + i}
                                                      style={{ fontSize: "12.4px" }}
                                                      name="maxmarks"
                                                      className="form-control form-control-sm col-md-8"
                                                      aria-describedby="emailHelp"
                                                      readOnly
                                                    />
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="xyz"
                                                    >
                                                      Marking:
                                                    </label>
                                                    <select
                                                      name="marking"
                                                      id={"marking" + i}
                                                      defaultValue={elems ? elems.marks[i] : null}
                                                      className="form-control form-control-sm"
                                                      style={{ fontSize: "12.4px" }}
                                                      required
                                                    >
                                                      {" "}
                                                      <option value="">
                                                        select
                                                      </option>
                                                      <option
                                                        id={"fatalOption" + i}
                                                        style={{ display: "none" }}
                                                        value="00"
                                                      >
                                                        Fatal
                                                      </option>
                                                      <option
                                                        id={"naOption" + i}
                                                        style={{ display: "none" }}
                                                        value="-1"
                                                      >
                                                        NA
                                                      </option>
                                                      <option value={el.opt1}>
                                                        {el.opt1}
                                                      </option>
                                                      <option value={el.opt2}>
                                                        {el.opt2}
                                                      </option>
                                                      {!el.opt3 ? (
                                                        <option
                                                          style={{
                                                            display: "none",
                                                          }}
                                                          value={el.opt3}
                                                        >
                                                          {el.opt3}
                                                        </option>
                                                      ) : (
                                                        <option value={el.opt3}>
                                                          {el.opt3}
                                                        </option>
                                                      )}
                                                      {!el.opt4 ? (
                                                        <option
                                                          style={{
                                                            display: "none",
                                                          }}
                                                          value={el.opt4}
                                                        >
                                                          {el.opt4}
                                                        </option>
                                                      ) : (
                                                        <option value={el.opt4}>
                                                          {el.opt4}
                                                        </option>
                                                      )}
                                                    </select>
                                                    <p
                                                      id="errmark"
                                                      style={{ display: "none" }}
                                                      className="text-danger"
                                                    >
                                                      required!
                                                    </p>
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="xyz"
                                                    >
                                                      Attribute 1:
                                                    </label>
                                                    <select
                                                      name="attributes1"
                                                      id={"att1para" + i}
                                                      defaultValue={elems ? elems.attributes1[i] : null}
                                                      className="form-control form-control-sm"
                                                      style={{ fontSize: "12.4px" }}
                                                      required
                                                    >
                                                      <option value="">
                                                        Select
                                                      </option>
                                                      {x.map((ind) => {
                                                        return (
                                                          <option>{ind}</option>
                                                        );
                                                      })}
                                                    </select>
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="xyz"
                                                    >
                                                      Attribute 2:
                                                    </label>
                                                    <select
                                                      name="attribute2"
                                                      defaultValue={elems ? elems.attributes2[i] : null}
                                                      id={"attpara2" + i}
                                                      className="form-control form-control-sm"
                                                      style={{ fontSize: "12.4px" }}
                                                      required
                                                    >
                                                      <option value="">
                                                        Select
                                                      </option>
                                                      {x.map((ind) => {
                                                        return (
                                                          <option>{ind}</option>
                                                        );
                                                      })}
                                                    </select>
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="xyz"
                                                    >
                                                      Attribute 3:
                                                    </label>
                                                    <select
                                                      name="attribute3"
                                                      defaultValue={elems ? elems.attributes3[i] : null}
                                                      id={"attpara3" + i}
                                                      className="form-control form-control-sm"
                                                      style={{ fontSize: "12.4px" }}
                                                      required
                                                    >
                                                      <option value="">
                                                        Select
                                                      </option>
                                                      {x.map((ind) => {
                                                        return (
                                                          <option>{ind}</option>
                                                        );
                                                      })}
                                                    </select>
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                    <label
                                                      style={{ fontSize: "11px" }}
                                                      htmlFor="exampleInputEmail"
                                                    >
                                                      Remark:
                                                    </label>
                                                    <textarea
                                                      rows="1"
                                                      type="text"
                                                      id={"rempara" + i}
                                                      defaultValue={elems ? elems.remark[i] : null}
                                                      style={{ fontSize: "12.4px" }}
                                                      name="remark"
                                                      className="form-control form-control-sm"
                                                      aria-describedby="emailHelp"
                                                      required
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row col-md-12">

                                                {" "}
                                                {el.subFields ? el.subFields.map((subf, i2) => {
                                                  var subparameter2 = [];
                                                  if (subf.fatals !== "No") {
                                                    var subfatal = "#subp" + i + i2;
                                                    $(subfatal).css("color", "red");
                                                  }
                                                  else {
                                                    $(subfatal).css("color", "black");
                                                  }
                                                  subparameter2.push(subf.subparameterr);

                                                  if (subf.fatals !== "No") {
                                                    var subfataltot = "#totMarks" + i + i2;
                                                    $(subfataltot).css("color", "red");
                                                  } else {
                                                    $(subfataltot).css("color", "black");
                                                  }

                                                  if (subf.fatals !== "No") {
                                                    var subfatalmarking = "#marking1" + i + i2;
                                                    var fatloption = "#fatalOption1" + i + i2;
                                                    $(subfatalmarking).css("color", "red");
                                                    $(fatloption).show();
                                                  } else {
                                                    $(subfatalmarking).css("color", "black");
                                                    $(fatloption).hide();
                                                  }

                                                  if (subf.nas !== "No") {
                                                    var naopt = "#naOption1" + i + i2;
                                                    $(naopt).show();
                                                  } else {
                                                    $(naopt).hide();
                                                  }

                                                  var x1 = [];
                                                  x1 = subf.attributess.split("|");
                                                  var z = "#att1" + i + i2;
                                                  var zatt2 = "#att2" + i + i2;
                                                  var zatt3 = "#att3" + i + i2;
                                                  var zremark = "#rmk" + i + i2;
                                                  if (subf.fatals !== "No") {
                                                    $(z).css("color", "red");
                                                    $(zatt2).css("color", "red");
                                                    $(zatt3).css("color", "red");
                                                    $(zremark).css("color", "red");
                                                  } else {
                                                    $(z).css("color", "black");
                                                    $(zatt2).css("color", "black");
                                                    $(zatt3).css("color", "black");
                                                    $(zremark).css("color", "black");
                                                  }

                                                  return (<>
                                                    <div
                                                      className=" col-md-12"
                                                      style={{ fontSize: ".8rem" }}
                                                    >
                                                      <label
                                                        className="text-uppercase"
                                                        title={"Legend : " + subf.legends}
                                                        id={"subp" + i + i2}>
                                                        {subparameter2}
                                                      </label>
                                                    </div>
                                                    <div className="row col-md-12">
                                                      <div
                                                        style={{ fontSize: "12.4px" }}
                                                        className="form-group col-md-2"
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
                                                            subf.maxmarkss ? subf.maxmarkss : ""}
                                                          id={"totMarks" + i + i2}
                                                          style={{
                                                            fontSize: "12.4px"
                                                          }}
                                                          name="maxmarks"
                                                          className="form-control form-control-sm col-md-8"
                                                          aria-describedby="emailHelp"
                                                          readOnly
                                                        />

                                                      </div>
                                                      <div className=" form-group col-md-2">
                                                        <label style={{ fontSize: "11px" }}
                                                          htmlFor="xyz" >
                                                          Marking:
                                                        </label>
                                                        <select
                                                          name="markings"
                                                          id={"marking1" + i + i2}
                                                          defaultValue={elems.subParaMarks[i] ? elems.subParaMarks[i][i2].markings : null}
                                                          className="form-control form-control-sm mark"
                                                          style={{ fontSize: "12.4px" }}
                                                          required
                                                        >
                                                          {" "}
                                                          <option value=""> select </option>
                                                          <option
                                                            id={"fatalOption1" + i + i2}
                                                            style={{ display: "none" }}
                                                            value="00">
                                                            Fatal
                                                          </option>
                                                          <option
                                                            id={
                                                              "naOption1" + i + i2}
                                                            style={{ display: "none" }}
                                                            value="-1"
                                                          >
                                                            NA
                                                          </option>
                                                          <option
                                                            value={subf.opt1s}
                                                          >
                                                            {subf.opt1s}
                                                          </option>
                                                          <option
                                                            value={subf.opt2s}
                                                          >
                                                            {subf.opt2s}
                                                          </option>
                                                          {!subf.opt3s ? (
                                                            <option
                                                              style={{ display: "none" }}
                                                              value={subf.opt3s}>
                                                              {subf.opt3s} </option>) : (
                                                            <option value={subf.opt3s} >
                                                              {subf.opt3s} </option>
                                                          )}
                                                          {!subf.opt4s ? (
                                                            <option
                                                              style={{ display: "none" }}
                                                              value={subf.opt4s}
                                                            >
                                                              {subf.opt4s}
                                                            </option>
                                                          ) : (
                                                            <option
                                                              value={subf.opt4s}
                                                            >
                                                              {subf.opt4s}
                                                            </option>
                                                          )}
                                                        </select>
                                                        <p
                                                          id="errmark"
                                                          style={{ display: "none" }}
                                                          className="text-danger"
                                                        >
                                                          required!
                                                        </p>
                                                      </div>
                                                      <div className="form-group col-md-2">
                                                        <label
                                                          style={{ fontSize: "11px" }}
                                                          htmlFor="xyz"
                                                        >
                                                          Attribute 1:
                                                        </label>
                                                        <select
                                                          name="attributes1"
                                                          defaultValue={elems.subParaAttributes1[i] ? elems.subParaAttributes1[i][i2].attributes1 : null}
                                                          id={"att1" + i + i2}
                                                          className="form-control form-control-sm mark"
                                                          style={{ fontSize: "12.4px" }}
                                                          required
                                                        >
                                                          <option value="">Select</option>
                                                          {
                                                            x1.map((ind) => {
                                                              return (<option> {ind}</option>);
                                                            })}
                                                        </select>
                                                      </div>
                                                      <div className=" form-group col-md-2">
                                                        <label
                                                          style={{ fontSize: "11px", }}
                                                          htmlFor="xyz"
                                                        >
                                                          Attribute 2:
                                                        </label>
                                                        <select
                                                          name="attribute2"
                                                          id={"att2" + i + i2}
                                                          className="form-control form-control-sm mark"
                                                          defaultValue={elems.subParaAttributes2[i] ? elems.subParaAttributes2[i][i2].attribute2 : null}
                                                          style={{ fontSize: "12.4px", }}
                                                          required
                                                        >
                                                          <option value="">Select</option>
                                                          {x1.map((ind) => {
                                                            return (<option> {ind}</option>);
                                                          })}
                                                        </select>
                                                      </div>
                                                      <div className=" form-group col-md-2">
                                                        <label
                                                          style={{ fontSize: "11px" }}
                                                          htmlFor="xyz"
                                                        >
                                                          Attribute 3:
                                                        </label>
                                                        <select
                                                          name="attribute3"
                                                          defaultValue={elems.subParaAttributes3[i] ? elems.subParaAttributes3[i][i2].attribute3 : null}
                                                          id={"att3" + i + i2}
                                                          className="form-control form-control-sm mark"
                                                          style={{ fontSize: "12.4px", }}
                                                          required
                                                        >
                                                          <option value=""> Select </option>
                                                          {x1.map((ind) => {
                                                            return (
                                                              <option> {ind}</option>
                                                            );
                                                          })}
                                                        </select>
                                                      </div>
                                                      <div className="form-group col-md-2">
                                                        <label
                                                          style={{ fontSize: "11px", }}
                                                          htmlFor="exampleInputEmail"
                                                        >
                                                          Remark:
                                                        </label>
                                                        <textarea
                                                          rows="1"
                                                          id={"rmk" + i + i2}
                                                          type="text"
                                                          defaultValue={elems.subParaRemarks[i] ? elems.subParaRemarks[i][i2].remark : null}
                                                          style={{ fontSize: "12.4px", }}
                                                          name="remark"
                                                          className="form-control form-control-sm mark"
                                                          aria-describedby="emailHelp"
                                                          required
                                                        />
                                                      </div>
                                                    </div>
                                                  </>
                                                  );
                                                })
                                                  : null}
                                              </div>
                                            </div>
                                          </>
                                        }) : null}
                                      </Typography>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              );

                            });
                          })
                          : ""}
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          {calibrationDetails ? calibrationDetails.map((index) => {
                            return <>
                              <div
                                className="row mt-1 col-md-12"
                                id="textbox2"
                                style={{
                                  border: "solid #dfe6e9 1px",

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
                                    defaultValue={index ? index.wow_call_option : null}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option defaultValue="">Select</option>
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                  </select>
                                </div>

                                <div
                                  style={{ fontSize: "12.4px" }}
                                  className="form-group col-sm-5"
                                  id="inputoption"
                                >
                                  <label
                                    style={{ fontSize: "11px" }}
                                    htmlFor="xyz"
                                  ></label>
                                  <textarea
                                    rows="1"
                                    id="wowremark"
                                    type="text"
                                    defaultValue={index ? index.wow_call_remark : null}
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

                                  border: "solid #dfe6e9 1px",
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
                                  style={{ fontSize: "12px" }}
                                  className="form-group col-sm-5"
                                  id="inputoption1"
                                >
                                  <label
                                    style={{ fontSize: "12.4px" }}
                                    htmlFor="xyz"
                                  ></label>
                                  <textarea
                                    rows="1"
                                    type="text"
                                    id="ztpremark"
                                    defaultValue={index ? index.ztp_remark : null}
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

                                  border: "solid #dfe6e9 1px",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "12.4px",
                                  }}
                                  className="form-group col-md-2"
                                >
                                  <label
                                    style={{ fontSize: "11px" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Bonus:
                                  </label>
                                  <p>It is Bonus call.</p>
                                </div>
                                <div className=" form-group col-md-2">
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
                                    defaultValue={index ? index.marking_bonus_call : null}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: "12.4px" }}
                                  >
                                    <option value="0">0</option>
                                  </select>
                                </div>
                                <div className=" form-group col-sm-2">
                                  <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                    Option:
                                  </label>
                                  <select
                                    name="option_bonus_call"
                                    id="option3"
                                    defaultValue={index ? index.option_bonus_call : null}
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
                                  <textarea
                                    rows="1"
                                    type="text"
                                    id="bonuscallremark"
                                    defaultValue={index ? index.bonus_call_remark : null}
                                    style={{ fontSize: "12.4px", marginTop: "8px" }}
                                    name="bonus_call_remark"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                              </div>
                            </>
                          }) : null}
                        </div>
                        <div
                          className="col-md-4 mt-1"
                          id="textbox5"
                          style={{
                            float: "right",
                            border: "solid #dfe6e9 1px",
                            display: "none",
                          }}
                        >
                          <div className="form-group row">
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              className="form-group col-md-12 "
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
                                style={{ fontSize: "12.4px" }}
                                defaultValue={getAuditorRemark ? getAuditorRemark : null}
                                name="feedback"
                                id="feedback"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Fatal Count:
                              </label>
                              <input
                                type="text"
                                defaultValue={fatal}
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
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Maximum Marks:
                              </label>
                              <input
                                type="text"
                                id="maxmarks"
                                defaultValue={maxMark ? maxMark : null}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="maximummarks"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div
                              style={{
                                fontSize: "12.4px",
                              }}
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Obtained Marks:
                              </label>
                              <input
                                type="text"
                                defaultValue={obtainedMarks ? obtainedMarks : null}
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
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Final Score:
                              </label>
                              <input
                                type="text"
                                defaultValue={finalScore ? finalScore + "%" : null}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="finalscore"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                                readOnly
                              />
                            </div>
                          </div>
                          <center className="">
                            <button
                              type="click"
                              id="chk"
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              }}
                              className="btn btn-info form-group "
                              disabled
                            >
                              CHECK
                            </button>
                          </center>
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

export default AgentSheetView;
