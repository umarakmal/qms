import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../auth/helpers";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const Evaluation5 = () => {
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
  const [empDetails, setEmpDetails] = useState("");
  const [getAh, setAh] = useState("");
  const [getQh, setQh] = useState("");
  const [getOh, setOh] = useState("");
  const [getReportTo, setReportTo] = useState("");
  const [getTh, setTh] = useState("");
  const [isFatal, setIsFatal] = useState("");
  const [getDOJ, setDOJ] = useState("");
  const [getReportToName, setReportToName] = useState("");
  const [getThName, setThName] = useState("");
  const [getAhName, setAhName] = useState("");
  const [getQhName, setQhName] = useState("");
  const [getOhName, setOhName] = useState("");
  const [getCmid, setCmid] = useState("");
  const [employee, setEmployee] = useState("");
  const [sheetid, setSheetid] = useState("");
  const [sheetName, setSheetName] = useState({
    msisdn: "",
    callid: "",
    extrafield1: "",
    extrafield2: "",
    calltype: "",
    acht: "",
    wow_call_option: "no",
    wow_call_remark: "",
    ztp_option: "no",
    ztp_remark: "",
    marking_bonus_call: "0",
    bonus_call_remark: "",
    feedback: "",
    option_bonus_call: "no",
  });
  const [formErrors, setFormErrors] = useState({});
  const [emails, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
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

  const setdata = (e) => {
    const { name, value } = e.target;
    setSheetName((sheetName) => {
      return {
        ...sheetName,
        [name]: value,
      };
    });
  };

  const setdata1 = (e) => {
    const { name, value } = e.target;
    setEmployee((employee) => {
      return {
        ...employee,
        [name]: value,
      };
    });

    const getdata3 = async () => {
      const employeeid = e.target.value;
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
        setTh(data3[0].TH);
      }
    };
    getdata3();
  };

  useEffect(() => {
    if (location.state != null) {
      $("#textbox1").show();
      $("#textbox2").show();
      $("#textbox3").show();
      $("#textbox4").show();
      $("#textbox5").show();
      $("#textbox6").show();
      $("#sheethide").hide();
      setSheetData(location.state.data);
      setIsFatal(location.state.data[0].param);
      setSheetid(location.state.getdynamiccollection);
      setTimeout(() => {
        xyz();
      }, 100);
    }
  }, []);

  //Get all cmid via employeeid
  useEffect(() => {
    const getdata1 = async () => {
      const EmployeeID = await isAuth().EmployeeID;
      const client = await isAuth().client_name;
      const emp_type = await isAuth().usertype;
      const res = await fetch(`${url}/api/getall-cmid-via-empid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeID,
          client,
          emp_type,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setCmid(data[0]);

        const getdata = async () => {
          const cm_id = await data[0].cm_id;
          const res = await fetch(`${url}/api/get-dynamic-collection-names`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cm_id,
            }),
          });
          const data1 = await res.json();
          if (res.status === 422 || !data1) {
            console.log("error ");
          } else {
            setSheets(data1);
          }
        };
        getdata();

        const getdata2 = async () => {
          const cm_id = await data[0].cm_id;
          const res = await fetch(`${url}/api/get-whole-details-employee`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cm_id,
            }),
          });
          const data2 = await res.json();
          if (res.status === 422 || !data2) {
            console.log("error ");
          } else {
            setEmpDetails(data2);
          }
        };
        getdata2();
      }
    };
    getdata1();
  }, []);

  const xyz = () => {
    $("#chk").trigger("click", function () { });
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

  const finalHandleSubmit = (e) => {
    e.preventDefault();
    const { email } = emails;
    let sheetStructureid = sheetData[0]._id;
    let result = isAuth().clientname.concat("|", isAuth().Process);
    let processDet = result.concat("|", isAuth().sub_process);
    let processDetails = processDet.concat("|", isAuth().cm_id);
    let totalmarks = totalMarks;
    let sub_process = isAuth().sub_process;
    let clientname = isAuth().clientname;
    let process = isAuth().Process;
    let counts = count;
    let cm_id = getCmid.cm_id;
    let location = getCmid.location;
    let auditorid = isAuth().EmployeeID;
    let auditor_name = isAuth().EmployeeName;
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
    const {
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
      calltype,
      acht,
    } = sheetName;
    const { employeeid } = employee;
    var emp = employeeid.split("-");
    let auditee_id = emp[1];
    let auditee_name = emp[0];
    if (Object.values(fieldData).length <= 0) {
      formErrors["process"] = `field is required`;
      setFormErrors(formErrors);
      return false;
    } else if (Object.values(inputFields).length !== indexParam[0]) {
      return false;
    } else if (!msisdn || !feedback || !callid || !inputFields) {
      return false;
    } else {
      const audit_type = "manual";
      const sheet_name = sheetid;
      const responce = "Data saved successfully";
      const postdata1 = async () => {
        const res1 = await fetch(`${url}/api/sheet-list-submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
            cm_id,
            location,
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
            QH_Name,
            TH_Name,
            AH_Name,
            DOJ,
            Report_to_Name,
            processDetails,
            audit_type,
            calltype,
            acht,
            sheetStructureid,
            email,
          }),
        });

        const data1 = await res1.json();
        if (res1.status === 422 || !data1) {
          toast.error("something went wrong");
        } else if (res1.status === 200) {
          navigate("/sheetlist", { state: "Successfull" });
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
  });

  let itemList = [];
  let parameter = [];
  let subparameter = [];
  let maxMarks2 = [];
  let finalMarks = [];

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
        $(z).css("color", "black");
        $(subp).css("color", "black");
        $(rmk).css("color", "black");
        $(mrk).css("color", "black");
        $(att1).css("color", "black");
        $(att2).css("color", "black");
        $(att3).css("color", "black");
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

  $(function () {
    $("#feedback").on("paste", function () {
      setTimeout(function () {
        //get the value of the input text
        var data = $("#feedback").val();
        //replace the special characters to ''
        var dataFull = data.replace(/[^\w\s]/gi, "");
        //set the new value of the input text without special characters
        $("#feedback").val(dataFull);
      });
    });
    $("#wow1").on("paste", function () {
      setTimeout(function () {
        //get the value of the input text
        var data = $("#wow1").val();
        //replace the special characters to ''
        var dataFull = data.replace(/[^\w\s]/gi, "");
        //set the new value of the input text without special characters
        $("#wow1").val(dataFull);
      });
    });
    $("#ztp1").on("paste", function () {
      setTimeout(function () {
        //get the value of the input text
        var data = $("#ztp1").val();
        //replace the special characters to ''
        var dataFull = data.replace(/[^\w\s]/gi, "");
        //set the new value of the input text without special characters
        $("#ztp1").val(dataFull);
      });
    });
    $("#marking1").on("paste", function () {
      setTimeout(function () {
        //get the value of the input text
        var data = $("#marking1").val();
        //replace the special characters to ''
        var dataFull = data.replace(/[^\w\s]/gi, "");
        //set the new value of the input text without special characters
        $("#marking1").val(dataFull);
      });
    });
  });

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

  const sheetsname = sheetid.split("_");
  var newSheetName = sheetsname.slice(1);
  var addnewSheetName = "";
  for (var i = 0; i < newSheetName.length; i++) {
    addnewSheetName += newSheetName[i];
    if (i < newSheetName.length - 1) {
      addnewSheetName += "_";
    }
  }
  var dynamicFieldVal = [];
  var indexParam = [];
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
                  <div className="card card-info ">
                    <div className="card-header">
                      <h4 className="card-title">
                        Sheet List: {addnewSheetName}
                      </h4>
                    </div>
                    <div className="card-body">
                      <div
                        className="row mt-2"
                        id="textbox6"
                        style={{
                          border: "solid #dfe6e9 1px",
                        }}
                      >
                        <div className="form-group col-sm-3">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Impact/Emp ID:
                          </label>
                          <select
                            name="employeeid"
                            id="employeeid"
                            onChange={setdata1}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">Select</option>
                            {empDetails
                              ? empDetails.map((element) => {
                                return (
                                  <option key={element}>{element}</option>
                                );
                              })
                              : null}
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
                              min={"1000000000"}
                              max={"1000000000000"}
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="callid"
                              id="callid"
                              maxLength={"20"}
                              style={{ fontSize: "12.4px" }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="form-group">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              CALLTYPE:
                            </label>
                            <input
                              className="form-control form-control-sm"
                              onChange={setdata}
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="calltype"
                              style={{ fontSize: "12.4px" }}
                              required
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
                              onChange={setdata}
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="number"
                              name="acht"
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="extrafield2"
                              style={{ fontSize: "12.4px" }}
                            />
                          </div>
                        </div>
                        {sheetData
                          ? sheetData.map((resp) => {
                            return resp.any.map((element) => {
                              // if (element.mandatory === "Yes") {
                              //   dynamicFieldVal.push("Yes");
                              // }
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
                                      <Typography
                                        style={{ fontSize: ".77rem" }}
                                      >
                                        {i + 1 + ". " + el.parameter}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Typography>
                                        <div className="row ">
                                          <div className="row col-md-12">
                                            <div
                                              className=" col-md-12 "
                                              style={{ fontSize: ".75rem", }}
                                            >
                                              <label
                                                title={
                                                  "Legend : " + el.legend
                                                }
                                                id={"subpara" + i}
                                                className="text-gray-dark"
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
                                                          fontSize:
                                                            ".75rem",
                                                        }}
                                                      >
                                                        <label
                                                          title={
                                                            "Legend : " +
                                                            subf.legends
                                                          }
                                                          id={
                                                            "subp" + i + i2
                                                          }
                                                          className="text-gray-dark"
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
                                marginTop: "13px",
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

                              <p>Is it a wow call</p>
                            </div>

                            <div
                              style={{
                                marginTop: "8px",
                              }}
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
                                onChange={setdata}
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
                                marginTop: "-10px",
                              }}
                              className="form-group col-sm-5"
                              id="inputoption"
                            >
                              <label
                                style={{ fontSize: "11px" }}
                                htmlFor="xyz"
                              ></label>
                              <textarea
                                type="text"
                                rows="1"
                                id="wow1"
                                onKeyDown={handleKeyDownWow}
                                // value={element.parameter || ""}
                                onChange={setdata}
                                style={{ fontSize: "12.4px" }}
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
                              border: "solid #dfe6e9 1px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "12.4px",
                                marginTop: "13px",
                              }}
                              // border-bottom: solid #dfe6e9  1px;
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
                              style={{ marginTop: "8px" }}
                              className=" form-group col-sm-2"
                            >
                              <label
                                style={{
                                  fontSize: "11px",
                                  display: "none",
                                  marginTop: "8px",
                                }}
                                htmlFor="xyz"
                              >
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
                                <option id="ztp" value="yes">
                                  Yes
                                </option>
                              </select>
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                display: "none",
                                marginTop: "-18px",
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
                                onChange={setdata}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
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
                              display: "none"
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
                            <div className="form-group col-md-2">
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
                              <textarea
                                rows="1"
                                type="text"
                                onKeyDown={handleKeyMarking}
                                id="marking1"
                                onChange={setdata}
                                style={{ fontSize: "12.4px", marginTop: "8px" }}
                                name="bonus_call_remark"
                                className="form-control form-control-sm"
                                aria-describedby="emailHelp"
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
                        </div>
                        <div
                          className="col-md-4 mt-1"
                          id="textbox5"
                          style={{
                            float: "right",
                            border: "solid #dfe6e9 1px",
                          }}
                        >
                          {/* <center></center> */}
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
                                onChange={setdata}
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
                              className="form-group col-md-6"
                            >
                              <label style={{ fontSize: "11px" }} htmlFor="xyz">
                                Maximum Marks:
                              </label>
                              <input
                                type="text"
                                id="maxmarks"
                                onChange={setdata}
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
                                onChange={setdata}
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
                                onChange={setdata}
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
                                display: "none",
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

export default Evaluation5;
