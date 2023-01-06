import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useHistory } from "react-router-dom";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";

const SheetList = () => {
  const [sheets, setSheets] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [count, setCount] = useState(["0"]);
  const [fieldData, setFieldData] = useState({});
  const [obtainMarks, setObtainMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [inputFields, setInputFields] = useState("");
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
  const [isFatal, setIsFatal] = useState("")
  const [sheetName, setSheetName] = useState({
    getdynamiccollection:"",
    employeeid:"",
    msisdn:"",
    callid:"",
    extrafield1:"",
    extrafield2:"",
    wow_call_option:"no",
    wow_call_remark:"",
    ztp_option:"no",
    ztp_remark:"",
    marking_bonus_call:"0",
    bonus_call_remark:"",
    feedback:"",
    option_bonus_call:"no"
  });
  const history = useHistory()
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
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setSheetName((sheetName) => {
      return {
        ...sheetName,
        [name]: value,
      };
    });
  };

  const getdata = async () => {
    const res = await fetch("/api/get-dynamic-collection-names", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setSheets(data);
    }
  };

  const handleChange = (e, field) => {
    setFieldData({
      ...fieldData,
      [field]: e.target.value, //edit
    });
  };

  const handleChangeSelectMarks = (e, i) => {
    const list = { ...inputFields }; //<-- object, not array
    list[i] = e.target.value;
    setInputFields({ ...list });
    
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

  useEffect(() => {
    getdata();
  }, []);

  let mark = [];
  let percent = [];
  let mark2 = [];
  const handleCheckButton = (e) => {
    e.preventDefault();

    sheetData.map((li) => {
      
      if (li.subparam.length != 0) {
        //To find sum of obtained marks
        var sum = 0;
        for (var i = 0; i < Object.keys(inputFields).length; i++) {
          sum += parseInt(inputFields[i]);
        }
        mark.push(sum);

        var sum2 = 0;
        for (var i = 0; i < Object.keys(subParaMarks).length; i++) {
          sum2 += parseInt(subParaMarks[i]);
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
        for (var i = 0; i < Object.keys(inputFields).length; i++) {
          sum += parseInt(inputFields[i]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { getdynamiccollection } = sheetName;
    if($("#selectsheet").val()==""){
      $("#sheeterr").show()
      $("#selectsheet").css('border-color','red')
    }
    else{
      $("#sheeterr").hide()
    }
    if(!getdynamiccollection){
      return false
    } else{
    const postdata = async () => {
     
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
          setIsFatal(data[0].param)
        }
      }
    };
    postdata();
  }
  };

  const finalHandleSubmit = (e) => {
    e.preventDefault();
    let totalmarks = totalMarks[0];
    let counts = count[0];
    
    const {
      employeeid,
      wow_call_option,
      ztp_option,
      ztp_remark,
      callid,
      extrafield1,
      extrafield2,
      feedback,
      msisdn,
      option_bonus_call,
      marking_bonus_call,
      bonus_call_remark,
      wow_call_remark,
    } = sheetName;

    if (!msisdn || !feedback || !callid || !inputFields) {
      return false;
    } else {
     const sheet_name = sheetName.getdynamiccollection
      const postdata1 = async () => {
        const res1 = await fetch("/api/sheet-list-submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
            extrafield1,
            feedback,
            remark,
            msisdn,
            option_bonus_call,
            fieldData,
            totalmarks,
            counts,
            marking_bonus_call,
            bonus_call_remark,
            wow_call_remark,
            parameter,
            subparameter,
            extrafield2,
            subParaMarks,
            subParaAttributes1,
            subParaAttributes2,
            subParaAttributes3,
            subParaRemarks,
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          console.log("Successful");
          toast.success("Successfully Saved!");
        } else {
          toast.error("Something went wrong");
        }
      };
      postdata1();
    
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

    $("#employeeid").on("change", function () {
      if ($(this).val() === "Select") {
        $("#submitbutton").hide();
      } else {
        $("#submitbutton").show();
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
     
    }
   
  });
  let itemList = [];
  let parameter = [];
  let subparameter = [];
  let subparameter2 = [];
  let maxMarks2 = [];
  let finalMarks = [];
  let indx = [];

const fv = isFatal?isFatal.map((el)=>{
if(el.fatal != "No"){
  $("#fatalColor").css('background-color','red')
  $("#fatalOption").show()
}else{
  $("#fatalColor").css('background-color','rgb(204 225 229)')
  $("#fatalOption").hide()
}

if(el.na != "No"){
  $("#naOption").show()
}else{
  $("#naOption").hide()
}
}):null
  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form noValidate
              className="needs-validation" onSubmit={finalHandleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Sheet List</h3>
                    </div>
                    <div className="card-body">
                      <div
                        className="row mt-2"
                        style={{ border: "solid text-muted 1px" }}
                        id="sheethide"
                      >
                        <div className="form-group col-sm-4">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Sheet:
                          </label>
                          <select
                            name="getdynamiccollection"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            id="selectsheet"
                        
                          >
                            <option value="">Select</option>
                            {sheets
                              ? sheets.map((element) => {
                                  return (
                                    <option
                                      value={element.collectionname}
                                      key={element._id + "jhyu"}
                                    >
                                      {element.collectionname}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          <div style={{display:'none', color:'red'}} id="sheeterr">
                            Please choose a sheet.
                          </div>
                        </div>
                        <div>
                        <button
                          type="click"
                          id="sheetbtn"
                          style={{
                            fontSize: "12px",
                            marginTop: "1.6rem",
                          }}
                          className="btn btn-primary form-group"
                          onClick={handleSubmit}
                        >
                          GET SHEET
                        </button>
                        </div>
                      </div>
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
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">Select</option>
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
                              onChange={setdata}
                              type="number"
                              name="msisdn"
                              id="msisdn"
                              style={{ fontSize: "12.4px" }}
                              required
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
                              onChange={setdata}
                              type="text"
                              name="callid"
                              id="callid"
                              style={{ fontSize: "12.4px" }}
                              required
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
                              onChange={setdata}
                              type="text"
                              name="extrafield1"
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
                              onChange={setdata}
                              type="text"
                              name="extrafield2"
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
                                    id="fatalColor"
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
                                            style={{ fontSize: "12.4px" }}
                                            name="maxmarks"
                                            className="form-control form-control-sm"
                                            aria-describedby="emailHelp"
                                            readOnly
                                          />
                                        </div>
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
                                            onChange={(e) =>
                                              handleChangeSelectMarks(e, i)
                                            }
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                            required
                                          > <option value="">select</option>
                                            <option id="fatalOption" style={{display:'none'}} value="0">Fatal</option>
                                            <option id="naOption" style={{display:'none'}} value="0">NA</option>
                                            <option value={el.opt1}>{el.opt1}</option>
                                            <option value={el.opt2}>{el.opt2}</option>
                                            <option value={el.opt3}>{el.opt3}</option>
                                            <option value={el.opt4}>{el.opt4}</option>
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
                                            onChange={(e) =>
                                              handleChangeInputAttri1(e, i)
                                            }
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                            required
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
                                            Attribute 2:
                                          </label>
                                          <select
                                            name="attribute2"
                                            onChange={(e) =>
                                              handleChangeInputAttri2(e, i)
                                            }
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                            required
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
                                            onChange={(e) =>
                                              handleChangeInputAttri3(e, i)
                                            }
                                            className="form-control form-control-sm"
                                            style={{ fontSize: "12.4px" }}
                                            required
                                          >
                                            <option defaultValue="">
                                              Select
                                            </option>
                                            {x.map((ind) => {
                                              return <option>{ind}</option>;
                                            })}
                                          </select>
                                        </div>
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
                                            onChange={(e) =>
                                              handleChangeInputRemark(e, i)
                                            }
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
                                      id="fatalColor"
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
                                              style={{ fontSize: "12.4px" }}
                                              name="maxmarkss"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                              readOnly
                                            />
                                          </div>
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
                                              onChange={(e) =>
                                                handleChangeSelectMarks(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
                                            >
                                              <option value="">select</option>
                                              <option id="fatalOption" style={{display:'none'}} value="0">Fatal</option>
                                              <option id="naOption" style={{display:'none'}} value="0">NA</option>
                                              <option>{el.opt1}</option>
                                              <option>{el.opt2}</option>
                                              <option>{el.opt3}</option>
                                              <option>{el.opt4}</option>
                                            </select>
                                            <select
                                              name="marking"
                                              id="marking"
                                              onChange={(e) =>
                                                handleChangeSelectMarkss(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
                                            ><option value="">select</option>
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
                                          <div className=" form-group col-sm-2">
                                            <label
                                              style={{ fontSize: "11px" }}
                                              htmlFor="xyz"
                                            >
                                              Attribute 1:
                                            </label>
                                            <select
                                              name="attributes1"
                                              onChange={(e) =>
                                                handleChangeInputAttri1(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {x.map((ind) => {
                                                return <option>{ind}</option>;
                                              })}
                                            </select>
                                            <select
                                              name="attributes1s"
                                              onChange={(e) =>
                                                handleChangeInputAttri1s(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
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
                                              onChange={(e) =>
                                                handleChangeInputAttri2(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
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
                                              onChange={(e) =>
                                                handleChangeInputAttri2s(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
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
                                              onChange={(e) =>
                                                handleChangeInputAttri3(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
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
                                              onChange={(e) =>
                                                handleChangeInputAttri3s(e, i)
                                              }
                                              className="form-control form-control-sm"
                                              style={{ fontSize: "12.4px" }}
                                              required
                                            >
                                              <option defaultValue="">
                                                Select
                                              </option>
                                              {z.map((data) => {
                                                return <option>{data}</option>;
                                              })}
                                            </select>
                                          </div>
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
                                              onChange={(e) =>
                                                handleChangeInputRemark(e, i)
                                              }
                                              style={{ fontSize: "12.4px" }}
                                              name="remark"
                                              className="form-control form-control-sm"
                                              aria-describedby="emailHelp"
                                            />
                                            <input
                                              type="text"
                                              onChange={(e) =>
                                                handleChangeInputRemarks(e, i)
                                              }
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
                          <div
                            className="row mt-1 col-md-12"
                            id="textbox2"
                            style={{
                              backgroundColor: "rgb(204 225 229)",
                              border: "solid #4b4e4e 1px",
                              display: "none",
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
                                onChange={setdata}
                                className="form-control form-control-sm"
                                style={{ fontSize: "12.4px" }}
                              >
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
                                onChange={setdata}
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
                              display: "none",
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
                                onChange={setdata}
                                className="form-control form-control-sm"
                                id="option2"
                                style={{ fontSize: "12.4px" }}
                              >
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
                                onChange={setdata}
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
                              display: "none",
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
                            <div className=" form-group col-sm-1">
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
                                onChange={setdata}
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
                                onChange={setdata}
                                className="form-control form-control-sm"
                                style={{ fontSize: "12.4px" }}
                              >
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
                                onChange={setdata}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="bonus_call_remark"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                              />
                            </div>
                          </div>
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
                              onChange={setdata}
                              style={{ fontSize: "12.4px" }}
                              name="feedback"
                              id="feedback"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              required
                            />
                            
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
                              onChange={setdata}
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
                              onChange={setdata}
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
                              onChange={setdata}
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
                              onChange={setdata}
                              value={percnt ? percnt + "%" : ""}
                              style={{ fontSize: "12.4px", marginTop: "8px" }}
                              name="finalscore"
                              className="form-control form-control-sm"
                              aria-describedby="emailHelp"
                              readOnly
                            />
                          </div>
                          <div className="row offset-4">
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
            
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                                display: "none",
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

export default SheetList;
