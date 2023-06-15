import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import Wave from "react-wavify";
import { isAuth } from "../auth/helpers";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const SuperAuditAssignment = () => {
  const navigate = useNavigate();
  const [sheetData, setSheetData] = useState("");
  const [count, setCount] = useState(["0"]);
  const [fieldData, setFieldData] = useState({});
  const [obtainMarks, setObtainMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState({});
  const [getEmpId, setEmpId] = useState("");
  const [percnt, setPercent] = useState({});
  const [dataSource, setDataSource] = useState("");
  const [empDetails, setEmpDetails] = useState("");
  const [attri1, setAttri1] = useState({});
  const [attri2, setAttri2] = useState({});
  const [attri3, setAttri3] = useState({});
  const [remark, setRemark] = useState("");
  const [subParaAttributes1, setSubParaAttributes1] = useState("");
  const [subParaAttributes2, setSubParaAttributes2] = useState("");
  const [subParaAttributes3, setSubParaAttributes3] = useState("");
  const [subParaRemarks, setSubParaRemarks] = useState("");
  const [inputFields, setInputFields] = useState("");
  const [subParaMarks, setSubParaMarks] = useState("");
  const [isFatal, setIsFatal] = useState("");
  const [emails, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  //for recording
  const [audioURLs, setAudioURLs] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

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
  const calltype = query.get("calltype") ? query.get("calltype") : "";
  const mobile = query.get("mobile") ? query.get("mobile") : "";
  const acht = query.get("acht") ? query.get("acht") : "";
  const callid = query.get("callid") ? query.get("callid") : "";

  const setEmailTa = (e) => {
    const { name, value } = e.target;
    setEmail((emails) => {
      return {
        ...emails,
        [name]: value,
      };
    });
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldData((fieldData) => {
      return {
        ...fieldData,
        [name]: value,
      };
    });
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
    var msisdn = msisdns.current.value;
    var employeeid = empids.current.value;
    let totalmarks = totalMarks;
    var obtainMarks = obtainedmarks.current.value;
    var maximumMarks = maximummarks.current.value;
    var fatalCount = fatalcount.current.value;
    var sheet_name = sheetid;
    let sub_process = isAuth().sub_process;
    let clientname = isAuth().clientname;
    let process = isAuth().Process;
    var option_bonus_call = option_bonus_calls.current.value;
    var marking_bonus_call = marking_bonus_calls.current.value;
    var ztp_option = ztp_options.current.value;
    var wow_call_option = wow_call_options.current.value;
    let counts = count[0];
    var feedback = dataSource.feedback;
    var { extrafield1 } = dataSource;
    var { extrafield2 } = dataSource;
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
      var OH = empDetails.oh;
      var QH = empDetails.QH;
      var AH = empDetails.AH;
      var TH = empDetails.TH;
      var Report_to_Name = empDetails.rptToName;
      var AH_Name = empDetails.AHName;
      var TH_Name = empDetails.THName;
      var QH_name = empDetails.QHName;
      var OH_Name = empDetails.OHName;
      var Report_to = empDetails.ReportTo;
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
      var DOJ = empDetails.DOJ;
      var audit_type = "superaudit";
      var location = isAuth().location;
      const responce = "Data saved successfully";

      const postdata1 = async () => {
        fetch(audioURLs)
          .then((response) => response.blob())
          .then((blob) => {
            const fd = new FormData();
            fd.append("audioURL", blob, "audiofile.weba"); // where `.ext` matches file `MIME` type
            fd.append("totalmarks", totalmarks);
            fd.append("employeeid", employeeid);
            fd.append("inputFields", JSON.stringify(inputFields));
            fd.append("sheet_name", sheet_name);
            fd.append("attri1", JSON.stringify(attri1));
            fd.append("attri2", JSON.stringify(attri2));
            fd.append("attri3", JSON.stringify(attri3));
            fd.append("ztp_remark", ztp_remark);
            fd.append("ztp_option", ztp_option);
            fd.append("percnt", percnt);
            fd.append("wow_call_option", wow_call_option);
            fd.append("callid", callid);
            fd.append("feedback", feedback);
            fd.append("msisdn", msisdn);
            fd.append("remark", JSON.stringify(remark));
            fd.append("option_bonus_call", option_bonus_call);
            fd.append("fieldData", JSON.stringify(fieldData));
            fd.append("counts", counts);
            fd.append("marking_bonus_call", marking_bonus_call);
            fd.append("bonus_call_remark", bonus_call_remark);
            fd.append("wow_call_remark", wow_call_remark);
            fd.append("parameter", JSON.stringify(parameter));
            fd.append("subparameter", JSON.stringify(subparameter));
            fd.append("subParaMarks", JSON.stringify(subParaMarks));
            fd.append("subParaAttributes1", JSON.stringify(subParaAttributes1));
            fd.append("subParaAttributes2", JSON.stringify(subParaAttributes2));
            fd.append("subParaAttributes3", JSON.stringify(subParaAttributes3));
            fd.append("subParaRemarks", JSON.stringify(subParaRemarks));
            fd.append("fatalCount", fatalCount);
            fd.append("maximumMarks", maximumMarks);
            fd.append("cm_id", cm_id);
            fd.append("auditorid", auditorid);
            fd.append("auditor_name", auditor_name);
            fd.append("auditee_id", auditee_id);
            fd.append("auditee_name", auditee_name);
            fd.append("Report_to", Report_to);
            fd.append("Report_to_Name", Report_to_Name);
            fd.append("OH", OH);
            fd.append("OH_Name", OH_Name);
            fd.append("AH", AH);
            fd.append("AH_Name", AH_Name);
            fd.append("TH", TH);
            fd.append("TH_Name", TH_Name);
            fd.append("QH", QH);
            fd.append("QH_Name", QH_name);
            fd.append("processDetails", processDetails);
            fd.append("DOJ", DOJ);
            fd.append("audit_type", audit_type);
            fd.append("extrafield2", extrafield2);
            fd.append("extrafield1", extrafield1);
            fd.append("acht", acht);
            fd.append("calltype", calltype);
            fd.append("obtainMarks", obtainMarks);
            fd.append("location", location);
            fd.append("process", process);
            fd.append("sub_process", sub_process);
            fd.append("clientname", clientname);
            fd.append("responce", responce);
            fd.append("sheetStructureid", sheetStructureid);
            fd.append("email", email);
            return fetch(`${url}/api/sheet-list-submit-for-audio`, {
              method: "POST",
              body: fd,
            });
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Succesfully saved!");
              updateSuperAuditAssignment();
              navigate("/random/super-audit-view", {
                state: "Successfully Audited!",
              });
            }
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error Occured!");
          });
      };

      //Update audit status into super assignment
      const updateSuperAuditAssignment = async () => {
        const res1 = await fetch(`${url}/api/update-super-assignment`, {
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

  //For audio recordin
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.

    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      const objectURL = URL.createObjectURL(e.data);
      setAudioURLs(objectURL);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };
  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return new MediaRecorder(stream);
  }

  //Audio recording
  $(function () {
    $("#recordbutton").on("click", function () {
      $("#audiofunction").hide();
      $("#wavediv").css("display", "block");
    });
    $("#stopbutton").on("click", function () {
      $("#audiofunction").show();
      $("#wavediv").hide();
    });
  });

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

  const handleKeyDownAtt2 = (e) => {
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

  const sheetsname = sheetid.split("_");
  var newSheetName = sheetsname.slice(1);
  var addnewSheetName = "";
  for (var i = 0; i < newSheetName.length; i++) {
    addnewSheetName += newSheetName[i];
    if (i < newSheetName.length - 1) {
      addnewSheetName += "_";
    }
  }
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
              encType="multipart/form-data"
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
                            Evaluation Form-<span>{addnewSheetName}</span>
                          </h4>
                        </div>
                        <div className="col">
                          <NavLink
                            style={{
                              fontWeight: "bolder",
                              color: "white",
                              fontSize: "12px",
                              border: "1px solid white",
                            }}
                            to="/random/super-audit-view"
                            className="btn btn-info offset-7"
                          >
                            <i
                              style={{ marginRight: "5px" }}
                              className="nav-icon fas fa-arrow-left"
                            />
                            Back to Super Audit View
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="calltype"
                              defaultValue={calltype ? calltype : null}
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
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
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
                              // ref={extrafield1s}
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="extrafield1"
                              // defaultValue={acht ? acht : null}
                              id="extrafield1"
                              style={{ fontSize: "12.4px" }}
                              required
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
                              // ref={extrafield2s}
                              onKeyDown={(e) => checkSpecialChar(e)}
                              onPaste={handlePaste}
                              type="text"
                              name="extrafield2"
                              // defaultValue={acht ? acht : null}
                              id="extrafield2"
                              style={{ fontSize: "12.4px" }}
                              required
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
                                      // value={fieldData[resp.fieldname]}
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
                                  // style={{ display: "none" }}
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
                                      // value={fieldData[resp.fieldname]}
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
                                      name={element.fieldname}
                                      onKeyDown={(e) => checkSpecialChar(e)}
                                      onPaste={handlePaste}
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
                                      <Typography style={{ fontSize: ".77rem", }} >
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
                                                className="text-gray-dark"
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
                          {" "}
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
                                  marginTop: "13px",
                                }}
                                className="form-group col-md-2"
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
                                style={{ marginTop: "11px" }}
                                className=" form-group col-md-2"
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
                                  marginTop: "-14px",
                                }}
                                className="form-group col-md-5"
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
                                    marginTop: "8px",
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
                                  fontSize: "12.4px",
                                  marginTop: "15px",
                                }}
                                className="form-group col-md-2"
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
                                  marginTop: "13px",
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
                                  marginTop: "-11px",
                                }}
                                className="form-group col-md-5"
                                id="inputoption1"
                              >
                                <label
                                  style={{ fontSize: "12.4px" }}
                                  htmlFor="xyz"
                                ></label>
                                <textarea
                                  rows="1"
                                  type="text"
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
                              <div className=" form-group col-md-2">
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
                                className="form-group col-md-5"
                                id="inputoption2"
                              >
                                <label
                                  style={{ fontSize: "11px" }}
                                  htmlFor="xyz"
                                ></label>
                                <textarea
                                  rows="1"
                                  onKeyDown={handleKeyMarking}
                                  type="text"
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
                                  style={{ fontSize: "11px", marginTop: "10px" }}
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
                                className="form-group col-md-8"
                                id="inputoption2"
                              >
                                <textarea
                                  type="text"
                                  rows="2"
                                  onChange={setdata}
                                  style={{
                                    fontSize: "12.4px",
                                    height: "5rem",
                                  }}
                                  onKeyDown={handleKeyDownFeedback}
                                  name="feedback"
                                  id="feedback"
                                  className="form-control form-control-sm"
                                  aria-describedby="emailHelp"
                                  required
                                />
                              </div>
                            </div>
                          </>
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
                          <div style={{
                            marginTop: "10px",
                          }} className="form-group row">
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
                              className="form-group col-md-6"
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
                          {/* <hr></hr> */}
                          <div className=" form-group mt-2 ">
                            <audio
                              src={audioURLs}
                              id="audiofunction"
                              className=" mt-2"
                              style={{ width: "100%" }}
                              controls
                            />
                            <div
                              id="wavediv"
                              style={{
                                width: "100%",
                                height: "75px",
                                display: "none",
                              }}
                            >
                              <Wave
                                style={{ height: "80%", width: "100%" }}
                                fill="#4b4b4b"
                                paused={false}
                                options={{
                                  height: 15,
                                  amplitude: 15,
                                  speed: 0.15,
                                  points: 3,
                                }}
                                id="waveform"
                              />
                            </div>
                          </div>
                          <center>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={startRecording}
                              disabled={isRecording}
                              id="recordbutton"
                            >
                              Record
                            </button>
                            <button
                              className="btn btn-sm btn-danger ml-1"
                              onClick={stopRecording}
                              disabled={!isRecording}
                              id="stopbutton"
                            >
                              Stop
                            </button>
                          </center>
                          <center>
                            <button
                              type="click"
                              onClick={handleCheckButton}
                              style={{
                                fontSize: "12px",
                                marginTop: "1rem",
                              }}
                              id="chk"
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

export default SuperAuditAssignment;
