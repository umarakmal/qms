import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/QmsSheetCreat.css";
import "../../css/Responsive.css";
import { isAuth } from "../auth/helpers";
import { TagsInput } from "react-tag-input-component";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const DynCreateSheet = () => {
  const [dataSource, setDataSource] = useState("");
  const [formValues, setFormValues] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [getMaxMarks, setMaxMarks] = useState("");
  const [getMaxMarksSubpara, setMaxMarksSubpara] = useState("");
  const [prcss, setProcess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [paraErrors, setParaErrors] = useState([]);
  const [subParaSubErrors, setSubParaSubErrors] = useState([]);
  const [subParaMarkErrors, setSubParaMarkSubErrors] = useState([]);
  const [subParaMarkopt1Errors, setSubParaMarkopt1SubErrors] = useState([]);
  const [subParaMarkopt2Errors, setSubParaMarkopt2SubErrors] = useState([]);
  const [subParaErrors, setSubParaErrors] = useState([]);
  const [maxErrors, setMaxErrors] = useState([]);
  const [opt1Errors, setOpt1Errors] = useState([]);
  const [opt2Errors, setOpt2Errors] = useState([]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    if (e.target.id) {
      var d = "#" + e.target.id;
      var va = d.split("_");
      var count = va[1];
    } else {
    }
    // var resetnumeric = "#isnumeric" + count;
    var xy = "#yesnumeric_" + count;
    // $(resetnumeric)[0].selectedIndex = 0;
    if (
      $(d).val() === "select" ||
      $(d).val() === "date" ||
      $(d).val() === "datetime-local"
    ) {
      $(xy).hide();
    } else {
      $(xy).show();
    }
    // Clear the error message for this input
    const newErrors = [...errors];
    newErrors[i] = "";
    setErrors(newErrors);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        fieldname: "",
        controltype: "text",
        isnumeric: "No",
        mandatory: "No",
        list: "na",
      },
    ]);
    // Add a new error message for the new input
    const newErrors = [...errors];
    newErrors.push("");
    setErrors(newErrors);
  };

  const handleValidation = () => {
    let isValid = true;
    // Check if each input value is not empty
    let newErrors = formValues.map((input) => {
      if (!input.fieldname) {
        isValid = false;
        return "Field is required";
      }
      return "";
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleValidationPara = () => {
    let isValid = true;
    // Check if each input value is not empty
    const newErrors = parameters.map((input) => {
      if (!input.parameter) {
        isValid = false;
        return "Parameter is required";
      }
      return "";
    });
    setParaErrors(newErrors);
    return isValid;
  };

  const handleValidationSubPara = () => {
    let isValid = true;
    // Check if each input value is not empty
    const newErrors = parameters.map((input) => {
      if (!input.subparameter) {
        isValid = false;
        return "Subparameter is required";
      }
      return "";
    });
    setSubParaErrors(newErrors);
    return isValid;
  };

  const handleValidationMax = () => {
    let isValid = true;
    // Check if each input value is not empty
    const newErrors = parameters.map((input) => {
      if (!input.maxmarks) {
        isValid = false;
        return "Field is required";
      }
      return "";
    });
    setMaxErrors(newErrors);
    return isValid;
  };

  const handleValidationOpt1 = () => {
    let isValid = true;
    // Check if each input value is not empty
    const newErrors = parameters.map((input) => {
      if (!input.opt1) {
        isValid = false;
        return "*Required";
      }
      return "";
    });
    setOpt1Errors(newErrors);
    return isValid;
  };
  const handleValidationOpt2 = () => {
    let isValid = true;
    // Check if each input value is not empty
    const newErrors = parameters.map((input) => {
      if (!input.opt2) {
        isValid = false;
        return "*Required";
      }
      return "";
    });
    setOpt2Errors(newErrors);
    return isValid;
  };


  const handleValidationSubParaSub = () => {
    let isValid = true;
    // Check if each input value is not empty
    parameters.map((input) => {
      const newErrors = input.subFields.map((el) => {
        if (!el.subparameterr) {
          isValid = false;
          return 'Subparameter is required';
        }
        return '';
      })
      setSubParaSubErrors(newErrors);
    });

    return isValid;
  };
  const handleValidationMarkSub = () => {
    let isValid = true;
    // Check if each input value is not empty
    parameters.map((input) => {
      const newErrors = input.subFields.map((el) => {
        if (!el.maxmarkss) {
          isValid = false;
          return 'Max Mark is required';
        }
        return '';
      })
      setSubParaMarkSubErrors(newErrors);
    });

    return isValid;
  };
  const handleValidationMarkOpt1Sub = () => {
    let isValid = true;
    // Check if each input value is not empty
    parameters.map((input) => {
      const newErrors = input.subFields.map((el) => {
        if (!el.opt1s) {
          isValid = false;
          return 'required';
        }
        return '';
      })
      setSubParaMarkopt1SubErrors(newErrors);
    });

    return isValid;
  };
  const handleValidationMarkOpt2Sub = () => {
    let isValid = true;
    // Check if each input value is not empty
    parameters.map((input) => {
      const newErrors = input.subFields.map((el) => {
        if (!el.opt2s) {
          isValid = false;
          return 'required';
        }
        return '';
      })
      setSubParaMarkopt2SubErrors(newErrors);
    });

    return isValid;
  };

  let addFormFieldsSubParameters = (index) => {
    const newFields = [...parameters];
    newFields[index].subFields.push({
      subparameterr: "",
      maxmarkss: "",
      opt1s: "",
      opt2s: "",
      opt3s: "",
      opt4s: "",
      nas: "No",
      fatals: "No",
      legends: "",
      attributess: "",
    });
    setParameters(newFields);
    // Add a new error message for the new input
    const newErrors = [...paraErrors];
    const newErrorsSub = [...subParaErrors];
    const newErrorsMax = [...maxErrors];
    const newErrorsOpt1 = [...opt1Errors];
    const newErrorsOpt2 = [...opt2Errors];
    newErrors.push("");
    newErrorsSub.push("");
    newErrorsMax.push("");
    newErrorsOpt1.push("");
    newErrorsOpt2.push("");
    setParaErrors(newErrors);
    setSubParaErrors(newErrorsSub);
    setMaxErrors(newErrorsMax);
    setOpt1Errors(newErrorsOpt1);
    setOpt2Errors(newErrorsOpt2);
  };

  let addFormFieldsParameters = () => {
    if (parameters.length === 0) {
      setParameters([
        {
          parameter: "",
          critical: "No",
          subparameter: "",
          maxmarks: "",
          opt1: "",
          opt2: "",
          opt3: "",
          opt4: "",
          na: "No",
          fatal: "No",
          legend: "",
          attributes: "",
          subFields: [],
        },
      ]);
    } else {
      setParameters([
        ...parameters,
        {
          parameter: "",
          critical: "No",
          subparameter: "",
          maxmarks: "",
          opt1: "",
          opt2: "",
          opt3: "",
          opt4: "",
          na: "No",
          fatal: "No",
          legend: "",
          attributes: "",
          subFields: [],
        },
      ]);
    }
    // Add a new error message for the new input
    const newErrors = [...paraErrors];
    const newErrorsSub = [...subParaErrors];
    const newErrorsMax = [...maxErrors];
    const newErrorsOpt1 = [...opt1Errors];
    const newErrorsOpt2 = [...opt2Errors];
    newErrors.push("");
    newErrorsSub.push("");
    newErrorsMax.push("");
    newErrorsOpt1.push("");
    newErrorsOpt2.push("");
    setParaErrors(newErrors);
    setSubParaErrors(newErrorsSub);
    setMaxErrors(newErrorsMax);
    setOpt1Errors(newErrorsOpt1);
    setOpt2Errors(newErrorsOpt2);
  };

  const updateField = (fieldIndex, subFieldIndex, element, value) => {
    const newFields = [...parameters];
    if (subFieldIndex !== null) {
      if (element === "attributess") {
        let attValsubpara = [];
        let attValsubpara1 = [];
        let strAttValsubpara;
        let strAttValsubpara1;
        attValsubpara.push(value.join("|"));
        strAttValsubpara = String(attValsubpara);
        if (strAttValsubpara.indexOf("|") === 0) {
          var attValsubparaFilter = value.filter((n) => n);
          attValsubpara1.push(attValsubparaFilter.join("|"));
          strAttValsubpara1 = String(attValsubpara1);
          newFields[fieldIndex].subFields[subFieldIndex][element] =
            strAttValsubpara1;
        } else {
          newFields[fieldIndex].subFields[subFieldIndex][element] =
            strAttValsubpara;
        }
      } else {
        newFields[fieldIndex].subFields[subFieldIndex][element] = value;
      }

      if (element === "maxmarkss") {
        newFields[fieldIndex].subFields[subFieldIndex]["opt1s"] = "";
        newFields[fieldIndex].subFields[subFieldIndex]["opt2s"] = "";
        newFields[fieldIndex].subFields[subFieldIndex]["opt3s"] = "";
        newFields[fieldIndex].subFields[subFieldIndex]["opt4s"] = "";
      }
    } else {
      if (element === "maxmarks") {
        newFields[fieldIndex]["opt1"] = "";
        newFields[fieldIndex]["opt2"] = "";
        newFields[fieldIndex]["opt3"] = "";
        newFields[fieldIndex]["opt4"] = "";
      }

      if (element === "attributes") {
        let attVal = [];
        let attVal1 = [];
        let strAttVal;
        let strAttVal1;
        attVal.push(value.join("|"));
        strAttVal = String(attVal);
        if (strAttVal.indexOf("|") === 0) {
          var attValFilter = value.filter((n) => n);
          attVal1.push(attValFilter.join("|"));
          strAttVal1 = String(attVal1);
          newFields[fieldIndex][element] = strAttVal1;
        } else {
          newFields[fieldIndex][element] = strAttVal;
        }
      } else {
        newFields[fieldIndex][element] = value;
      }
      // Clear the error message for this input
      const newErrors = [...paraErrors];
      const newErrorsSub = [...subParaErrors];
      const newErrorsMax = [...maxErrors];
      const newErrorsOpt1 = [...opt1Errors];
      const newErrorsOpt2 = [...opt2Errors];
      newErrors[fieldIndex] = "";
      newErrorsSub[fieldIndex] = "";
      newErrorsMax[fieldIndex] = "";
      newErrorsOpt1[fieldIndex] = "";
      newErrorsOpt2[fieldIndex] = "";
      setParaErrors(newErrors);
      setSubParaErrors(newErrorsSub);
      setMaxErrors(newErrorsMax);
      setOpt1Errors(newErrorsOpt1);
      setOpt2Errors(newErrorsOpt2);
    }
    setParameters(newFields);
  };

  const removeFormFieldsSubParameters = (fieldIndex, subFieldIndex) => {
    let newFormValues = [...parameters];
    newFormValues[fieldIndex].subFields.splice(subFieldIndex, 1);
    setParameters(newFormValues);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const removeFormFieldsParameters = (i) => {
    let newFormValues = [...parameters];
    newFormValues.splice(i, 1);
    setParameters(newFormValues);
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "process") {
      $("#collectionname").val("");

      if (value != "") {
        $("#collectionname").prop("disabled", false);
      } else {
        $("#blank").hide();
        $("#avail").hide();
        $("#taken").hide();
        $(":submit").attr("disabled", true);
        $("#collectionname").prop("disabled", true);
      }
    }
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
    errors["collectionnames"] = ``;
    setFormErrors(errors);

    if (e.target.name !== "process") {
      keyUp(e);
    }
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setDataSource("");
    setParameters([
      {
        parameter: "",
        critical: "No",
        subparameter: "",
        maxmarks: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        na: "No",
        fatal: "No",
        legend: "",
        attributes: "",
        subFields: [],
      },
    ]);
    setFormValues([
      {
        fieldname: "",
        controltype: "text",
        isnumeric: "No",
        mandatory: "No",
        list: "na",
      },
    ]);
  };

  var any = [];
  var param = [];
  //Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdBy = isAuth().EmployeeID;
    param = parameters;
    const { collectionnames, process } = dataSource;
    any = formValues;
    const errors = {};

    if (!process) {
      errors["process"] = `Process is required`;
      setFormErrors(errors);
      return false;
    } else if (!collectionnames) {
      errors["collectionnames"] = `Sheet Name is required`;
      setFormErrors(errors);
      return false;
    } else if (handleValidation() !== true) {
      errors["collectionnames"] = ``;
      setFormErrors(errors);
      return false;
    } else if (handleValidationPara() !== true) {
      return false;
    } else if (handleValidationSubPara() !== true) {
      return false;
    } else if (handleValidationMax() !== true) {
      return false;
    } else if (handleValidationOpt1() !== true) {
      return false;
    } else if (handleValidationOpt2() !== true) {
      return false;
    } else if (handleValidationSubParaSub() !== true) {
      return false
    } else if (handleValidationMarkSub() !== true) {
      return false
    } else if (handleValidationMarkOpt1Sub() !== true) {
      return false
    } else if (handleValidationMarkOpt2Sub() !== true) {
      return false
    }
    else if (
      !process ||
      !collectionnames ||
      !any[0].fieldname ||
      !param[0].parameter ||
      !param[0].subparameter ||
      !param[0].maxmarks ||
      !param[0].opt1 ||
      !param[0].opt2
    ) {
      return false;
    } else {
      //To get cmid and process name
      var a = process.split("|");
      var b = a[0];
      var c = a[1];
      var d = a[2];
      let r = b.concat("|", c);
      var cm_id = a[3];
      var processname = r.concat("|", d);
      var collectionname = cm_id + "_" + collectionnames;
      const res = await fetch(`${url}/api/createsheet`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          any,
          param,
          collectionname,
          processname,
          cm_id,
          createdBy,
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
      $("#collectionname").val("");
      $("#select1").val("");
      handleReset();
    }
  };

  const keyUp = (e) => {
    e.preventDefault();
    var process = dataSource.process;
    var a = process.split("|");
    var cm_id = a[3];
    const collectionnames = e.target.value;
    var collectionname = cm_id + "_" + collectionnames;
    if (collectionnames === "") {
      $("#blank").show();
      $("#avail").hide();
      $("#taken").hide();
      $(":submit").attr("disabled", true);
    } else {
      const postDataSource = async () => {
        const res = await fetch(`${url}/api/get-dynamic-collection-with-name`, {
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
            $("#blank").hide();
            $(":submit").attr("disabled", true);
          } else {
            $("#avail").show();
            $("#taken").hide();
            $("#blank").hide();
            $(":submit").removeAttr("disabled");
          }
        }
      };
      postDataSource();
    }
  };

  useEffect(() => {
    xyz();
  }, []);

  const xyz = () => {
    $("#AddMoreHeader").trigger("click", function () { });
    $("#addParameters").trigger("click", function () { });
  };
  // });

  const handleKeyDown = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `,` ||
      e.key === `-` ||
      e.key === `?`
    ) {
      e.preventDefault();
    }
  };

  const handleMaxMark = (e) => {
    setMaxMarks(e.target.value);
  };

  const handleMaxMarksSubpara = (e) => {
    setMaxMarksSubpara(e.target.value);
  };

  const handleOpt1 = (e) => {
    if (parseInt(getMaxMarks) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };

  const handleOpt2 = (e) => {
    if (parseInt(getMaxMarks) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };

  const handleOpt3 = (e) => {
    if (parseInt(getMaxMarks) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };

  const handleOpt4 = (e) => {
    if (parseInt(getMaxMarks) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };

  const handleOpt1Subpara = (e) => {
    if (parseInt(getMaxMarksSubpara) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };
  const handleOpt2Subpara = (e) => {
    if (parseInt(getMaxMarksSubpara) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };
  const handleOpt3Subpara = (e) => {
    if (parseInt(getMaxMarksSubpara) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };
  const handleOpt4Subpara = (e) => {
    if (parseInt(getMaxMarksSubpara) >= parseInt(e.target.value)) {
      e.target.value = e.target.value;
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDownMax = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };

  const handleKeyDownmark1 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownmark2 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownmark3 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownmark4 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownsubMax = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownsubMark1 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownsubMark2 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownsubMark3 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  const handleKeyDownsubMark4 = (e) => {
    if (
      e.key === " " ||
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === `-`
    ) {
      e.preventDefault();
    }
  };
  //For process
  useEffect(() => {
    const postdata1 = async () => {
      const employeeId = isAuth().EmployeeID;

      const res = await fetch(`${url}/api/d-master-report-process`, {
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
          console.log("No Data!");
        } else {
          setProcess(data);
        }
      }
    };
    postdata1();
  }, []);

  $(function () {
    $("#collectionname").on("paste", function () {
      setTimeout(function () {
        //get the value of the input text
        var data = $("#collectionname").val();
        //replace the special characters to ''
        var dataFull = data.replace(/[^\w\s]/gi, "");
        //set the new value of the input text without special characters
        $("#collectionname").val(dataFull);
      });
    });
  });

  const checkSpecialCharForAttri = (e) => {
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
      e.key === "`" ||
      e.key === "~" ||
      e.key === `"`
    ) {
      e.target.value = "";
    }
    if (
      e.target.value.includes("*") ||
      e.target.value.includes("#") ||
      e.target.value.includes("%") ||
      e.target.value.includes("@") ||
      e.target.value.includes("~") ||
      e.target.value.includes("[") ||
      e.target.value.includes("]") ||
      e.target.value.includes("$") ||
      e.target.value.includes("!") ||
      e.target.value.includes("&") ||
      e.target.value.includes("=") ||
      e.target.value.includes(">") ||
      e.target.value.includes("<") ||
      e.target.value.includes(";") ||
      e.target.value.includes(":") ||
      e.target.value.includes(")") ||
      e.target.value.includes("(") ||
      e.target.value.includes("{") ||
      e.target.value.includes("}") ||
      e.target.value.includes("?") ||
      e.target.value.includes("|") ||
      e.target.value.includes("+") ||
      e.target.value.includes("^") ||
      e.target.value.includes(`"`) ||
      e.target.value.includes("`")
    ) {
      e.target.value = "";
    }
  };

  const checkSpecialChar = (e) => {
    if (!/[0-9a-zA-Z\s_,.-]/.test(e.key)) {
      e.preventDefault();
    }
  };

  function handlePaste(event) {
    const pasteData = event.clipboardData.getData("text/plain");
    const regex = /^[a-zA-Z0-9\s_,.-]*$/; // only allow alphanumeric characters

    if (!regex.test(pasteData)) {
      event.preventDefault();
      // show an error message or take other actions as needed
    }
  }

  const handleKeyDownField = (e) => {
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
      e.key === "?" ||
      e.key === "" ||
      e.key === "-" ||
      e.key === "," ||
      e.key === "." ||
      e.key === "~" ||
      e.key === `"` ||
      e.key === "`"
    ) {
      e.preventDefault();
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
            <form
              id="form"
              noValidate
              autoComplete="off"
              className="needs-validation"
              onSubmit={handleSubmit}
              autocomplete="off"
            >
              <div className="row mt-2">
                <div style={{ fontSize: ".7rem" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row">
                        <h3 className="card-title">New Sheet</h3>
                        <div className=" col-sm-8">
                          <marquee
                            behavior="alternate"
                            scrolldelay="180"
                            style={{
                              fontSize: "12.5px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            No need to add
                            (MSISDN,MobileNo,ContactNo,Calltype,Acht,CLI,Bonus)
                          </marquee>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card">
                        <div className="row card-body col-md-12">
                          <div id="process" className=" form-group col-md-4">
                            <label htmlFor="xyz">Process</label>
                            <span style={{ color: "red" }}>*</span>
                            <select
                              id="select1"
                              name="process"
                              onChange={setdata}
                              className="form-control form-control-sm"
                              style={{ fontSize: ".75rem" }}
                              required
                            >
                              <option value="">--Select--</option>
                              {Object.values(prcss).length >= 1
                                ? prcss
                                  ? prcss.map((element) => {
                                    return (
                                      <option
                                        value={element}
                                        key={element.cm_id}
                                      >
                                        {element}
                                      </option>
                                    );
                                  })
                                  : null
                                : null}
                            </select>
                            {formErrors.process && (
                              <span className="text-danger">
                                {formErrors.process}
                              </span>
                            )}
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                style={{ fontSize: ".7rem" }}
                                htmlFor="xyz"
                              >
                                Sheet Name
                              </label>
                              <span style={{ color: "red" }}>*</span>
                              <input
                                className="form-control form-control-sm"
                                onBlur={setdata}
                                id="collectionname"
                                type="text"
                                onPaste={(e) => {
                                  e.preventDefault();
                                  return false;
                                }}
                                name="collectionnames"
                                style={{ fontSize: ".75rem" }}
                                maxLength={"100"}
                                onKeyDown={handleKeyDown}
                                required
                                disabled
                              />

                              <span
                                id="taken"
                                style={{ color: "red", display: "none" }}
                              >
                                Already Taken!
                              </span>
                              <span
                                id="blank"
                                style={{ color: "red", display: "none" }}
                              >
                                Please enter the sheet name properly!
                              </span>
                              <span
                                id="avail"
                                style={{ color: "green", display: "none" }}
                              >
                                Available!
                              </span>
                              {formErrors.collectionnames && (
                                <span className="text-danger">
                                  {formErrors.collectionnames}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        id="AddMoreHeader"
                        style={{ fontSize: "10px", color: "white" }}
                        type="button"
                        className="btn btn-info mt-2"
                        onClick={() => addFormFields()}
                      >
                        <i
                          className="nav-icon fas fa-plus"
                          style={{ fontSize: "11px" }}
                        />{" "}
                        Add Field
                      </button>

                      {formValues.map((element, index) => (
                        <div key={index}>
                          <div
                            style={{ fontSize: ".7rem" }}
                            className="card card-body border mt-2"
                          >
                            <div className=" row ">
                              <div className="row col-md-11">
                                <div className=" col-md-3">
                                  <div
                                    style={{ fontSize: ".7rem" }}
                                    className="form-group"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Fields Name:
                                    </label>
                                    <input
                                      type="text"
                                      id="fieldname"
                                      value={element.fieldname || ""}
                                      onChange={(e) => handleChange(index, e)}
                                      onPaste={handlePaste}
                                      onKeyDown={handleKeyDownField}
                                      maxLength={"50"}
                                      name="fieldname"
                                      style={{ fontSize: ".75rem" }}
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                      required
                                    />
                                    {errors[index] && (
                                      <div className="text-danger">
                                        {errors[index]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="form-group ">
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="xyz"
                                    >
                                      Control Type:
                                    </label>

                                    <select
                                      name="controltype"
                                      id={"controlSelect_" + index}
                                      onChange={(e) => handleChange(index, e)}
                                      className="form-control form-control-sm controlSelect"
                                      style={{ fontSize: ".75rem" }}
                                    >
                                      <option value="text">TextBox</option>
                                      <option value="select">List</option>
                                      <option value="date">Calendar</option>
                                      <option value="datetime-local">
                                        Calendar With Time
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className=" col-md-3 form-group">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="xyz"
                                  >
                                    Numeric:
                                  </label>

                                  <select
                                    name="isnumeric"
                                    id={"isnumeric" + index}
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: ".75rem" }}
                                  >
                                    <option value="No">No</option>
                                    <option
                                      id={"yesnumeric_" + index}
                                      value="Yes"
                                    >
                                      Yes
                                    </option>
                                  </select>
                                </div>
                                <div className=" col-md-3  form-group">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="xyz"
                                  >
                                    Mandatory:
                                  </label>
                                  <select
                                    name="mandatory"
                                    onChange={(e) => handleChange(index, e)}
                                    className="form-control form-control-sm"
                                    style={{ fontSize: ".75rem" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                              </div>
                              <div
                                style={{ marginTop: "1.7rem" }}
                                className="form-group col-md-1"
                              >
                                {index ? (
                                  <button
                                    type="button"
                                    style={{ fontSize: "12px" }}
                                    className="btn btn-sm btn-danger  remove_btn"
                                    onClick={() => removeFormFields(index)}
                                  >
                                    <i className="nav-icon fas fa-minus " />
                                  </button>
                                ) : null}
                              </div>
                              {/* </div> */}
                            </div>
                          </div>
                        </div>
                        // </div>
                      ))}

                      {parameters.map((element, fieldIndex) => (
                        <div key={fieldIndex}>
                          <div
                            style={{
                              fontSize: ".7rem",
                              borderLeft: "2px solid rgb(23, 162, 184)",
                            }}
                            className="card card-body "
                          >
                            <div className=" row col-md-12">
                              {/* row 1 */}
                              <div className="row col-md-12  form-group">
                                <div className="col-md-6 form-group">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Parameter:
                                  </label>
                                  <input
                                    type="text"
                                    value={element.parameter || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "parameter",
                                        e.target.value
                                      )
                                    }
                                    style={{ fontSize: ".75rem" }}
                                    onKeyDown={checkSpecialChar}
                                    onPaste={handlePaste}
                                    name="parameter"
                                    maxLength={"90"}
                                    id="textInput"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  {paraErrors[fieldIndex] && (
                                    <div className="text-danger">
                                      {paraErrors[fieldIndex]}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-md-2">
                                  <label
                                    style={{
                                      fontSize: ".7rem",
                                      color: "white",
                                    }}
                                    htmlFor="xyz"
                                  >
                                    Critical:
                                  </label>
                                  <select
                                    name="critical"
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "critical",
                                        e.target.value
                                      )
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: ".75rem" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className="form-group mt-4 col-md-2">
                                  <button
                                    // id="AddMoreHeader"
                                    style={{
                                      fontSize: "11px",
                                    }}
                                    type="button"
                                    className="btn btn-sm btn-info form-control form-control-sm"
                                    onClick={() =>
                                      addFormFieldsSubParameters(fieldIndex)
                                    }
                                  >
                                    <i
                                      className="nav-icon fas fa-plus"
                                      style={{ fontSize: "11px" }}
                                    />{" "}
                                    ADD SUB PARAMETER
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              fontSize: ".7rem",
                              borderLeft: "2px solid green",
                            }}
                            className="card card-body"
                          >
                            <div className="row col-md-12">
                              <div className="row col-md-12 ">
                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className="form-group col-md-6"
                                >
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Sub Parameter:
                                  </label>

                                  <input
                                    type="text"
                                    value={element.subparameter || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "subparameter",
                                        e.target.value
                                      )
                                    }
                                    style={{ fontSize: ".75rem" }}
                                    name="subparameter"
                                    onPaste={handlePaste}
                                    onKeyDown={(e) => checkSpecialChar(e)}
                                    maxLength={"180"}
                                    id="txtSubpara"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  {subParaErrors[fieldIndex] && (
                                    <div className="text-danger">
                                      {subParaErrors[fieldIndex]}
                                    </div>
                                  )}
                                </div>

                                <div className=" form-group col-md-2">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="xyz"
                                  >
                                    NA:
                                  </label>
                                  <select
                                    name="na"
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "na",
                                        e.target.value
                                      )
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: ".75rem" }}
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                                <div className=" form-group col-md-2">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="xyz"
                                  >
                                    Fatal:
                                  </label>
                                  <select
                                    name="fatal"
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "fatal",
                                        e.target.value
                                      )
                                    }
                                    className="form-control form-control-sm"
                                    style={{ fontSize: ".75rem" }}
                                    required
                                  >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                  </select>
                                </div>
                              </div>

                              {/* row 2 end */}
                              {/* row 3 */}
                              <div className="row col-md-12 ">
                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className=" form-group col-md-2"
                                >
                                  <label htmlFor="exampleInputEmail">
                                    Max. Marks:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.maxmarks || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "maxmarks",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handleMaxMark}
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    onKeyDown={handleKeyDownMax}
                                    style={{ fontSize: ".75rem" }}
                                    name="maxmarks"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  {maxErrors[fieldIndex] && (
                                    <div className="text-danger">
                                      {maxErrors[fieldIndex]}
                                    </div>
                                  )}
                                </div>

                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className=" form-group col-md-2"
                                >
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Option-1:
                                  </label>

                                  <input
                                    type="number"
                                    value={element.opt1 || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "opt1",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handleOpt1}
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    onKeyDown={handleKeyDownmark1}
                                    style={{ fontSize: ".75rem" }}
                                    name="opt1"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  {opt1Errors[fieldIndex] && (
                                    <div className="text-danger">
                                      {opt1Errors[fieldIndex]}
                                    </div>
                                  )}
                                </div>
                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className=" form-group col-md-2"
                                >
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Option-2:
                                  </label>
                                  <input
                                    type="number"
                                    value={element.opt2 || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "opt2",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handleOpt2}
                                    onKeyDown={handleKeyDownmark2}
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    style={{ fontSize: ".75rem" }}
                                    name="opt2"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                    required
                                  />
                                  {opt2Errors[fieldIndex] && (
                                    <div className="text-danger">
                                      {opt2Errors[fieldIndex]}
                                    </div>
                                  )}
                                </div>

                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className=" form-group col-md-2"
                                >
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Option-3:
                                  </label>
                                  <input
                                    type="number"
                                    value={element.opt3 || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "opt3",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handleOpt3}
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    onKeyDown={handleKeyDownmark3}
                                    style={{ fontSize: ".75rem" }}
                                    name="opt3"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                                <div
                                  style={{
                                    fontSize: ".7rem",
                                  }}
                                  className="form-group col-md-2"
                                >
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Option-4:
                                  </label>
                                  <input
                                    type="number"
                                    value={element.opt4 || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "opt4",
                                        e.target.value
                                      )
                                    }
                                    onKeyUp={handleOpt4}
                                    onKeyDown={handleKeyDownmark4}
                                    onPaste={(e) => {
                                      e.preventDefault();
                                      return false;
                                    }}
                                    style={{ fontSize: ".75rem" }}
                                    name="opt4"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                              </div>
                              {/* row 3 end */}
                              <div className="row col-md-12">
                                <div
                                  style={{ fontSize: ".7rem" }}
                                  className=" form-group col-md-10"
                                >
                                  <label htmlFor="exampleInputEmail">
                                    Legend:
                                  </label>
                                  <input
                                    type="text"
                                    value={element.legend || ""}
                                    onChange={(e) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "legend",
                                        e.target.value
                                      )
                                    }
                                    style={{ fontSize: ".75rem" }}
                                    onKeyDown={(e) => checkSpecialChar(e)}
                                    onPaste={handlePaste}
                                    name="legend"
                                    className="form-control form-control-sm"
                                    aria-describedby="emailHelp"
                                  />
                                </div>
                              </div>
                              <div className="row col-md-12">
                                <div className="form-group col-md-10">
                                  <label
                                    style={{ fontSize: ".7rem" }}
                                    htmlFor="exampleInputEmail"
                                  >
                                    Attributes:
                                  </label>
                                  <TagsInput
                                    onKeyUp={(e) => checkSpecialCharForAttri(e)}
                                    value={element.attributes.split("|") || []}
                                    onChange={(tags) =>
                                      updateField(
                                        fieldIndex,
                                        null,
                                        "attributes",
                                        tags
                                      )
                                    }
                                    name="attributes"
                                    className="form-control form-control-sm"
                                    placeHolder="Enter Attributes"
                                  />
                                </div>
                                <div
                                  style={{ marginTop: "1.8rem" }}
                                  className="col-md-1 form-group "
                                >
                                  {fieldIndex ? (
                                    <button
                                      type="button"
                                      style={{ fontSize: "12px" }}
                                      className="btn btn-sm btn-danger remove_btn"
                                      onClick={() =>
                                        removeFormFieldsParameters(fieldIndex)
                                      }
                                    >
                                      <i
                                        className="nav-icon fas fa-minus "
                                        style={{ fontSize: "11px" }}
                                      />
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          {element.subFields.map((subField, subFieldIndex) => (
                            <div key={subFieldIndex}>
                              <div
                                style={{
                                  fontSize: ".7rem",
                                  borderLeft: "2px solid green",
                                }}
                                className="card card-body"
                              >
                                <div className="row col-md-12">
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-6"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Sub Parameter:
                                    </label>
                                    <input
                                      type="text"
                                      value={subField.subparameterr || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "subparameterr",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={(e) => checkSpecialChar(e)}
                                      onPaste={handlePaste}
                                      maxLength={"180"}
                                      style={{ fontSize: ".75rem" }}
                                      name="subparameterr"
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                      required
                                    />
                                    {subParaSubErrors[fieldIndex] && <div className="text-danger">{subParaSubErrors[subFieldIndex]}</div>}
                                  </div>
                                  <div className=" form-group col-md-2">
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="xyz"
                                    >
                                      NA:
                                    </label>
                                    <select
                                      name="nas"
                                      value={subField.nas || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "nas",
                                          e.target.value
                                        )
                                      }
                                      className="form-control form-control-sm"
                                      style={{ fontSize: ".75rem" }}
                                    >
                                      <option value="No">No</option>
                                      <option value="Yes">Yes</option>
                                    </select>
                                  </div>
                                  <div className=" form-group col-md-2">
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="xyz"
                                    >
                                      Fatal:
                                    </label>
                                    <select
                                      name="fatals"
                                      value={subField.fatals || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "fatals",
                                          e.target.value
                                        )
                                      }
                                      className="form-control form-control-sm"
                                      style={{ fontSize: ".75rem" }}
                                    >
                                      <option value="No">No</option>
                                      <option value="Yes">Yes</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row col-md-12">
                                  <div
                                    style={{ fontSize: ".7rem" }}
                                    className="form-group col-md-2"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Max. Marks:
                                    </label>
                                    <input
                                      type="number"
                                      value={subField.maxmarkss || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "maxmarkss",
                                          e.target.value
                                        )
                                      }
                                      onKeyUp={handleMaxMarksSubpara}
                                      onKeyDown={handleKeyDownsubMax}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      style={{ fontSize: ".75rem" }}
                                      name="maxmarkss"
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                      required
                                    />
                                    {subParaMarkErrors[fieldIndex] && <div className="text-danger">{subParaMarkErrors[subFieldIndex]}</div>}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-2"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Option-1:
                                    </label>
                                    <input
                                      type="number"
                                      value={subField.opt1s || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "opt1s",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={handleKeyDownsubMark1}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      style={{ fontSize: ".75rem" }}
                                      name="opt1s"
                                      onKeyUp={handleOpt1Subpara}
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                      required
                                    />
                                    {subParaMarkopt1Errors[fieldIndex] && <div className="text-danger">{subParaMarkopt1Errors[subFieldIndex]}</div>}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-2"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Option-2:
                                    </label>
                                    <input
                                      type="number"
                                      value={subField.opt2s || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "opt2s",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={handleKeyDownsubMark2}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      style={{ fontSize: ".75rem" }}
                                      name="opt2s"
                                      onKeyUp={handleOpt2Subpara}
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                      required
                                    />
                                    {subParaMarkopt2Errors[fieldIndex] && <div className="text-danger">{subParaMarkopt2Errors[subFieldIndex]}</div>}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-2"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Option-3:
                                    </label>
                                    <input
                                      type="number"
                                      value={subField.opt3s || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "opt3s",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={handleKeyDownsubMark3}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      style={{ fontSize: ".75rem" }}
                                      name="opt3s"
                                      onKeyUp={handleOpt3Subpara}
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                    />
                                  </div>
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-2"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Option-4:
                                    </label>
                                    <input
                                      type="number"
                                      value={subField.opt4s || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "opt4s",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={handleKeyDownsubMark4}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      style={{ fontSize: ".75rem" }}
                                      name="opt4s"
                                      onKeyUp={handleOpt4Subpara}
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                    />
                                  </div>
                                </div>
                                <div className="row col-md-12">
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-10"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Legend:
                                    </label>
                                    <input
                                      type="text"
                                      value={subField.legends || ""}
                                      onChange={(e) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "legends",
                                          e.target.value
                                        )
                                      }
                                      onKeyDown={(e) => checkSpecialChar(e)}
                                      onPaste={handlePaste}
                                      style={{ fontSize: ".75rem" }}
                                      name="legends"
                                      className="form-control form-control-sm"
                                      aria-describedby="emailHelp"
                                    />
                                  </div>
                                </div>
                                <div className="row col-md-12">
                                  <div
                                    style={{
                                      fontSize: ".7rem",
                                    }}
                                    className="form-group col-md-10"
                                  >
                                    <label
                                      style={{ fontSize: ".7rem" }}
                                      htmlFor="exampleInputEmail"
                                    >
                                      Attributes:
                                    </label>

                                    <TagsInput
                                      onKeyUp={(e) =>
                                        checkSpecialCharForAttri(e)
                                      }
                                      value={
                                        subField.attributess.split("|") || []
                                      }
                                      onChange={(tags) =>
                                        updateField(
                                          fieldIndex,
                                          subFieldIndex,
                                          "attributess",
                                          tags
                                        )
                                      }
                                      name="attributess"
                                      placeHolder="Enter Attributes"
                                    />
                                  </div>
                                  <div
                                    style={{ marginTop: "1.8rem" }}
                                    className="col-md-1 form-group"
                                  >
                                    <button
                                      type="button"
                                      style={{ fontSize: "12px" }}
                                      className="btn btn-sm btn-danger remove_btn"
                                      onClick={() =>
                                        removeFormFieldsSubParameters(
                                          fieldIndex,
                                          subFieldIndex
                                        )
                                      }
                                    >
                                      <i
                                        className="nav-icon fas fa-minus "
                                        style={{ fontSize: "11px" }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="button-section">
                        <button
                          style={{ fontSize: "11px" }}
                          type="button"
                          id="addParameters"
                          className="btn  btn-info mt-2"
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
                        className="btn btn-info mt-2"
                        disabled
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DynCreateSheet;
