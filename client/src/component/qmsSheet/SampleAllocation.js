import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import "../../css/SampleAllocation.css";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

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
  const [calltypeFilters, setCalltypesFilters] = useState("")
  const [qaTlTrainerGet, setQaTlTrainer] = useState("")
  const [duallist, setDualList] = useState({});
  const [checkryg,setCheckRyg] = useState("")
  const [countQaTlTrainer,setCountQaTlTrainer] = useState("")
  const [sheetid,setSheetId] = useState("")

  let { selected } = duallist;
  const opt = [
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
  ];
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
    setMultipleSelect({calltypefield: value});
  }

  const handleMultipleSelectTl = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectTl({getselecttl: value});
  }

  const handleMultipleSelectTrainer = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectTrainer({ value});
  }
  const handleMultipleSelectQa = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMultipleSelectQa({ value});
  }
  //Call type filter data
//   const handleCalltypeFilters = async (event) => {
//     event.preventDefault();
//     const y = process.split("|");
//       const c = y[0] + y[1];
//       var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
//     var collectionname = x
// var calltypefield2 = multipleSelect.calltypefield[0]
// var calltypefield3 = multipleSelect.calltypefield[1]
// var calltypefield4 = multipleSelect.calltypefield[2]
// var calltypefield5 = multipleSelect.calltypefield[3]
 
//     const res = await fetch(`/api/calltypes-filter`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         collectionname,calltypefield2,calltypefield3,calltypefield4,calltypefield5
       
//       }),
//     });
//     const data = await res.json();
//     if (res.status === 422 || !data) {
//       toast.error("Error Occurred!");
//     } else {
//       setCalltypesFilters(data)
//     }
//   };

  const handleChangeProcess = (e) => {
    e.preventDefault();
    const getdata = async () => {
      const process = e.target.value;
      setProcess(e.target.value);
      const res = await fetch("/api/find-data-with-process-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process,
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
          setSheetData(data);
        }
      }
    };
    postdata();
    handleUniqueCalltypes()
    handleQaTlTrainer()
    handleRyg()
  };

