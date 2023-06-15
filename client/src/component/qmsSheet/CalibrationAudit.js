import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../auth/helpers";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const CalibrationAudit = () => {
  const navigate = useNavigate();
  const locations = useLocation();
  const [sheetData, setSheetData] = useState("");
  const [count, setCount] = useState(["0"]);
  const [fieldData, setFieldData] = useState({});
  const [obtainMarks, setObtainMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [percnt, setPercent] = useState({});
  const [getEmpId, setEmpId] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [empDetails, setEmpDetails] = useState("");
  const [inputFields, setInputFields] = useState("");
  const [subParaMarks, setSubParaMarks] = useState("");
  const [emails, setEmail] = useState("");
  const [attri1, setAttri1] = useState({});
  const [attri2, setAttri2] = useState({});
  const [attri3, setAttri3] = useState({});
  const [remark, setRemark] = useState("");
  const [subParaAttributes1, setSubParaAttributes1] = useState("");
  const [subParaAttributes2, setSubParaAttributes2] = useState("");
  const [subParaAttributes3, setSubParaAttributes3] = useState("");
  const [subParaRemarks, setSubParaRemarks] = useState("");
  const [isFatal, setIsFatal] = useState("");
  const [getDOJ, setDOJ] = useState("");
  const [getReportToName, setReportToName] = useState("");
  const [getThName, setThName] = useState("");
  const [getAhName, setAhName] = useState("");
  const [getQhName, setQhName] = useState("");
  const [getOhName, setOhName] = useState("");
  const [getAh, setAh] = useState("");
  const [getQh, setQh] = useState("");
  const [getOh, setOh] = useState("");
  const [getReportTo, setReportTo] = useState("");
  const [getTh, setTh] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const achts = useRef("");
  const callids = useRef("");
  const calltypes = useRef("");
  const msisdns = useRef("");
  const empids = useRef("");
  const maxmarks = useRef("");
  const wow_call_options = useRef("");
  const wow_call_remarks = useRef("");
  const ztp_options = useRef("");
  const ztp_remarks = useRef("");
  const marking_bonus_calls = useRef("");
  const option_bonus_calls = useRef("");
  const bonus_call_remarks = useRef("");
  const fatalcount = useRef("");
  const maximummarks = useRef("");
  const obtainedmarks = useRef("");
  const finalscore = useRef("");

  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id") ? query.get("id") : "";
  const sheetid = query.get("sheetid") ? query.get("sheetid") : "";
  const auditeeid = query.get("auditeeid") ? query.get("auditeeid") : "";
  const call = query.get("call") ? query.get("call") : "";
  const mobile = query.get("mobile") ? query.get("mobile") : "";
  const acht = query.get("acht") ? query.get("acht") : "";
  const callid = query.get("callid") ? query.get("callid") : "";

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
    getdata3();
  };

  const setEmailTa = (e) => {
    const { name, value } = e.target;
    setEmail((emails) => {
      return {
        ...emails,
        [name]: value,
      };
    });
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

  const handleChangeIncrementedSelectMarks = (e, i, i2) => {
    const { name, value } = e.target;
    const updatedMarks = [...subParaMarks]; // create a copy of the marks state
    updatedMarks[i] = updatedMarks[i] || {};
    updatedMarks[i][i2] = { ...updatedMarks[i][i2], [name]: value }; // update the specific index with the new value
    setSubParaMarks(updatedMarks); // update the marks state with the updated array
  };

  const handleChangeInputAttri1 = (e, i) => {
    const list = { ...attri1 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri1({ ...list });
  };
  const handleChangeInputAttri1s = (e, i, i2) => {
    const { name, value } = e.target;
    const list = [...subParaAttributes1]; //<-- object, not array
    list[i] = list[i] || {};
    list[i][i2] = { ...list[i][i2], [name]: value };
    setSubParaAttributes1(list);
  };

  const handleChangeInputAttri2 = (e, i) => {
    const list = { ...attri2 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri2({ ...list });
  };

  const handleChangeInputAttri2s = (e, i, i2) => {
    const { name, value } = e.target;
    const list = [...subParaAttributes2]; //<-- object, not array
    list[i] = list[i] || {};
    list[i][i2] = { ...list[i][i2], [name]: value };
    setSubParaAttributes2(list);
  };

  const handleChangeInputAttri3 = (e, i) => {
    const list = { ...attri3 }; //<-- object, not array
    list[i] = e.target.value;
    setAttri3({ ...list });
  };

  const handleChangeInputAttri3s = (e, i, i2) => {
    const { name, value } = e.target;
    const list = [...subParaAttributes3]; //<-- object, not array
    list[i] = list[i] || {};
    list[i][i2] = { ...list[i][i2], [name]: value };
    setSubParaAttributes3(list);
  };

  const handleChangeInputRemark = (e, i) => {
    const list = { ...remark }; //<-- object, not array
    list[i] = e.target.value;
    setRemark({ ...list });
  };
  const handleChangeInputRemarks = (e, i, i2) => {
    const { name, value } = e.target;
    const list = [...subParaRemarks]; //<-- object, not array
    list[i] = list[i] || {};
    list[i][i2] = { ...list[i][i2], [name]: value };
    setSubParaRemarks(list);
  };

  const handleCheckButton = (e) => {
    e.preventDefault();
    sheetData.map((li) => {
      var finalsum = 0;
      var fatalflag = false;
      var fatalcount = 0;
      var marks = 0;
      for (
        let parampos = 0;
        parampos < Object.keys(inputFields).length;
        parampos++
      ) {
        if (inputFields[parampos] !== "") {
          let paramsum = 0;
          paramsum +=
            parseInt(inputFields[parampos]) === -1
              ? 0
              : parseInt(inputFields[parampos]);

          let critical = li.param[parampos].critical;
          marks +=
            inputFields[parampos] === "-1"
              ? 0
              : parseInt(li.param[parampos].maxmarks);

          let criticalflag = critical === "No" ? false : true;
          let currentcriticalfatalflag = false;
          if (inputFields[parampos] === "00") {
            fatalcount++;
            if (criticalflag) {
              // continue;
              currentcriticalfatalflag = true;
            } else {
              fatalflag = true;
            }
          }

          if (subParaMarks[parampos]) {
            for (
              let sbcurrentpos = 0;
              sbcurrentpos < Object.keys(subParaMarks[parampos]).length;
              sbcurrentpos++
            ) {
              if (subParaMarks[parampos][sbcurrentpos].markings !== "") {
                marks +=
                  subParaMarks[parampos][sbcurrentpos].markings === "-1"
                    ? 0
                    : parseInt(
                      li.param[parampos]["subFields"][sbcurrentpos].maxmarkss
                    );

                if (subParaMarks[parampos][sbcurrentpos].markings === "00") {
                  fatalcount++;
                  if (criticalflag) {
                    currentcriticalfatalflag = true;
                    // break;
                  } else {
                    fatalflag = true;
                  }
                } else {
                  paramsum +=
                    parseInt(subParaMarks[parampos][sbcurrentpos].markings) ===
                      -1
                      ? 0
                      : parseInt(subParaMarks[parampos][sbcurrentpos].markings);
                }
              }
            }
          }
          if (currentcriticalfatalflag) {
            // continue;
          } else {
            finalsum += paramsum;
          }
        }
      }
      setObtainMarks(String(finalsum));
      if (fatalflag) {
        finalsum = 0;
      }
      setTotalMarks(String(marks));
      if (isNaN(String(Math.round((finalsum / marks) * 100)))) {
        setPercent("0");
      } else {
        if ($("#option2").val() === "yes") {
          setPercent("0");
        } else {
          setPercent(String(Math.round((finalsum / marks) * 100)));
        }
      }
      setCount(String(fatalcount));
    });
  };

  const getdata3 = async () => {
    var employeeid = empids.current.value;
    var em = employeeid.split("-");
    const emp = em[1];
    const res = await fetch(`${url}/api/get-employee-data-soap2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp,
      }),
    });
    const data3 = await res.json();
    if (res.status === 422 || !data3) {
      console.log("error ");
    } else {
      setAh(data3[0].AH);
      setAhName(data3[0].AHName);
      setQh(data3[0].QH);
      setQhName(data3[0].QHName);
      setOh(data3[0].oh);
      setOhName(data3[0].OHName);
      setReportTo(data3[0].ReportTo);
      setReportToName(data3[0].rptToName);
      setTh(data3[0].TH);
      setDOJ(data3[0].DOJ);
      setThName(data3[0].THName);
    }
  };

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
          postdata2();
          setIsFatal(data[0].param);
        }
      }
    };
    postdata();

    const postdata2 = async () => {
      const emp = auditeeid;
      const res = await fetch(`${url}/api/get-name-by-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setEmpId(data[0].EmpDet);
          setTimeout(() => {
            $("#chk").trigger("click", function () { });
          }, 100);
          postdata3();
        }
      }
    };

    const postdata3 = async () => {
      const emp = auditeeid;
      const res = await fetch(`${url}/api/get-employee-data-soap2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp,
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
            setEmpDetails(data[0]);
          } else {
            setEmpDetails("");
          }
        }
      }
    };
  }, []);

  const finalHandleSubmit = (e) => {
    e.preventDefault();
    const { email } = emails;
    let sheetStructureid = sheetData[0]._id;
    var callid = callids.current.value;
    var msisdn = msisdns.current.value;
    var employeeid = empids.current.value;
    let totalmarks = totalMarks;
    let sub_process = isAuth().sub_process;
    let clientname = isAuth().clientname;
    let process = isAuth().Process;
    var obtainMarks = obtainedmarks.current.value;
    var maximumMarks = maximummarks.current.value;
    var fatalCount = fatalcount.current.value;
    var sheet_name = sheetid;
    var option_bonus_call = option_bonus_calls.current.value;
    var marking_bonus_call = marking_bonus_calls.current.value;
    var ztp_option = ztp_options.current.value;
    var wow_call_option = wow_call_options.current.value;
    let counts = count[0];
    var feedback = dataSource.feedback;
    if (Object.values(fieldData).length <= 0) {
      formErrors["process"] = `field is required`;
      setFormErrors(formErrors);
      return false;
    } else if (Object.values(inputFields).length !== indexParam[0]) {
      return false;
    } else if (!msisdn || !feedback || !callid || !inputFields) {
      return false;
    } else {
      var wow_call_remark = wow_call_remarks.current.value;
      var bonus_call_remark = bonus_call_remarks.current.value;
      var ztp_remark = ztp_remarks.current.value;
      let OH = getOh;
      let AH = getAh;
      let TH = getTh;
      let Report_to = getReportTo;
      let QH = getQh;
      let OH_Name = getOhName;
      let QH_Name = getQhName;
      let TH_Name = getThName;
      let AH_Name = getAhName;
      let Report_to_Name = getReportToName;
      let DOJ = getDOJ;
      var auditorid = isAuth().EmployeeID;
      var auditor_name = isAuth().EmployeeName;
      var ghj = employeeid.split("-");
      var auditee_id = ghj[1];
      var auditee_name = ghj[0];
      var cm_id = empDetails.sub_process_id;
      var xcv =
        empDetails.clientname +
        "|" +
        empDetails.Process +
        "|" +
        empDetails.sub_process;
      var processDetails = xcv;
      var calibration_status = "2";
      var audit_type = "calibrationauto";
      var { extrafield2 } = dataSource;
      var calltype = call;
      var { extrafield1 } = dataSource;
      var location = isAuth().location;
      const responce = "Data saved successfully";

      const postdata1 = async () => {
        const res1 = await fetch(`${url}/api/sheet-list-submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalmarks,
            inputFields,
            sheet_name,
            responce,
            sub_process,
            process,
            clientname,
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
            cm_id,
            auditorid,
            auditor_name,
            auditee_id,
            auditee_name,
            Report_to,
            OH,
            AH,
            TH,
            QH,
            OH_Name,
            TH_Name,
            QH_Name,
            AH_Name,
            Report_to_Name,
            processDetails,
            DOJ,
            calibration_status,
            audit_type,
            extrafield2,
            extrafield1,
            calltype,
            acht,
            location,
            sheetStructureid,
            email,
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          toast.success("Successfully Saved!");

          const dataid = data1.dataId;
          //Insert data into calibration status
          const auditor_id = isAuth().EmployeeID;
          const postdataCalibrationStatus = async () => {
            const res1 = await fetch(`${url}/api/calibration-status`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sheetid,
                auditeeid,
                auditor_id,
                dataid,
              }),
            });

            const data1 = await res1.json();
            if (res1.status === 422 || !data1) {
              toast.error("something went wrong");
            } else if (res1.status === 200) {
            } else {
              toast.error("Something went wrong");
            }
          };

          postdataCalibrationStatus();

          navigate("/random/calibration-view", {
            state: "Successfully Calibrated!",
          });
        } else {
          toast.error("Something went wrong");
        }
      };

      //Update audit status into calibration Assignment
      const updateCalibrationAssignment = async () => {
        const res1 = await fetch(`${url}/api/update-calibration-assignment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
        } else {
          toast.error("Something went wrong");
        }
      };

      postdata1();
      updateCalibrationAssignment();
    }
  };

  $(function () {
    $("#option1").on("change", function () {
      if ($(this).val() === "no") {
        $("#inputoption").hide();
        $("#ztp").show();
      } else if ($(this).val() === "yes") {
        $("#inputoption").show();
        $("#ztp").hide();
      }
    });

    $("#option2").on("change", function () {
      if ($(this).val() === "no") {
        $("#inputoption1").hide();
        $("#wow").show();
      } else if ($(this).val() === "yes") {
        $("#inputoption1").show();
        $("#wow").hide();
        setPercent("0");
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
  let subparameter2 = [];
  let maxMarks2 = [];
  let finalMarks = [];
  let indx = [];

  const fv = isFatal
    ? isFatal.map((el, ind) => {
      var z = "#mxmrk" + ind;
      var subp = "#subpara" + ind;
      var rmk = "#rempara" + ind;
      var mrk = "#marking" + ind;
      var att1 = "#att1para" + ind;
      var att2 = "#attpara2" + ind;
      var att3 = "#attpara3" + ind;
      var fatloption = "#fatalOption" + ind;
      if (el.fatal !== "No") {
        $(z).css("color", "red");
        $(subp).css("color", "red");
        $(rmk).css("color", "red");
        $(mrk).css("color", "red");
        $(att1).css("color", "red");
        $(att2).css("color", "red");
        $(att3).css("color", "red");
        $(fatloption).show();
      } else {
        $(z).css("color", "#495057");
        $(subp).css("color", "#495057");
        $(rmk).css("color", "#495057");
        $(mrk).css("color", "#495057");
        $(att1).css("color", "#495057");
        $(att2).css("color", "#495057");
        $(att3).css("color", "#495057");
        $(fatloption).hide();
      }

      var naopt = "#naOption" + ind;
      if (el.na !== "No") {
        $(naopt).show();
      } else {
        $(naopt).hide();
      }
    })
    : null;

  const handleKeyDownFeedback = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownWow = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownZtp = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyMarking = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownAtt = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownAtt1 = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "@" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "^" ||
      e.key === "%" ||
      e.key === "&" ||
      e.key === "="
    ) {
      e.preventDefault();
    }
  };

  const handleKeyEmail = (e) => {
    if (
      e.key === "*" ||
      e.key === "/" ||
      e.key === "(" ||
      e.key === ")" ||
      e.key === "+" ||
      e.key === "%" ||
      e.key === ":" ||
      e.key === ";" ||
      e.key === ">" ||
      e.key === "<" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "{" ||
      e.key === "}" ||
      e.key === "|" ||
      e.key === "!" ||
      e.key === "'" ||
      e.key === "=" ||
      e.key === "#" ||
      e.key === "$" ||
      e.key === "%" ||
      e.key === "^" ||
      e.key === "&" ||
      e.key === `"` ||
      e.key === `~` ||
      e.key === "`"
    ) {
      e.preventDefault();
    }
  };
  const checkSpecialChar = (e) => {
    if (!/[0-9a-zA-Z\s_.,]/.test(e.key)) {
      e.preventDefault();
    }
  };

  function handlePaste(event) {
    const pasteData = event.clipboardData.getData("text/plain");
    const regex = /^[a-zA-Z0-9\s_.,]*$/; // only allow alphanumeric characters

    if (!regex.test(pasteData)) {
      event.preventDefault();
      // show an error message or take other actions as needed
    }
  }
  var indexParam = [];
  var sheetsname = sheetid.split("_");
  var newSheetName = sheetsname.slice(1);
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
              onSubmit={finalHandleSubmit}
            >
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row">
                        <div className="col">
                          <h4
                            className="card-title mt-2"
                            style={{ fontSize: ".8rem" }}
                          >
                            {" "}
                            Evaluation Form -{" "}
                            <span> {newSheetName.join("_")}</span>
                          </h4>
                        </div>
                        <div className="col">
                          <NavLink
                            style={{
                              color: "#fff",
                              fontWeight: "bolder",
                              fontSize: "12px",
                              border: "1px solid white",
                            }}
                            to="/random/calibration-view"
                            className="btn btn-info float-lg-right"
                          >
                            <i
                              style={{ marginRight: "5px" }}
                              className="nav-icon fas fa-arrow-left"
                            />
                            Back to Calibration View
                          </NavLink>
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
                            ref={empids}
                            defaultValue={auditeeid ? auditeeid : null}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
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
                              // onChange={setdata}
                              ref={msisdns}
                              type="number"
                              name="msisdn"
                              id="msisdn"
                              defaultValue={mobile ? mobile : null}
                              style={{ fontSize: "12.4px" }}
                              required
                              readOnly
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
                              // onChange={setdata}
                              ref={callids}
                              type="text"
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              defaultValue={callid ? callid : null}
                              name="callid"
                              id="callid"
                              style={{ fontSize: "12.4px" }}
                              required
                              readOnly
                            />
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              name="calltype"
                              defaultValue={call ? call : null}
                              id="calltype"
                              style={{ fontSize: "12.4px" }}
                              required
                              readOnly
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              name="acht"
                              defaultValue={acht ? acht : null}
                              id="acht"
                              style={{ fontSize: "12.4px" }}
                              required
                              readOnly
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
                              onChange={setEmailTa}
                              onKeyDown={(e) => handleKeyEmail(e)}
                              onPaste={handlePaste}
                              type="email"
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
                              onChange={setdata}
                              type="text"
                              name="extrafield1"
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              // defaultValue={acht?acht:null}
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
                              onChange={setdata}
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="extrafield2"
                              // defaultValue={extrafield2?extrafield2:null}
                              id="extrafield2"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>
                        {sheetData
                          ? sheetData.map((resp) => {
                            return resp.any.map((element) => {
                              var req_check =
                                element.mandatory === "No" ? false : true;

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
                                      style={{ fontSize: "12.4px" }}
                                      name={element.fieldname}
                                      className="form-control form-control-sm"
                                      onChange={(e) => {
                                        handleChange(e, element.fieldname);
                                      }}
                                      required={req_check}
                                    >
                                      <option value="">Select</option>
                                      {p
                                        ? p.map((el) => {
                                          return <option>{el}</option>;
                                        })
                                        : ""}
                                    </select>
                                    {formErrors.process && (
                                      <span className="text-danger">
                                        {formErrors.process}
                                      </span>
                                    )}
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
                                      onChange={(e) => {
                                        handleChange(e, element.fieldname);
                                      }}
                                      required={req_check}
                                    />
                                    {formErrors.process && (
                                      <span className="text-danger">
                                        {formErrors.process}
                                      </span>
                                    )}
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
                                      onKeyDown={(e) => checkSpecialChar(e)}
                                      onPaste={handlePaste}
                                      name={element.fieldname}
                                      className="form-control form-control-sm"
                                      onChange={(e) => {
                                        handleChange(e, element.fieldname);
                                      }}
                                      required={req_check}
                                    />
                                    {formErrors.process && (
                                      <span className="text-danger">
                                        {formErrors.process}
                                      </span>
                                    )}
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
                              indexParam.push(element.param.length);
                              var x = [];
                              x = el.attributes.split("|");
                              parameter.push(el.parameter);
                              subparameter.push(el.subparameter);

                              let addMaxMarks2 = 0;
                              for (
                                var j = 0;
                                j < Object.values(el.subFields).length;
                                j++
                              ) {
                                addMaxMarks2 += parseInt(
                                  el.subFields[j].maxmarkss
                                );
                              }
                              maxMarks2.push(addMaxMarks2);
                              let it = 0;
                              var sum = [];
                              maxMarks2.forEach((mrk) => {
                                it += mrk;
                                sum = it;
                              });
                              finalMarks = parseInt(sum) + parseInt(itemList);

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
                                      <Typography style={{ fontSize: ".77rem" }} >
                                        {i + 1 + ". " + el.parameter}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography>
                                        <div className="row ">
                                          <div className="row col-md-12">
                                            <div
                                              className=" col-md-12"
                                              style={{ fontSize: ".75rem" }}
                                            >
                                              <label
                                                className=" text-gray-dark"
                                                title={
                                                  "Legend : " + el.legend
                                                }
                                                id={"subpara" + i}
                                              >
                                                {"1. " + el.subparameter}
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
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
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
                                                  onChange={(e) =>
                                                    handleChangeSelectMarks(
                                                      e,
                                                      i
                                                    )
                                                  }
                                                  className="form-control form-control-sm"
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
                                                  required
                                                >
                                                  {" "}
                                                  <option value="">
                                                    select
                                                  </option>
                                                  <option
                                                    id={"fatalOption" + i}
                                                    style={{
                                                      display: "none",
                                                    }}
                                                    value="00"
                                                  >
                                                    Fatal
                                                  </option>
                                                  <option
                                                    id={"naOption" + i}
                                                    style={{
                                                      display: "none",
                                                    }}
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
                                                  onChange={(e) =>
                                                    handleChangeInputAttri1(
                                                      e,
                                                      i
                                                    )
                                                  }
                                                  id={"att1para" + i}
                                                  className="form-control form-control-sm"
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
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
                                                  onChange={(e) =>
                                                    handleChangeInputAttri2(
                                                      e,
                                                      i
                                                    )
                                                  }
                                                  id={"attpara2" + i}
                                                  className="form-control form-control-sm"
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
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
                                                  onChange={(e) =>
                                                    handleChangeInputAttri3(
                                                      e,
                                                      i
                                                    )
                                                  }
                                                  id={"attpara3" + i}
                                                  className="form-control form-control-sm"
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
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
                                                  onKeyDown={handleKeyDownAtt}
                                                  onChange={(e) =>
                                                    handleChangeInputRemark(
                                                      e,
                                                      i
                                                    )
                                                  }
                                                  onPaste={(e) => {
                                                    e.preventDefault();
                                                    return false;
                                                  }}
                                                  style={{
                                                    fontSize: "12.4px",
                                                  }}
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
                                            {el.subFields
                                              ? el.subFields.map(
                                                (subf, i2) => {
                                                  var subparameter2 = [];
                                                  if (
                                                    subf.fatals !== "No"
                                                  ) {
                                                    var subfatal =
                                                      "#subp" + i + i2;
                                                    $(subfatal).css(
                                                      "color",
                                                      "red"
                                                    );
                                                  } else {
                                                    $(subfatal).css(
                                                      "color",
                                                      "black"
                                                    );
                                                  }
                                                  subparameter2.push(
                                                    subf.subparameterr
                                                  );

                                                  if (
                                                    subf.fatals !== "No"
                                                  ) {
                                                    var subfataltot =
                                                      "#totMarks" + i + i2;
                                                    $(subfataltot).css(
                                                      "color",
                                                      "red"
                                                    );
                                                  } else {
                                                    $(subfataltot).css(
                                                      "color",
                                                      "black"
                                                    );
                                                  }

                                                  if (
                                                    subf.fatals !== "No"
                                                  ) {
                                                    var subfatalmarking =
                                                      "#marking1" + i + i2;
                                                    var fatloption =
                                                      "#fatalOption1" +
                                                      i +
                                                      i2;
                                                    $(subfatalmarking).css(
                                                      "color",
                                                      "red"
                                                    );
                                                    $(fatloption).show();
                                                  } else {
                                                    $(subfatalmarking).css(
                                                      "color",
                                                      "black"
                                                    );
                                                    $(fatloption).hide();
                                                  }

                                                  if (subf.nas !== "No") {
                                                    var naopt =
                                                      "#naOption1" + i + i2;
                                                    $(naopt).show();
                                                  } else {
                                                    $(naopt).hide();
                                                  }

                                                  var x1 = [];
                                                  x1 =
                                                    subf.attributess.split(
                                                      "|"
                                                    );
                                                  var z = "#att1" + i + i2;
                                                  var zatt2 =
                                                    "#att2" + i + i2;
                                                  var zatt3 =
                                                    "#att3" + i + i2;
                                                  var zremark =
                                                    "#rmk" + i + i2;
                                                  if (
                                                    subf.fatals !== "No"
                                                  ) {
                                                    $(z).css(
                                                      "color",
                                                      "red"
                                                    );
                                                    $(zatt2).css(
                                                      "color",
                                                      "red"
                                                    );
                                                    $(zatt3).css(
                                                      "color",
                                                      "red"
                                                    );
                                                    $(zremark).css(
                                                      "color",
                                                      "red"
                                                    );
                                                  } else {
                                                    $(z).css(
                                                      "color",
                                                      "black"
                                                    );
                                                    $(zatt2).css(
                                                      "color",
                                                      "black"
                                                    );
                                                    $(zatt3).css(
                                                      "color",
                                                      "black"
                                                    );
                                                    $(zremark).css(
                                                      "color",
                                                      "black"
                                                    );
                                                  }

                                                  return (
                                                    <>
                                                      <div
                                                        className=" col-md-12"
                                                        style={{
                                                          fontSize: ".75rem",
                                                        }}
                                                      >
                                                        <label
                                                          className=" text-gray-dark"
                                                          title={
                                                            "Legend : " +
                                                            subf.legends
                                                          }
                                                          id={
                                                            "subp" + i + i2
                                                          }
                                                        >
                                                          {i2 +
                                                            2 +
                                                            ". " +
                                                            subparameter2}
                                                        </label>
                                                      </div>
                                                      <div className="row col-md-12">
                                                        <div
                                                          style={{
                                                            fontSize:
                                                              "12.4px",
                                                          }}
                                                          className="form-group col-md-2"
                                                        >
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="exampleInputEmail"
                                                          >
                                                            Max Marks:
                                                          </label>
                                                          <input
                                                            type="text"
                                                            value={
                                                              subf.maxmarkss
                                                                ? subf.maxmarkss
                                                                : ""
                                                            }
                                                            id={
                                                              "totMarks" +
                                                              i +
                                                              i2
                                                            }
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            name="maxmarks"
                                                            className="form-control form-control-sm col-md-8"
                                                            aria-describedby="emailHelp"
                                                            readOnly
                                                          />
                                                        </div>
                                                        <div className=" form-group col-md-2">
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="xyz"
                                                          >
                                                            Marking:
                                                          </label>
                                                          <select
                                                            name="markings"
                                                            id={
                                                              "marking1" +
                                                              i +
                                                              i2
                                                            }
                                                            onChange={(e) =>
                                                              handleChangeIncrementedSelectMarks(
                                                                e,
                                                                i,
                                                                i2
                                                              )
                                                            }
                                                            className="form-control form-control-sm mark"
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            required
                                                          >
                                                            {" "}
                                                            <option value="">
                                                              {" "}
                                                              select{" "}
                                                            </option>
                                                            <option
                                                              id={
                                                                "fatalOption1" +
                                                                i +
                                                                i2
                                                              }
                                                              style={{
                                                                display:
                                                                  "none",
                                                              }}
                                                              value="00"
                                                            >
                                                              Fatal
                                                            </option>
                                                            <option
                                                              id={
                                                                "naOption1" +
                                                                i +
                                                                i2
                                                              }
                                                              style={{
                                                                display:
                                                                  "none",
                                                              }}
                                                              value="-1"
                                                            >
                                                              NA
                                                            </option>
                                                            <option
                                                              value={
                                                                subf.opt1s
                                                              }
                                                            >
                                                              {subf.opt1s}
                                                            </option>
                                                            <option
                                                              value={
                                                                subf.opt2s
                                                              }
                                                            >
                                                              {subf.opt2s}
                                                            </option>
                                                            {!subf.opt3s ? (
                                                              <option
                                                                style={{
                                                                  display:
                                                                    "none",
                                                                }}
                                                                value={
                                                                  subf.opt3s
                                                                }
                                                              >
                                                                {subf.opt3s}{" "}
                                                              </option>
                                                            ) : (
                                                              <option
                                                                value={
                                                                  subf.opt3s
                                                                }
                                                              >
                                                                {subf.opt3s}{" "}
                                                              </option>
                                                            )}
                                                            {!subf.opt4s ? (
                                                              <option
                                                                style={{
                                                                  display:
                                                                    "none",
                                                                }}
                                                                value={
                                                                  subf.opt4s
                                                                }
                                                              >
                                                                {subf.opt4s}
                                                              </option>
                                                            ) : (
                                                              <option
                                                                value={
                                                                  subf.opt4s
                                                                }
                                                              >
                                                                {subf.opt4s}
                                                              </option>
                                                            )}
                                                          </select>
                                                          <p
                                                            id="errmark"
                                                            style={{
                                                              display:
                                                                "none",
                                                            }}
                                                            className="text-danger"
                                                          >
                                                            required!
                                                          </p>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="xyz"
                                                          >
                                                            Attribute 1:
                                                          </label>
                                                          <select
                                                            name="attributes1"
                                                            onChange={(e) =>
                                                              handleChangeInputAttri1s(
                                                                e,
                                                                i,
                                                                i2
                                                              )
                                                            }
                                                            id={
                                                              "att1" +
                                                              i +
                                                              i2
                                                            }
                                                            className="form-control form-control-sm mark"
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            required
                                                          >
                                                            <option value="">
                                                              Select
                                                            </option>
                                                            {x1.map(
                                                              (ind) => {
                                                                return (
                                                                  <option>
                                                                    {" "}
                                                                    {ind}
                                                                  </option>
                                                                );
                                                              }
                                                            )}
                                                          </select>
                                                        </div>
                                                        <div className=" form-group col-md-2">
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="xyz"
                                                          >
                                                            Attribute 2:
                                                          </label>
                                                          <select
                                                            name="attribute2"
                                                            onChange={(e) =>
                                                              handleChangeInputAttri2s(
                                                                e,
                                                                i,
                                                                i2
                                                              )
                                                            }
                                                            id={
                                                              "att2" +
                                                              i +
                                                              i2
                                                            }
                                                            className="form-control form-control-sm mark"
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            required
                                                          >
                                                            <option value="">
                                                              Select
                                                            </option>
                                                            {x1.map(
                                                              (ind) => {
                                                                return (
                                                                  <option>
                                                                    {" "}
                                                                    {ind}
                                                                  </option>
                                                                );
                                                              }
                                                            )}
                                                          </select>
                                                        </div>
                                                        <div className=" form-group col-md-2">
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="xyz"
                                                          >
                                                            Attribute 3:
                                                          </label>
                                                          <select
                                                            name="attribute3"
                                                            onChange={(e) =>
                                                              handleChangeInputAttri3s(
                                                                e,
                                                                i,
                                                                i2
                                                              )
                                                            }
                                                            id={
                                                              "att3" +
                                                              i +
                                                              i2
                                                            }
                                                            className="form-control form-control-sm mark"
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            required
                                                          >
                                                            <option value="">
                                                              {" "}
                                                              Select{" "}
                                                            </option>
                                                            {x1.map(
                                                              (ind) => {
                                                                return (
                                                                  <option>
                                                                    {" "}
                                                                    {ind}
                                                                  </option>
                                                                );
                                                              }
                                                            )}
                                                          </select>
                                                        </div>
                                                        <div className="form-group col-md-2">
                                                          <label
                                                            style={{
                                                              fontSize:
                                                                "11px",
                                                            }}
                                                            htmlFor="exampleInputEmail"
                                                          >
                                                            Remark:
                                                          </label>
                                                          <textarea
                                                            rows="1"
                                                            id={
                                                              "rmk" + i + i2
                                                            }
                                                            onKeyDown={
                                                              handleKeyDownAtt1
                                                            }
                                                            type="text"
                                                            onChange={(e) =>
                                                              handleChangeInputRemarks(
                                                                e,
                                                                i,
                                                                i2
                                                              )
                                                            }
                                                            onPaste={(
                                                              e
                                                            ) => {
                                                              e.preventDefault();
                                                              return false;
                                                            }}
                                                            style={{
                                                              fontSize:
                                                                "12.4px",
                                                            }}
                                                            name="remark"
                                                            className="form-control form-control-sm mark"
                                                            aria-describedby="emailHelp"
                                                            required
                                                          />
                                                        </div>
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              )
                                              : null}
                                          </div>
                                        </div>
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
                          <>
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
                                  marginTop: "14px",
                                }}
                                className="form-group col-sm-2"
                              >
                                <label
                                  style={{
                                    fontSize: "11px",
                                    display: "none",
                                  }}
                                  htmlFor="exampleInputEmail"
                                >
                                  WOW Call:
                                </label>

                                <p>Is it wow call</p>
                              </div>
                              <div
                                style={{ marginTop: "15px" }}
                                className=" form-group col-sm-2"
                              >
                                <label
                                  style={{ fontSize: "11px", display: "none" }}
                                  htmlFor="xyz"
                                >
                                  Option:
                                </label>
                                <select
                                  name="wow_call_option"
                                  id="option1"
                                  // defaultValue={index?index.wow_call_option:null}
                                  ref={wow_call_options}
                                  className="form-control form-control-sm"
                                  style={{ fontSize: "12.4px" }}
                                >
                                  <option value="no">No</option>
                                  <option id="wow" value="yes">
                                    Yes
                                  </option>
                                </select>
                              </div>

                              <div
                                style={{
                                  fontSize: "12.4px",
                                  display: "none",
                                  marginTop: "-8px",
                                }}
                                className="form-group col-sm-5"
                                id="inputoption"
                              >
                                <label
                                  style={{ fontSize: "11px" }}
                                  htmlFor="xyz"
                                ></label>
                                <textarea
                                  rows="1"
                                  type="text"
                                  onKeyDown={handleKeyDownWow}
                                  ref={wow_call_remarks}
                                  style={{
                                    fontSize: "12.4px",
                                  }}
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
                                  marginTop: "14px",
                                }}
                                // border-bottom: solid #4b4e4e  1px;
                                className="form-group col-sm-2"
                              >
                                <label
                                  style={{ fontSize: "11px", display: "none" }}
                                  htmlFor="exampleInputEmail"
                                >
                                  ZTP:
                                </label>
                                <p>Is it ZTP</p>
                              </div>
                              <div
                                style={{
                                  marginTop: "10px",
                                }}
                                className=" form-group col-md-2"
                              >
                                <label
                                  style={{ fontSize: "11px", display: "none" }}
                                  htmlFor="xyz"
                                >
                                  Option:
                                </label>
                                <select
                                  name="ztp_option"
                                  ref={ztp_options}
                                  className="form-control form-control-sm"
                                  id="option2"
                                  style={{ fontSize: "12.4px" }}
                                >
                                  <option value="no">No</option>
                                  <option id="ztp" value="yes">
                                    Yes
                                  </option>
                                </select>
                              </div>
                              <div
                                style={{
                                  fontSize: "12px",
                                  display: "none",
                                  marginTop: "-13px",
                                }}
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
                                  id="ztp1"
                                  onKeyDown={handleKeyDownZtp}
                                  ref={ztp_remarks}
                                  style={{
                                    fontSize: "12.4px",
                                    marginTop: "8px",
                                  }}
                                  name="ztp_remark"
                                  className="form-control form-control-sm"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div>

                            {/* <div
                              className="row mt-1 col-md-12"
                              id="textbox4"
                              style={{
                                border: "solid #dfe6e9 1px",
                                 display:"none",
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
                                  ref={marking_bonus_calls}
                                  className="form-control form-control-sm"
                                  style={{ fontSize: "12.4px" }}
                                >
                                  <option defaultValue="0">0</option>
                                </select>
                              </div>
                              <div className=" form-group col-sm-2">
                                <label
                                  style={{ fontSize: "11px" }}
                                  htmlFor="xyz"
                                >
                                  Option:
                                </label>
                                <select
                                  name="option_bonus_call"
                                  id="option3"
                                  ref={option_bonus_calls}
                                  // defaultValue={index?index.option_bonus_call:null}
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
                                <textarea
                                  rows="1"
                                  type="text"
                                  onKeyDown={handleKeyMarking}
                                  ref={bonus_call_remarks}
                                  style={{
                                    fontSize: "12.4px",
                                    marginTop: "8px",
                                  }}
                                  name="bonus_call_remark"
                                  className="form-control form-control-sm"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                            </div> */}
                            {/* <div
                            className="row mt-1 col-md-12"
                            id="textbox4"
                            style={{
                              border: "solid #dfe6e9 1px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12.4px", 
                                marginTop:"10px"
                              }}
                              className="form-group col-md-2"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="exampleInputEmail"
                              >
                                 Feedback:
                              </label>
                              <span className="text-danger">*</span>

                            </div>
                           
                            <div
                              style={{
                                marginTop:"10px"
                              }} 
                            className=" form-group col-sm-5">
                           
                              <textarea
                                type="text"
                                onChange={setdata}
                                onKeyDown={handleKeyDownFeedback}
                                style={{ fontSize: "12.4px" }}
                                name="feedback"
                                id="feedback"
                                className="form-control form-control-sm mark"
                                aria-describedby="emailHelp"
                                required
                              />
                            </div>
                           
                          </div> */}
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
                                  marginTop: "10px",
                                }}
                                className="form-group col-md-2"
                              >
                                <label
                                  style={{ fontSize: "11px" }}
                                  htmlFor="exampleInputEmail"
                                >
                                  Feedback:
                                </label>
                                <span className="text-danger">*</span>
                              </div>

                              <div
                                style={{
                                  marginTop: "10px",
                                }}
                                className=" form-group col-sm-8"
                              >
                                <textarea
                                  type="text"
                                  onChange={setdata}
                                  onKeyDown={handleKeyDownFeedback}
                                  style={{ fontSize: "12.4px", height: "5rem" }}
                                  name="feedback"
                                  id="feedback"
                                  className="form-control form-control-sm mark"
                                  aria-describedby="emailHelp"
                                  required
                                />
                              </div>
                            </div>
                          </>
                          {/* }):null} */}
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
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Fatal Count:
                              </label>
                              <input
                                type="text"
                                ref={fatalcount}
                                value={count ? count : ""}
                                style={{ fontSize: "12.4px" }}
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
                              className="form-group col-sm-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Maximum Marks:
                              </label>
                              <input
                                type="text"
                                id="maxmarks"
                                ref={maximummarks}
                                value={totalMarks ? totalMarks : ""}
                                style={{ fontSize: "12.4px" }}
                                name="maximummarks"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                                readOnly
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
                                Obtained Marks:
                              </label>
                              <input
                                type="text"
                                ref={obtainedmarks}
                                value={obtainMarks ? obtainMarks : ""}
                                style={{ fontSize: "12.4px" }}
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
                                ref={finalscore}
                                value={percnt ? percnt + "%" : ""}
                                style={{ fontSize: "12.4px" }}
                                name="finalscore"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
                                readOnly
                              />
                            </div>
                          </div>
                          <center>
                            <button
                              type="click"
                              id="chk"
                              onClick={handleCheckButton}
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              }}
                              className="btn btn-info form-group "
                            >
                              CHECK
                            </button>
                            <button
                              type="submit"
                              id="submitbutton"
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              }}
                              className="btn btn-info form-group ml-1"
                            >
                              SUBMIT
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

export default CalibrationAudit;
