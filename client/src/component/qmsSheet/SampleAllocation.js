import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/SampleAllocation.css";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { isAuth } from "../auth/helpers";
import _ from "lodash";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const SampleAllocation = () => {
  const [dataSource, setDataSource] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [processName, setProcessName] = useState("");
  const [process, setProcess] = useState("");
  const [filterData, setFilterData] = useState("")
  const [uniqueAgents, setUniqueAgents] = useState("")
  const [multipleSelect, setMultipleSelect] = useState("")
  const [multipleSelectQa, setMultipleSelectQa] = useState("")
  const [multipleSelectTl, setMultipleSelectTl] = useState("")
  const [multipleSelectTrainer, setMultipleSelectTrainer] = useState("")
  const [uniqueCalltypes, setUniqueCalltypes] = useState("")
  const [qaTlTrainerGet, setQaTlTrainer] = useState("")
  const [duallist, setDualList] = useState({});
  const [checkryg, setCheckRyg] = useState("")
  const [agentid, setAgentId] = useState("")
  const [countQaTlTrainer, setCountQaTlTrainer] = useState("")
  const [sheetid, setSheetId] = useState("")
  const [prcss, setProcesses] = useState("")
  const [EmpManual, setEmpManual] = useState([])
  const [filterType, setFilterType] = useState("auto");
  let { selected } = duallist;
  const opt = EmpManual
    ? EmpManual.map((element) => ({
      label: element,
      value: element,
    }))
    : "";
  const onChanges = (selected) => {
    setDualList({ selected });
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

  const setdata1 = (e) => {
    const { name, value } = e.target;
    setCountQaTlTrainer((countQaTlTrainer) => {
      return {
        ...countQaTlTrainer,
        [name]: value,
      };
    });
  };

  const handleMultipleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelect({ calltypefield: value });
  }

  const handleMultipleSelectTl = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectTl({ getselecttl: value });
  }

  const handleMultipleSelectTrainer = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectTrainer({ value });
  }
  const handleMultipleSelectQa = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectQa({ value });
  }

  const handleChangeProcess = (e) => {
    e.preventDefault();
    const getdata = async () => {
      const process = e.target.value;
      var a = process.split('|')
      var cm_id = a[3]
      setProcess(e.target.value);
      const res = await fetch(`${url}/api/find-data-with-process-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cm_id,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setProcessName(data);
      }
    };

    getdata();

    $("#radioPrimary1").on('change', function () {
      $("#form3").hide()
      $("#form2").show()
      $("#form4").show()

    })
    $("#radioPrimary2").on('change', function () {
      $("#form3").show()
      $("#form2").hide()
      $("#form4").show()
    })
  };

  const handleSheetData = (e) => {
    e.preventDefault();
    const postdata = async () => {
      const getdynamiccollection = e.target.value;
      setSheetId(e.target.value)
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
          setSheetData(data);
          handleQaTlTrainer()
          handleManualEmpID()
        }
      }
    };
    postdata();
    handleUniqueCalltypes()
    handleRyg()
  };

  const handleFilter = async (e) => {
    e.preventDefault()
    if ($("#achttype").is(':checked') && $("#calltype").is(':checked') && $("#aging").is(':checked') && $("#bucket").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      var flagred = "0"
      var flagamber = "0"
      var flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1

      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      var collectionname = x
      const calltypeField = multipleSelect.calltypefield
      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/bucket-calltype-newhire-acht-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen, calltypeField, acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            $("#btn").attr('disabled', true)
            setFilterData(data)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#achttype").is(':checked') && $("#bucket").is(':checked') && $("#aging").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      var flagred = "0"
      var flagamber = "0"
      var flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1

      x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      collectionname = x
      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/bucket-acht-newhire-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen, acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            $("#btn").attr('disabled', true)
            setFilterData(data)
          }
        }
      }
      handleUniqueAgents()
      return false

    }
    else if ($("#achttype").is(':checked') && $("#bucket").is(':checked') && $("#calltype").is(':checked')) {

      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const calltypeField = multipleSelect.calltypefield
      const y = process.split("|");
      const cm_id = y[3]
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      var dynamicCollectionName = x
      collectionname = x
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      let flagred = "0"
      let flagamber = "0"
      let flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        const res = await fetch(`${url}/api/acht-bucket-calltype-filter`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            dynamicCollectionName, collectionname,
            acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44, calltypeField
            , score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#achttype").is(':checked') && $("#aging").is(':checked') && $("#calltype").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const calltypeField = multipleSelect.calltypefield

      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }
      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const { agefield1 } = dataSource
      const target = agefield1
      //  const agentId = agentid
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      collectionname = x
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/newhire-acht-calltype-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, cm_id
              , calltypeField,
              acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            setFilterData(data)
            $("#btn").attr('disabled', true)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#bucket").is(':checked') && $("#aging").is(':checked') && $("#calltype").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      let flagred = "0"
      let flagamber = "0"
      let flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1
      //  const agentId = agentid
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      let collectionname = x
      const calltypeField = multipleSelect.calltypefield
      if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/bucket-calltype-newhire-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen, calltypeField
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            $("#btn").attr('disabled', true)
            setFilterData(data)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    if ($("#achttype").is(':checked') && $("#calltype").is(':checked')) {

      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const calltypeField = multipleSelect.calltypefield
      const y = process.split("|");
      const cm_id = y[3]
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      let dynamicCollectionName = x
      let collectionname = x
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else {
        const res = await fetch(`${url}/api/acht-calltype-filter-save`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            dynamicCollectionName, collectionname, cm_id,
            acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44, calltypeField
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#achttype").is(':checked') && $("#aging").is(':checked')) {

      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      var dynamicCollectionName = x
      var collectionname = x

      //Get new hire
      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1
      //  const agentId = agentid
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!target) {
        alert("Please select new hire target")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/acht-newhire-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              dynamicCollectionName, collectionname, acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44, process, target, agentId, cm_id
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            setFilterData(data)
            $("#btn").attr('disabled', true)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#achttype").is(':checked') && $("#bucket").is(':checked')) {

      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const y = process.split("|");
      const c = y[0] + y[1];
      const cm_id = y[3]
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      var dynamicCollectionName = x
      var collectionname = x
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      var flagred = "0"
      var flagamber = "0"
      var flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      collectionname = x

      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        const res = await fetch(`${url}/api/acht-bucket-filter`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            dynamicCollectionName, collectionname,
            acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#aging").is(':checked') && $("#calltype").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();

      var collectionname = x
      const calltypeField = multipleSelect.calltypefield

      //Get new hire
      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1
      // const agentId = agentid
      if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/newhire-calltype-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, calltypeField, process, target, agentId, cm_id
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            setFilterData(data)
            $("#btn").attr('disabled', true)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#aging").is(':checked') && $("#bucket").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      var flagred = "0"
      var flagamber = "0"
      var flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }

      const { agefield1 } = dataSource
      const target = agefield1
      //  const agentId = agentid
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      collectionname = x
      if (!target) {
        alert("Please select new hire target")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          const res = await fetch(`${url}/api/newhire-bucket-filter`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            setFilterData(data)
            $("#btn").attr('disabled', true)
          }
        }
      }
      handleUniqueAgents()
      return false
    }
    else if ($("#calltype").is(':checked') && $("#bucket").is(':checked')) {

      const y = process.split("|");
      var cm_id = y[3]
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      let flagred = "0"
      let flagamber = "0"
      let flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }

      let collectionname = x
      const calltypeField = multipleSelect.calltypefield
      if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {
        const res = await fetch(`${url}/api/bucket-calltype-filter`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            collectionname, calltypeField, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
      }
      handleUniqueAgents()
      return false
    }

    else if ($("#achttype").is(':checked')) {
      const { acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44 } = dataSource
      const y = process.split("|");
      const c = y[0] + y[1];
      const cm_id = y[3]
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      var dynamicCollectionName = x
      var collectionname = x
      if (!acht1 && !acht11) {
        alert("Please input acht")
        return false
      } else {

        const res = await fetch(`${url}/api/filter-acht-data`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            dynamicCollectionName, collectionname, cm_id,
            acht1, acht11, acht2, acht22, acht3, acht33, acht4, acht44
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
          // toast.success();
        }
      }
      handleUniqueAgents()
      return false
    } else if ($("#aging").is(':checked')) {

      const y = process.split("|");
      const cm_id = y[3]
      const cm_idd = parseInt(y[3])
      const resNewHireEmp = await fetch(`${url}/api/get-agging-by-cmid`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cm_idd
        }),
      });
      const dataNewHire = await resNewHireEmp.json();
      if (resNewHireEmp.status === 422 || !dataNewHire) {
        toast.error("Error Occurred!");
      } else {
        setAgentId(dataNewHire)
      }
      const { agefield1 } = dataSource
      const target = agefield1
      // const agentId = agentid
      if (!target) {
        alert("Please select new hire target")
        return false
      } else {
        if (dataNewHire.length <= 0) {
          alert("No new hire in 30 days.")
          setFilterData("")
          return false
        } else {
          const agentId = dataNewHire
          let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
          let collectionname = x
          const res = await fetch(`${url}/api/new-hire-filter-new`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              collectionname, process, target, agentId, cm_id
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            toast.error("Error Occurred!");
          } else {
            setFilterData(data)
            $("#btn").attr('disabled', true)
            handleUniqueAgents()
          }
        }
      }
      return false
    } else if ($("#calltype").is(':checked')) {
      const y = process.split("|");
      cm_id = y[3]
      let x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      if (!multipleSelect) {
        alert("Please select calltype")
        return false
      } else {

        const calltypeField = multipleSelect.calltypefield
        let collectionname = x
        const res = await fetch(`${url}/api/calltypes-filter`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            collectionname, cm_id, calltypeField

          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
        handleUniqueAgents()
        return false
      }
    }
    else if ($("#bucket").is(':checked')) {

      const y = process.split("|");
      const c = y[0] + y[1];
      var cm_id = y[3]
      var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
      const { score_consid } = dataSource
      const { buckfield2 } = dataSource
      const { buckfield3 } = dataSource
      const { buckfield4 } = dataSource
      var flagred = "0"
      var flagamber = "0"
      var flaggreen = "0"
      if ($("#bucket2").is(':checked')) {
        flagred = "1"
      }
      if ($("#bucket3").is(':checked')) {
        flagamber = "1"
      }
      if ($("#bucket4").is(':checked')) {
        flaggreen = "1"
      }
      if (!score_consid) {
        alert("please select score consideration")
        return false
      } else {

        collectionname = x

        const res = await fetch(`${url}/api/filter-data-ryg`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            collectionname, score_consid, cm_id, buckfield2, buckfield3, buckfield4, flagred, flagamber, flaggreen

          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          toast.error("Error Occurred!");
        } else {
          // console.log(data);
          setFilterData(data)
          $("#btn").attr('disabled', true)
        }
        handleUniqueAgents()
        return false
      };

    }
  }

  const handleUniqueAgents = async () => {
    const y = process.split("|");
    const cm_id = y[3]
    var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
    var collectionname = x
    const res = await fetch(`${url}/api/get-distinct-agents`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        collectionname, cm_id
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Error Occurred!");
    } else {
      if (data.length > 0) {
        setUniqueAgents(data)
      }
    }

  };

  const handleUniqueCalltypes = async () => {
    const y = process.split("|");
    const cm_id = y[3]
    var x = ("cdr_tagging_dump_" + cm_id).toLowerCase();
    var collectionname = x
    const res = await fetch(`${url}/api/find-distinct-calltypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionname, cm_id
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setUniqueCalltypes(data);
      }
    }
  };

  useEffect(() => {

    $(function () {

      $("#achttype").on('change', function () {
        if (this.checked) {
          $(".optioncheck").removeAttr('disabled')
          $('#achtcheck1').prop('checked', false);
          $('#achtcheck2').prop('checked', false);
          $('#achtcheck3').prop('checked', false);
          $('#achtcheck4').prop('checked', false);
        }
        else {
          $(".optioncheck").attr('disabled', 'disabled')
          $("#acht1").attr('disabled', 'disabled')
          $("#acht11").attr('disabled', 'disabled')
          $("#acht2").attr('disabled', 'disabled')
          $("#acht22").attr('disabled', 'disabled')
          $("#acht4").attr('disabled', 'disabled')
          $("#acht44").attr('disabled', 'disabled')
          $("#acht3").attr('disabled', 'disabled')
          $("#acht33").attr('disabled', 'disabled')
        }
      })

      $("#achtcheck1").on('change', function () {
        if (this.checked) {
          $("#acht1").removeAttr('disabled')
          $("#acht11").removeAttr('disabled')
        }
        else {
          $("#acht1").attr('disabled', 'disabled')
          $("#acht11").attr('disabled', 'disabled')
        }
      })

      $("#achtcheck2").on('change', function () {
        if (this.checked) {
          $("#acht2").removeAttr('disabled')
          $("#acht22").removeAttr('disabled')
        }
        else {
          $("#acht2").attr('disabled', 'disabled')
          $("#acht22").attr('disabled', 'disabled')
        }
      })
      $("#achtcheck3").on('change', function () {
        if (this.checked) {
          $("#acht3").removeAttr('disabled')
          $("#acht33").removeAttr('disabled')
        }
        else {
          $("#acht3").attr('disabled', 'disabled')
          $("#acht33").attr('disabled', 'disabled')
        }
      })
      $("#achtcheck4").on('change', function () {
        if (this.checked) {
          $("#acht4").removeAttr('disabled')
          $("#acht44").removeAttr('disabled')
        }
        else {
          $("#acht4").attr('disabled', 'disabled')
          $("#acht44").attr('disabled', 'disabled')
        }
      })
      $("#aging").on('change', function () {
        if (this.checked) {
          $("#agefield1").removeAttr('disabled')
        }
        else {
          $("#agefield1").attr('disabled', 'disabled')
        }
      })
      $("#calltype").on('change', function () {
        if (this.checked) {
          $("#calltypefield").removeAttr('disabled')
        }
        else {
          $("#calltypefield").attr('disabled', 'disabled')
        }
      })

      $("#bucket2").on('change', function () {
        if (this.checked) {
          $("#buckfield2").removeAttr('disabled')
        }
        else {
          $("#buckfield2").attr('disabled', 'disabled')
        }
      })
      $("#bucket3").on('change', function () {
        if (this.checked) {
          $("#buckfield3").removeAttr('disabled')
        }
        else {
          $("#buckfield3").attr('disabled', 'disabled')
        }
      })
      $("#bucket4").on('change', function () {
        if (this.checked) {
          $("#buckfield4").removeAttr('disabled')
        }
        else {
          $("#buckfield4").attr('disabled', 'disabled')
        }
      })

    })

  }, [])

  //Get QA TL Trainer
  const handleQaTlTrainer = async () => {
    var a = process.split('|')
    var cm_id = a[3]
    const res = await fetch(`${url}/api/get-qa-tl-tr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cm_id,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setQaTlTrainer(data);
      }
    }
  };
  //Get QA TL Trainer
  const handleManualEmpID = async () => {
    var a = process.split("|");
    var cm_id = a[3];

    const res = await fetch(`${url}/api/get-manual-empid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cm_id,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      if (data.length > 0) {
        setEmpManual(data);
      }
    }
  };

  const handleRyg = async () => {
    const y = process.split("|");
    const c = y[0] + y[1];
    const cm_id = y[3]
    const res = await fetch(`${url}/api/check-ryg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cm_id,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setCheckRyg(data)
      $("#bucket").on('change', function () {

        if (data.length > 0) {
          if (this.checked) {
            $(".buck").removeAttr('disabled')
            $('#bucket2').prop('checked', false);
            $('#bucket3').prop('checked', false);
            $('#bucket4').prop('checked', false);
          }
          else {
            $(".buck").attr('disabled', 'disabled')
            $("#buckfield2").attr('disabled', 'disabled')
            $("#buckfield3").attr('disabled', 'disabled')
            $("#buckfield4").attr('disabled', 'disabled')
          }
        } else {
          $("#bucket2").attr("disabled", 'disabled')
          $("#bucket3").attr('disabled', 'disabled')
          $("#bucket4").attr('disabled', 'disabled')
          $("#score_consid").attr('disabled', 'disabled')
          $("#bucket").attr('disabled', 'disabled')
          alert("No Ryg Data!")
        }
      })
    }
  };


  //Reset after submit 
  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    setDualList({});
    setFilterType("auto");
    setEmpManual([]);

    setDataSource("");
    setMultipleSelectQa("")
    setSheetData("")
    setProcessName("")
    setFilterData("")
    setUniqueAgents("")
    $("#selectqa").val("")
    $("#selecttl").val("")
    $("#selecttrainer").val("")
    $("#calltypefield").val("")
    $(':checkbox').prop('checked', false).removeAttr('checked')
    $("#select1").val("")
    $("#collection").val("")
    $(".optioncheck").attr('disabled', 'disabled')
    $("#acht1").attr('disabled', 'disabled')
    $("#acht11").attr('disabled', 'disabled')
    $("#acht2").attr('disabled', 'disabled')
    $("#acht22").attr('disabled', 'disabled')
    $("#acht4").attr('disabled', 'disabled')
    $("#acht44").attr('disabled', 'disabled')
    $("#acht3").attr('disabled', 'disabled')
    $("#acht33").attr('disabled', 'disabled')
    $("#bucket2").attr('disabled', 'disabled')
    $("#bucket3").attr('disabled', 'disabled')
    $("#bucket4").attr('disabled', 'disabled')
    $("#buckfield2").attr('disabled', 'disabled')
    $("#buckfield3").attr('disabled', 'disabled')
    $("#buckfield4").attr('disabled', 'disabled')
    $("#score_consid").attr('disabled', 'disabled')
    $("#agefield1").attr('disabled', 'disabled')
    if ($('#radioPrimary1').prop('checked', false)) {
      $("#calltypefield").attr('disabled', 'disabled')
      $("#form3").hide()
      $("#form2").hide()
      $("#form4").hide()
    } else {
    }
    $('#radioPrimary2').prop('checked', false);
  };

  let assignDataUsers = {}
  let empid = []

  const manualFilter = async () => {
    var a = process.split("|");
    var cm_id = a[3];
    const res = await fetch(`${url}/api/get-manual-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected,
        cm_id,
      }),
    });
    const data = await res.json();
    setFilterData(data);
  };


  const handleAllocation = async (e) => {
    e.preventDefault()
    var audit_status = "0"
    if (!multipleSelectTl && !multipleSelectQa && !multipleSelectTrainer) {
      alert("Please select any QA TL Trainer.")
      return false
    } else {
      if (!multipleSelectTrainer) {
        var trainerAssignCount = 0
      } else {
        Object.values(multipleSelectTrainer)[0].map((element) => {
          assignDataUsers[element] = countQaTlTrainer.trainerCount
          empid.push(element)
        })
        trainerAssignCount = Object.values(multipleSelectTrainer)[0].length * countQaTlTrainer.trainerCount
      }

      if (!multipleSelectQa) {
        var qaAssignCount = 0
      } else {
        Object.values(multipleSelectQa)[0].map((el) => {
          assignDataUsers[el] = countQaTlTrainer.qaCount
          empid.push(el)
        })
        qaAssignCount = Object.values(multipleSelectQa)[0].length * countQaTlTrainer.qaCount
      }

      if (!multipleSelectTl) {
        var tlAssignCount = 0
      } else {
        Object.values(multipleSelectTl)[0].map((elements) => {
          assignDataUsers[elements] = countQaTlTrainer.tlCount
          empid.push(elements)
        })
        tlAssignCount = Object.values(multipleSelectTl)[0].length * countQaTlTrainer.tlCount
      }

      var totalAssigningData = (tlAssignCount + trainerAssignCount + qaAssignCount)

      if (totalAssigningData <= (Object.keys(filterData).length)) {
        if (!process || !empid || !assignDataUsers) {
          return false
        } else {
          var a = process.split("|")
          var cmid = a[3]
          const c = a[0] + a[1];
          var collectionname = ("cdr_tagging_dump_" + cmid).toLowerCase();
          const audi_post = []
          empid.map((el) => {
            var ddd = el.split('-')
            audi_post.push(ddd[1]);
          })
          const auditor_post = audi_post
          const res = await fetch(`${url}/api/allocation-data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              process, assignDataUsers, sheetid, audit_status, empid, cmid, auditor_post, collectionname
            }),
          });
          const data = await res.json();
          if (res.status === 422 || !data) {
            console.log("error");
          } else if (res.status === 200) {
            handleReset()
            $("#btn").attr('disabled', false)
            document.getElementById('form2').reset();
            document.getElementById('form3').reset();
            document.getElementById('form4').reset();
            toast.success("Data Allocated Successfully!")

          }
          else {
            toast.error("Error")
          }
        }
      } else {
        alert("Assigning data is more than the filtered data")
      }
    }
  }


  //For process
  useEffect(() => {
    const postdata1 = async () => {
      const qh = isAuth().EmployeeID
      const res = await fetch(`${url}/api/get-process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qh
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
            setProcesses(data);
          }
        }
      }
    };
    postdata1()

  }, []);


  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid" >
            <form id="form1">
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Sample Allocation
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-sm-4">
                          <label htmlFor="xyz">Process</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            id="select1"
                            name="process"
                            onChange={handleChangeProcess}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {
                              return <option value={element.Process + '|' + element.cm_id} key={element.cm_id}>{element.Process}</option>
                            }) : null : null}
                          </select>
                        </div>
                        <div className=" form-group col-sm-4">
                          <label htmlFor="xyz">Quality Form:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="collectionname"
                            id='collection'
                            onChange={handleSheetData}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {processName
                              ? processName.map((element) => {
                                var sheetname = element.collectionname.split('_')
                                var newSheetName1 = sheetname.slice(1);
                                return (
                                  <option key={element._id} value={element.collectionname}>
                                    {newSheetName1.join('_')}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                        </div>
                        <div className="form-group clearfix col-sm-4">
                          <label>Filter Type</label>
                          <div className="row">
                            <div className="icheck-primary ml-2">
                              <input
                                type="radio"
                                id="radioPrimary1"
                                name="r1"
                                onChange={() => {
                                  setFilterData("");
                                  setDualList({});
                                }}
                              />
                              <label htmlFor="radioPrimary1">Auto</label>
                            </div>
                            <div className="icheck-primary ml-2" >
                              <input
                                type="radio"
                                id="radioPrimary2"
                                name="r1"
                                onChange={() => {
                                  setFilterType("manual");
                                  setFilterData("");
                                  setDualList({});
                                }}
                              />
                              <label htmlFor="radioPrimary2">Manual</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form id="form2" style={{ display: 'none' }}>
              <div className="row mt-1">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header ">
                      <div className="row">
                        <h6 style={{ fontSize: "11.6px" }} className="card-title">
                          Sample Selection Criteria:
                        </h6>
                        <div className="form-check col-sm-2 ml-4 mr-3 o1">
                          <input
                            type="checkbox"
                            name="achtcheck1"
                            className="form-check-input optioncheck"
                            id="achtcheck1"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck1"
                          >
                            OPTION 1
                          </label>
                        </div>
                        <div className="form-check  col-sm-2 ml-3 o2">
                          <input
                            type="checkbox"
                            name="achtcheck2"
                            className="form-check-input optioncheck"
                            id="achtcheck2"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck2"
                          >
                            OPTION 2
                          </label>
                        </div>
                        <div className="form-check  col-sm-2 ml-3 o3">
                          <input
                            type="checkbox"
                            name="achtcheck3"
                            className="form-check-input optioncheck"
                            id="achtcheck3"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck3"
                          >
                            OPTION 3
                          </label>
                        </div>
                        <div className="form-check ml-4 o4">
                          <input
                            type="checkbox"
                            name="achtcheck4"
                            className="form-check-input optioncheck"
                            id="achtcheck4"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck4"
                          >
                            OPTION 4
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-check mr-5">
                          <input
                            type="checkbox"
                            name="achttype"
                            className="form-check-input"
                            id="achttype"
                          />
                          <label
                            style={{ fontSize: "11.6px" }}
                            className=" mt-1"
                            htmlFor="exampleCheck1"
                          >
                            ACHT
                          </label>
                        </div>

                        <div className="col-sm-1 ml-5 achtcol">
                          <input
                            type="number"
                            name="acht1"
                            onChange={setdata}
                            id="acht1"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 achtcol">
                          <input
                            type="number"
                            name="acht11"
                            onChange={setdata}
                            id="acht11"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4 achtcol">
                          <input
                            type="number"
                            name="acht2"
                            onChange={setdata}
                            id="acht2"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 achtcol">
                          <input
                            type="number"
                            name="acht22"
                            onChange={setdata}
                            id="acht22"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4 achtcol">
                          <input
                            type="number"
                            name="acht3"
                            onChange={setdata}
                            id="acht3"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 achtcol">
                          <input
                            type="number"
                            name="acht33"
                            onChange={setdata}
                            id="acht33"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4 achtcol">
                          <input
                            type="number"
                            name="acht4"
                            onChange={setdata}
                            id="acht4"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 achtcol">
                          <input
                            type="number"
                            name="acht44"
                            onChange={setdata}
                            id="acht44"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                      </div>
                      <hr style={{
                        height: '1px', color: '#17a2b8',
                        borderColor: '#17a2b8', background: '#17a2b8',
                      }}></hr>
                      <div className="row">
                        <div className="form-check mr-5">
                          <input
                            type="checkbox"
                            name="calltype"
                            className="form-check-input"
                            id="calltype"
                          />
                          <label
                            style={{ fontSize: "11.6px" }}
                            className="mt-1"
                            htmlFor="calltype"
                          >
                            CALL TYPES TO BE AUDITED
                          </label>
                        </div>
                        <div className="form-group col-sm-3">
                          <b>Select Call type:</b>
                          <select
                            name="calltypefield"
                            id="calltypefield"
                            multiple
                            onChange={handleMultipleSelect}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                            disabled
                          >
                            <option value="">--Select--</option>
                            {uniqueCalltypes ? uniqueCalltypes.map((element) => {
                              return <option value={element._id} key={element._id + element.count}>{element._id + " " + "(" + element.count + ")"}</option>
                            }) : ""}

                          </select>
                        </div>
                      </div>
                      <hr style={{
                        height: '1px', color: '#17a2b8',
                        borderColor: '#17a2b8', background: '#17a2b8',
                      }}></hr>
                      <div className="row">
                        <div className="form-check mr-5">
                          <input
                            type="checkbox"
                            name="aging"
                            className="form-check-input"
                            id="aging"
                          />
                          <label
                            style={{ fontSize: "11.6px" }}
                            className=" mt-1"
                            htmlFor="aging"
                          >
                            NEW HIRE AUDIT TARGET
                          </label>
                        </div>
                        <div className="form-group col-sm-2">
                          <select
                            name="agefield1"
                            id="agefield1"
                            className="form-control form-control-sm"
                            onChange={setdata}
                            style={{ fontSize: "12.4px" }}
                            required
                            disabled
                          >
                            <option value="">--Select--</option>
                            {_.times(10, (i) => (
                              <option key={i}>{(i + 1)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <span className="label other">0-30</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="card card-info mt-n4">
                    <div className="card-header ">
                      <div className="row offset-md-3">
                        <h6
                          style={{ fontSize: "12px" }}
                          className="card-title"
                        ></h6>
                        <div className="form-check col-sm-2  mr-2 per">
                          <input
                            type="checkbox"
                            name="bucket2"
                            onChange={setdata}
                            className="form-check-input buck"
                            id="bucket2"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label  danger label"
                            htmlFor="bucket2"
                          >
                            RED
                          </label>
                        </div>
                        <div className="form-check  col-sm-3 ml-3 per">
                          <input
                            type="checkbox"
                            name="bucket3"
                            onChange={setdata}
                            className="form-check-input buck"
                            id="bucket3"
                            disabled
                          />
                          <label
                            style={{
                              fontSize: "12px", color: 'white',
                              backgroundColor: "#ff9800",
                            }}
                            className="form-check-label label"
                            htmlFor="bucket3"
                          >
                            AMBER
                          </label>
                        </div>
                        <div className="form-check col-sm-2 per">
                          <input
                            type="checkbox"
                            name="bucket4"
                            onChange={setdata}
                            className="form-check-input buck"
                            id="bucket4"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px", color: 'white' }}
                            className="form-check-label success label"
                            htmlFor="bucket4"
                          >
                            GREEN
                          </label>
                        </div>
                        <div className="form-check ml-4 per1">
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1 "
                            htmlFor="exampleCheck1"
                          >
                            SCORE CONSIDERATION
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row ml-2 mt-2">
                      <div className="form-check mr-5 performance">
                        <input
                          type="checkbox"
                          name="bucket"
                          className="form-check-input"
                          id="bucket"
                        />
                        <label
                          style={{ fontSize: "11.6px" }}
                          className=" mt-1"
                          htmlFor="bucket"
                        >
                          AUDIT TARGET BY PERFORMANCE
                        </label>
                      </div>
                      <div className="form-group col-sm-2 perfscore">
                        <select
                          name="buckfield2"
                          id="buckfield2"
                          onChange={setdata}
                          className="form-control form-control-sm"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option value="">--Select--</option>
                          {_.times(11, (i) => (
                            <option key={i}>{(i)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-sm-2 perfscore">
                        <select
                          name="buckfield3"
                          id="buckfield3"
                          className="form-control form-control-sm"
                          onChange={setdata}
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option value="">--Select--</option>
                          {_.times(11, (i) => (
                            <option key={i}>{(i)}</option>
                          ))}
                        </select>

                      </div>
                      <div className="form-group col-sm-2 perfscore">
                        <select
                          name="buckfield4"
                          id="buckfield4"
                          onChange={setdata}
                          className="form-control form-control-sm"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option value="">--Select--</option>
                          {_.times(11, (i) => (
                            <option key={i}>{(i)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-sm-2 perfscore1 score">
                        <select
                          name="score_consid"
                          id="score_consid"
                          onChange={setdata}
                          className="form-control form-control-sm buck"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option value="">--Select--</option>
                          <option value="week">Week Wise</option>
                          <option value="fortnight">Fortnight</option>
                          <option value="month">Monthly</option>
                        </select>
                      </div>
                    </div>
                    <center className="mb-2">
                      <button
                        id="btn"
                        type="submit"
                        onClick={handleFilter}
                        style={{
                          color: "white",
                          fontSize: "12.4px"
                        }}
                        className="btn btn-info  mt-2 filterbtn"
                      >
                        Filter
                      </button>
                      <span className="ml-3">TOTAL RECORDS FOUND</span>{" "}
                      <span
                        style={{ color: "white", backgroundColor: '#20a0c1' }}
                        className="label"
                      >
                        {filterData ? Object.keys(filterData).length : "0"}
                      </span>
                      <span className="ml-3 ua">UNIQUE AGENT</span>{" "}
                      <span
                        style={{ color: "white", backgroundColor: '#20a0c1' }}
                        className="label"
                      >
                        {uniqueAgents ? Object.keys(uniqueAgents).length : "0"}

                      </span>
                    </center>
                  </div>

                </div>
              </div>
            </form>
            {/* Manual Allocation of agents */}
            <form id="form3" style={{ display: 'none' }}>
              <div className="row mt-1">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        MANUAL ALLOCATION OF AGENTS
                      </h3>
                    </div>
                    <div className="card-body">
                      <div
                        className="mt-2 ml-3 row"
                      >
                        <DualListBox
                          options={opt}
                          selected={selected}
                          onChange={onChanges}
                          name="agents"
                          canFilter
                          alignActions="top"
                          style={{ fontSize: "12.4px" }}
                          className="m-2 w-100 "
                          icons={{
                            moveLeft: [
                              <span className="mr-3">SELECTED AGENTS</span>,
                              <span className="fa fa-chevron-left" />,
                            ],
                            moveAllLeft: [
                              <span key={0} className="fa fa-chevron-left" />,
                              <span key={1} className="fa fa-chevron-left" />,
                            ],
                            moveRight: <span className="fa fa-chevron-right" />,
                            moveAllRight: [
                              <span className="mr-3">AGENTS </span>,
                              <span key={0} className="fa fa-chevron-right" />,
                              <span key={1} className="fa fa-chevron-right" />,
                            ],
                            moveDown: <span className="fa fa-chevron-down" />,
                            moveUp: <span className="fa fa-chevron-up" />,
                            moveTop: <span className="fa fa-double-angle-up" />,
                            moveBottom: <span className="fa fa-double-angle-down" />,
                          }}
                        />
                      </div>
                    </div>
                    <center className="mb-2">
                      <button
                        id="btn1"
                        type="button"
                        onClick={manualFilter}
                        style={{
                          color: "white",
                          fontSize: "12.4px",
                        }}
                        className="btn btn-info  mt-2 "
                      >
                        Filter
                      </button>

                      <span className="ml-2">TOTAL RECORDS FOUND:</span>{" "}
                      <span style={{ color: "white", backgroundColor: '#20a0c1' }}
                        className="label ml-2">{filterData ? Object.values(filterData).length : '0'}</span>

                    </center>
                  </div>
                </div>
              </div>
            </form>

            <form id="form4" style={{ display: 'none' }}>
              <div className="row mt-1">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row offset-md-4 alrow">
                        <h3
                          style={{ fontSize: "12px" }}
                          className="card-title"
                        > </h3>

                        <div className="form-check ">
                          <input
                            type="checkbox"
                            name="achtcheck1"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="exampleCheck1"
                          >
                            QA
                          </label>
                          <span className="ml-2">({multipleSelectQa ? Object.values(multipleSelectQa)[0].length : "0"})</span>
                        </div>
                        <div className="col-md-1 mr-5 qarow">
                          <input
                            type="number"
                            onChange={setdata1}
                            className="form-control form-control-sm"
                            name="qaCount"
                          />
                        </div>
                        <div className="form-check ml-4 tlcheck">
                          <input
                            type="checkbox"
                            name="achtcheck2"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="exampleCheck1"
                          >
                            TL
                          </label>
                          <span className="ml-2">({multipleSelectTl ? Object.values(multipleSelectTl)[0].length : "0"})</span>
                        </div>
                        <div className="col-md-1 mr-5 tlrow">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            onChange={setdata1}
                            name="tlCount"
                          />
                        </div>
                        <div className="form-check ml-4 tcheck">
                          <input
                            type="checkbox"
                            name="achtcheck3"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1 "
                            htmlFor="exampleCheck1"
                          >
                            TRAINER
                          </label>
                          <span className="ml-2">({multipleSelectTrainer ? Object.values(multipleSelectTrainer)[0].length : "0"})</span>
                        </div>
                        <div className="col-md-1 mr-5 trow">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            onChange={setdata1}
                            name="trainerCount"
                          />
                        </div>
                        <div className="form-check ml-4 ac">
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="exampleCheck1"
                          >
                            ACTION
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <label
                          style={{ fontSize: "11.6px" }}
                          className=" mt-1 group"
                          htmlFor="exampleCheck1"
                        >
                          SAMPLE ALLOCATION TARGET BY SUPERVISOR GROUP
                        </label>
                        <div className="form-group col-sm-2 ml-5 qa">
                          <select
                            name="getselectqa"
                            multiple
                            id="selectqa"
                            className="form-control form-control-sm qabox"
                            onChange={handleMultipleSelectQa}
                            style={{ fontSize: "12.4px" }}
                            required
                          >

                            {qaTlTrainerGet ? qaTlTrainerGet.map((elements) => {
                              if (elements.Designation === "QA") {
                                return <option key={elements._id} value={elements.EmployeeID + '-' + elements.Designation}>{elements.Name + "  (" + elements.Designation + ")"}</option>
                              }
                            }) : ''
                            }
                          </select>
                        </div>
                        <div className="form-group col-sm-2 ml-3 tl">
                          <select
                            name="getselecttl"
                            multiple
                            id="selecttl"
                            onChange={handleMultipleSelectTl}
                            className="form-control form-control-sm tlbox"
                            style={{ fontSize: "12.4px" }}
                            required
                          >

                            {qaTlTrainerGet ? qaTlTrainerGet.map((elements) => {
                              if (elements.Designation === "TL") {
                                return <option key={elements._id} value={elements.EmployeeID + '-' + elements.Designation}>{elements.Name + "  (" + elements.Designation + ")"}</option>
                              }
                            }) : ''
                            }
                          </select>
                        </div>
                        <div className="form-group col-sm-2 ml-2 t">
                          <select
                            name="getselecttrainer"
                            multiple
                            id="selecttrainer"
                            onChange={handleMultipleSelectTrainer}
                            className="form-control form-control-sm tbox"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            {qaTlTrainerGet ? qaTlTrainerGet.map((elements) => {
                              if (elements.Designation === "Trainer") {
                                return <option key={elements._id} value={elements.EmployeeID}>{elements.Name + "  (" + elements.Designation + ")"}</option>
                              }
                            }) : ''
                            }
                          </select>
                        </div>
                        <div className="ml-5 albtn">
                          <button

                            type="submit"
                            onClick={handleAllocation}
                            style={{
                              color: "white",
                              fontSize: "12.4px"
                            }}
                            className="btn btn-info"
                          >
                            ALLOCATE
                          </button>
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
    </>
  );
};

export default SampleAllocation;