const handleFilter = async(e) =>{
e.preventDefault()
if($("#achttype").is(':checked')&& $("#calltype").is(':checked')){

  const {acht1,acht11,acht2,acht22,acht3,acht33,acht4,acht44} = dataSource
  var calltypefield2 = multipleSelect.calltypefield[0]
var calltypefield3 = multipleSelect.calltypefield[1]
var calltypefield4 = multipleSelect.calltypefield[2]
var calltypefield5 = multipleSelect.calltypefield[3]
  const y = process.split("|");
        const c = y[0] + y[1];
        var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
      var  dynamicCollectionName = x
      var collectionname = x
      const res = await fetch(`/api/acht-calltype-filter-save`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          dynamicCollectionName,collectionname,
          acht1,acht11,acht2,acht22,acht3,acht33,acht4,acht44,calltypefield2,calltypefield3,calltypefield4,calltypefield5
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Error Occurred!");
      } else {
        console.log("success");
        setFilterData(data)
        // toast.success();
      }
      handleUniqueAgents()

}
else if($("#achttype").is(':checked')){

    const {acht1,acht11,acht2,acht22,acht3,acht33,acht4,acht44} = dataSource
    const y = process.split("|");
      const c = y[0] + y[1];
      var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
    var  dynamicCollectionName = x
    var collectionname = x
    const res = await fetch(`/api/filter-acht-data`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        dynamicCollectionName,collectionname,
        acht1,acht11,acht2,acht22,acht3,acht33,acht4,acht44
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Error Occurred!");
    } else {
      console.log("success");
      setFilterData(data)
      // toast.success();
    }
    handleUniqueAgents()
    
}else if($("#aging").is(':checked')){
 
  const y = process.split("|");
  const c = y[0] + y[1];
  var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
var collectionname = x
const res = await fetch(`/api/new-hire-filter`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    collectionname,process
  }),
});
const data = await res.json();
if (res.status === 422 || !data) {
  toast.error("Error Occurred!");
} else {
  setFilterData(data)
}

}else if($("#calltype").is(':checked')){
  const y = process.split("|");
  const c = y[0] + y[1];
  var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
var collectionname = x
var calltypefield2 = multipleSelect.calltypefield[0]
var calltypefield3 = multipleSelect.calltypefield[1]
var calltypefield4 = multipleSelect.calltypefield[2]
var calltypefield5 = multipleSelect.calltypefield[3]

const res = await fetch(`/api/calltypes-filter`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    collectionname,calltypefield2,calltypefield3,calltypefield4,calltypefield5
   
  }),
});
const data = await res.json();
if (res.status === 422 || !data) {
  toast.error("Error Occurred!");
} else {
  setFilterData(data)
}
handleUniqueAgents()
};
    
 }

 const handleUniqueAgents = async () => {
  const y = process.split("|");
  const c = y[0] + y[1];
  var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
  var collectionname = x
  const res = await fetch(`/api/get-distinct-agents`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      collectionname,
    }),
  });
  const data = await res.json();
  if (res.status === 422 || !data) {
    toast.error("Error Occurred!");
  } else {
    setUniqueAgents(data)
  }
  
};
useEffect(() => {
  handleUniqueAgents()
  handleQaTlTrainer()
}, []);

  const handleUniqueCalltypes = async () => {
  const y = process.split("|");
  const c = y[0] + y[1];
  var x = ("cdr_tagging_dump_" + c.replace(/ /g, "") + "s").toLowerCase();
  var collectionname = x
    const res = await fetch("/api/find-distinct-calltypes", {
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
      console.log("error ");
    } else {
      setUniqueCalltypes(data);
    }
  };

  useEffect(() => {
  
    $(function () {
      
     $("#achttype").on('change',function(){
      if (this.checked) {$(".optioncheck").removeAttr('disabled')
      $('#achtcheck1').prop('checked', false); 
      $('#achtcheck2').prop('checked', false); 
      $('#achtcheck3').prop('checked', false); 
      $('#achtcheck4').prop('checked', false); 
    }
      else{
        $(".optioncheck").attr('disabled','disabled')
        $("#acht1").attr('disabled','disabled')
        $("#acht11").attr('disabled','disabled')
        $("#acht2").attr('disabled','disabled')
        $("#acht22").attr('disabled','disabled')
        $("#acht4").attr('disabled','disabled')
        $("#acht44").attr('disabled','disabled')
        $("#acht3").attr('disabled','disabled')
        $("#acht33").attr('disabled','disabled')
      }
     })

     $("#achtcheck1").on('change', function(){
      if (this.checked) {$("#acht1").removeAttr('disabled')
      $("#acht11").removeAttr('disabled')
    }
      else{
        $("#acht1").attr('disabled','disabled')
        $("#acht11").attr('disabled','disabled')
      }
     })

     $("#achtcheck2").on('change', function(){
      if (this.checked) {$("#acht2").removeAttr('disabled')
      $("#acht22").removeAttr('disabled')
    }
      else{
        $("#acht2").attr('disabled','disabled')
        $("#acht22").attr('disabled','disabled')
      }
     })
     $("#achtcheck3").on('change', function(){
      if (this.checked) {$("#acht3").removeAttr('disabled')
      $("#acht33").removeAttr('disabled')
    }
      else{
        $("#acht3").attr('disabled','disabled')
        $("#acht33").attr('disabled','disabled')
      }
     })
     $("#achtcheck4").on('change', function(){
      if (this.checked) {$("#acht4").removeAttr('disabled')
      $("#acht44").removeAttr('disabled')
    }
      else{
        $("#acht4").attr('disabled','disabled')
        $("#acht44").attr('disabled','disabled')
      }
     })
     $("#aging").on('change', function (){  
      if (this.checked) {$("#agefield1").removeAttr('disabled')
    }
      else{
        $("#agefield1").attr('disabled','disabled')
      }
     })
     $("#calltype").on('change', function (){  
      if (this.checked) {$("#calltypefield").removeAttr('disabled')
    }
      else{
        $("#calltypefield").attr('disabled','disabled')
      }
     })

     $("#bucket").on('change',function(){
      if (this.checked) {$(".buck").removeAttr('disabled')
      $('#bucket2').prop('checked', false); 
      $('#bucket3').prop('checked', false); 
      $('#bucket4').prop('checked', false); 
    }
      else{
        $(".buck").attr('disabled','disabled')
        $("#buckfield2").attr('disabled','disabled')
        $("#buckfield3").attr('disabled','disabled')
        $("#buckfield4").attr('disabled','disabled')
      }
     })
     
     $("#bucket2").on('change', function (){  
      if (this.checked) {$("#buckfield2").removeAttr('disabled')
    }
      else{
        $("#buckfield2").attr('disabled','disabled')
      }
     })
     $("#bucket3").on('change', function (){  
      if (this.checked) {$("#buckfield3").removeAttr('disabled')
    }
      else{
        $("#buckfield3").attr('disabled','disabled')
      }
     })
     $("#bucket4").on('change', function (){  
      if (this.checked) {$("#buckfield4").removeAttr('disabled')
    }
      else{
        $("#buckfield4").attr('disabled','disabled')
      }
     })

    })

  }, [])

//Get QA TL Trainer
const handleQaTlTrainer = async () => {
    const res = await fetch("/api/get-qa-tl-trainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        process,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setQaTlTrainer(data);
    }
  };

  const handleRyg = async () => {
    const res = await fetch("/api/check-ryg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        process,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setCheckRyg(data)
    }
  };

      // $("#bucket").on('click', function(){
      //   if(Object.keys(checkryg).length > 0 ){
  
      //  }else{
      //    $("#bucket").attr('disabled','disabled')
      //    $("#bucket2").attr('disabled','disabled')
      //    $("#bucket3").attr('disabled','disabled')
      //    $("#bucket4").attr('disabled','disabled')
      //    $("#score_consid").attr('disabled','disabled')
      //    alert("No Ryg Data!")
      //  }})
  
      let assignDataUsers ={}
      let empid = []
const handleAllocation = async(e) =>{
 e.preventDefault()
var audit_status = "0"
var auditeeid = "CE032291876"
if(!multipleSelectTrainer || !multipleSelectTl || !multipleSelectQa){
  alert("Please select QA TL Trainer.")
  return false
}else{
Object.values(multipleSelectTrainer)[0].map((element)=>{
  assignDataUsers[element] = countQaTlTrainer.trainerCount
 empid.push(element)
})

Object.values(multipleSelectTl)[0].map((elements)=>{
  assignDataUsers[elements] = countQaTlTrainer.tlCount
  empid.push(elements)
})
Object.values(multipleSelectQa)[0].map((el)=>{
  assignDataUsers[el] = countQaTlTrainer.qaCount
  empid.push(el)
})
var tlAssignCount = Object.values(multipleSelectTl)[0].length * countQaTlTrainer.tlCount
var trainerAssignCount = Object.values(multipleSelectTrainer)[0].length * countQaTlTrainer.trainerCount
var qaAssignCount = Object.values(multipleSelectQa)[0].length * countQaTlTrainer.qaCount
var totalAssigningData  =  (tlAssignCount + trainerAssignCount + qaAssignCount)
if(totalAssigningData <= (Object.keys(filterData).length)){
if(!process  || !empid || !assignDataUsers){
  return false
}else{
   const res = await fetch("/api/allocation-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        process,auditeeid,assignDataUsers,sheetid,audit_status,empid
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error");
    } else if(res.status === 200){
     toast.success("Data Allocated Successfully!")
    }
    else{
      toast.error("Error")
    }
  }
}else{
  alert("Assigning data is more than the filtered data")
}
}
   }


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
                            <option defaultValue="">--Select--</option>
                            <option>
                              Information Technology|Software
                              Development|Software Development
                            </option>
                            <option>abc|abc|abc</option>
                          </select>
                        </div>
                        <div className=" form-group col-sm-4">
                          <label htmlFor="xyz">Quality Form:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="collectionname"
                            onChange={handleSheetData}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {processName
                              ? processName.map((element) => {
                                return (
                                  <option key={element._id}>
                                    {element.collectionname}
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
                              />
                              <label htmlFor="radioPrimary1">Auto</label>
                            </div>
                            <div className="icheck-primary ml-2">
                              <input
                                type="radio"
                                id="radioPrimary2"
                                name="r1"
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
            <form id="form2" style={{display:'none'}}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header ">
                      <div className="row">
                        <h6 style={{ fontSize: "11.6px" }} className="card-title">
                          Sample Selection Criteria:
                        </h6>
                        <div className="form-check col-sm-2 ml-4 mr-3">
                          <input
                            type="checkbox"
                            name="achtcheck1"
                            className="form-check-input optioncheck"
                            id="achtcheck1"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck1"
                          >
                            OPTION 1
                          </label>
                        </div>
                        <div className="form-check  col-sm-2 ml-3">
                          <input
                            type="checkbox"
                            name="achtcheck2"
                            className="form-check-input optioncheck"
                            id="achtcheck2"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck2"
                          >
                            OPTION 2
                          </label>
                        </div>
                        <div className="form-check  col-sm-2 ml-3">
                          <input
                            type="checkbox"
                            name="achtcheck3"
                            className="form-check-input optioncheck"
                            id="achtcheck3"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label mt-1"
                            htmlFor="achtcheck3"
                          >
                            OPTION 3
                          </label>
                        </div>
                        <div className="form-check ml-4 ">
                          <input
                            type="checkbox"
                            name="achtcheck4"
                            className="form-check-input optioncheck"
                            id="achtcheck4"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
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

                        <div className="col-sm-1 ml-5">
                          <input
                            type="text"
                            name="acht1"
                            onChange={setdata}
                            id="acht1"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1">
                          <input
                            type="text"
                            name="acht11"
                            onChange={setdata}
                            id="acht11"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4">
                          <input
                            type="text"
                            name="acht2"
                            onChange={setdata}
                            id="acht2"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1">
                          <input
                            type="text"
                            name="acht22"
                            onChange={setdata}
                            id="acht22"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4">
                          <input
                            type="text"
                            name="acht3"
                            onChange={setdata}
                            id="acht3"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1">
                          <input
                            type="text"
                            name="acht33"
                            onChange={setdata}
                            id="acht33"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1 ml-4">
                          <input
                            type="text"
                            name="acht4"
                            onChange={setdata}
                            id="acht4"
                            className="form-control form-control-sm"
                            disabled
                          />
                        </div>
                        <div className="col-sm-1">
                          <input
                            type="text"
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
                            <option defaultValue="">--Select--</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                        <div>
                          <span className="label other">0-30</span>
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
                            { uniqueCalltypes?uniqueCalltypes.map((element)=>{
                          return <option key={element + '64987'}>{element}</option>
                            }):""}
                          
                          </select>
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
                        <div className="form-check col-sm-2  mr-2">
                          <input
                            type="checkbox"
                            name="bucket2"
                            className="form-check-input buck"
                            id="bucket2"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label  danger label"
                            htmlFor="bucket2"
                          >
                            RED
                          </label>
                        </div>
                        <div className="form-check  col-sm-3 ml-3">
                          <input
                            type="checkbox"
                            name="bucket3"
                            className="form-check-input buck"
                            id="bucket3"
                            disabled
                          />
                          <label
                            style={{
                              fontSize: "12px",
                              backgroundColor: "#ff9800",
                            }}
                            className="form-check-label label"
                            htmlFor="bucket3"
                          >
                            AMBER
                          </label>
                        </div>
                        <div className="form-check col-sm-2 ">
                          <input
                            type="checkbox"
                            name="bucket4"
                            className="form-check-input buck"
                            id="bucket4"
                            disabled
                          />
                          <label
                            style={{ fontSize: "12px" }}
                            className="form-check-label success label"
                            htmlFor="bucket4"
                          >
                            GREEN
                          </label>
                        </div>
                        <div className="form-check ml-4 ">
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
                      <div className="form-check mr-5">
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
                      <div className="form-group col-sm-2">
                        <select
                          name="buckfield2"
                          id="buckfield2"
                          onChange={setdata}
                          className="form-control form-control-sm"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option defaultValue="">--Select--</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </div>
                      <div className="form-group col-sm-2">
                        <select
                          name="buckfield3"
                          id="buckfield3"
                          className="form-control form-control-sm"
                          onChange={setdata}
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option defaultValue="">--Select--</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                
                      </div>
                      <div className="form-group col-sm-2">
                        <select
                          name="buckfield4"
                          id="buckfield4"
                          onChange={setdata}
                          className="form-control form-control-sm"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option defaultValue="">--Select--</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </div>
                      <div className="form-group col-sm-2">
                        <select
                          name="score_consid"
                          id="score_consid"
                          onChange={setdata}
                          className="form-control form-control-sm buck"
                          style={{ fontSize: "12.4px" }}
                          required
                          disabled
                        >
                          <option defaultValue="">--Select--</option>
                          <option>Week Wise</option>
                          <option>Fortnight</option>
                          <option>Monthly</option>
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
                          fontSize: "12.4px",
                          backgroundColor: "#474545",
                        }}
                        className="btn  mt-2"
                      >
                        Filter
                      </button>
                      <span className="ml-3">TOTAL RECORDS FOUND</span>{" "}
                      <span
                        style={{ color: "white" }}
                        className="label success"
                      >
                        {/* {filterData?filterData.length:"0"} */}
                        {filterData?Object.keys(filterData).length:"0"}
                      </span>
                      <span className="ml-3">UNIQUE AGENT</span>{" "}
                      <span
                        style={{ color: "white" }}
                        className="label success"
                      >
                        {uniqueAgents?Object.keys(uniqueAgents).length:"0"}
                        
                      </span>
                    </center>
                  </div>

                </div>
              </div>
            </form>
            {/* Manual Allocation of agents */}
            <form id="form3" style={{ display: 'none' }}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-body">
                      <h6 className="label info">MANUAL ALLOCATION OF AGENTS</h6>
                      <div
                        // style={{ fontSize: "12.5px" }}
                        className="mt-2 ml-3 row"
                      >
                        <legend
                          className="col-md-5 mr-5 font-weight-bold"
                          style={{ fontSize: "11px" }}
                        >
                          AGENT NAME
                        </legend>
                        <legend
                          className="col-md-5 ml-5 font-weight-bold"
                          style={{ fontSize: "11px" }}
                        >
                          SELECTED AGENTS
                        </legend>
                        <DualListBox
                          options={opt}
                          selected={selected}
                          onChange={onChanges}
                          name="agents[]"
                          alignActions="top"
                          style={{ fontSize: "12.4px" }}
                          className="m-2 w-100 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>


            <form id="form4" style={{display:'none'}}>
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <div className="row offset-md-4">
                        <h3
                          style={{ fontSize: "12px" }}
                          className="card-title"
                        ></h3>

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
                          <span className="ml-2">({multipleSelectQa?Object.values(multipleSelectQa)[0].length:"0"})</span>
                        </div>
                        <div className="col-md-1 mr-5">
                          <input
                            type="number"
                            onChange={setdata1}
                            className="form-control form-control-sm"
                            name="qaCount"
                          />
                        </div>
                        <div className="form-check ml-4">
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
                          <span className="ml-2">({multipleSelectTl?Object.values(multipleSelectTl)[0].length:"0"})</span>
                        </div>
                        <div className="col-md-1 mr-5">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            onChange={setdata1}
                            name="tlCount"
                          />
                        </div>
                        <div className="form-check ml-4">
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
                          <span className="ml-2">({multipleSelectTrainer?Object.values(multipleSelectTrainer)[0].length:"0"})</span>
                        </div>
                        <div className="col-md-1 mr-5">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            onChange={setdata1}
                            name="trainerCount"
                          />
                        </div>
                        <div className="form-check ml-4 ">
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
                          className=" mt-1"
                          htmlFor="exampleCheck1"
                        >
                          SAMPLE ALLOCATION TARGET BY SUPERVISOR GROUP
                        </label>
                        <div className="form-group col-sm-2 ml-5">
                          <select
                            name="getselectqa"
                            multiple
                            className="form-control form-control-sm"
                            onChange={handleMultipleSelectQa}
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {qaTlTrainerGet?qaTlTrainerGet.map((element)=>{
                              return <option key={element._id}>{element.qa}</option>
                            }):""}
                          </select>
                        </div>
                        <div className="form-group col-sm-2 ml-3">
                          <select
                            name="getselecttl"
                            multiple
                            onChange={handleMultipleSelectTl}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {qaTlTrainerGet?qaTlTrainerGet.map((element)=>{
                              return <option key={element._id +998521}>{element.tl}</option>
                            }):""}
                          </select>
                        </div>
                        <div className="form-group col-sm-2 ml-2">
                          <select
                            name="getselecttrainer"
                            multiple
                            onChange={handleMultipleSelectTrainer}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {qaTlTrainerGet?qaTlTrainerGet.map((element)=>{
                              return <option key={element._id + 73213}>{element.trainer}</option>
                            }):""}
                          </select>
                        </div>
                        <div className="ml-5">
                          <button

                            type="submit"
                            onClick={handleAllocation}
                            style={{
                              color: "white",
                              fontSize: "12.4px",
                              backgroundColor: "#474545",
                            }}
                            className="btn"
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
