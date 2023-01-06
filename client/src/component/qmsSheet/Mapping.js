import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
const Mapping = () => {
  const [dataSource, setDataSource] = useState("");
  const [assigningMappedData, setassigningMappedData] = useState("");
  const [collectionNameMap, setCollectionNameMap] = useState("");
  const [mappedData, setMappedData] = useState("");
  const [mappedDataCount, setMappedDataCount] = useState("");
  const p = useParams()
  var v= (p.id2+"s");
  var t = v.slice(7)
  var xyz = ("cdr_tagging_dump_" + t.replace(/ /g, "")).toLowerCase()

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  const setdata2 = (e) => {
    const { name, value } = e.target;
    setassigningMappedData((assigningMappedData) => {
      return {
        ...assigningMappedData,
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

  const id = useParams("");

  const getDataJoin = async (e) => {
    const collectionname = xyz;
    const res = await fetch("/api/find-data-join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionname,
      }),
    });
    {
      const data = await res.json();
      setMappedData(data);
    }
  };

  const getDataJoinCount = async (e) => {
    const collectionname = xyz;
    const res = await fetch("/api/find-data-join-count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionname,
      }),
    });
    {
      const data = await res.json();
      setMappedDataCount(data);
    }
  };


  const HandleSubmit = (e) => {
    e.preventDefault();
    const { process,local , foreign} = dataSource;
    if(!process || !local || !foreign){
      return false
    }else{
    const getdata = async () => {
      const y = process.split("|");
      const c = y[0] + y[1];
      var x = "cdr_tagging_dump_" + c.replace(/ /g, "") + 's';
      var collectionname = x.toLowerCase();
      setCollectionNameMap(collectionname);
      var z = "cdrdump" + c.replace(/ /g,"")
      var to = z.toLowerCase()
      var m = "tagdump" + c.replace(/ /g,"") + "s"
      var from = m.toLowerCase()
      const res = await fetch("/api/mapping-cdr-and-tagging-join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          local,
          foreign,
          collectionname,
        }),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        console.log("Success");
      }
    };
    getdata();
    getDataJoin()
    getDataJoinCount()
  }
  };

//  useEffect(() => {
//  setTimeout(()=>{
//     getDataJoin()
//     getDataJoinCount()
//     // xyz()
//     },3000)
//  }, []);

//  const xyz = () => {
//   $("#mapbtn").trigger("click", function () {});
// };

  //Mapped assigning data
  const HandleSave = async (e) => {
    e.preventDefault();
    const collectionname = collectionNameMap;
    const { acht, agentid, calltype, callid, mobileno } = assigningMappedData;
    if(!acht || !agentid || !calltype || !callid || !mobileno){
      $("#acht").css( 'border','1px red solid')
      $("#callid").css( 'border','1px red solid')
      $("#mobileno").css( 'border','1px red solid')
      $("#calltype").css( 'border','1px red solid')
      $("#agentid").css( 'border','1px red solid')
      return false
    }else{
      $("#acht").css( 'border','1px green solid')
      $("#callid").css( 'border','1px green solid')
      $("#mobileno").css( 'border','1px green solid')
      $("#calltype").css( 'border','1px green solid')
      $("#agentid").css( 'border','1px green solid')
    const res2 = await fetch("/api/create-mapped-assigning-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionname,
        acht,
        agentid,
        calltype,
        callid,
        mobileno,
      }),
    });
    {
      const data = await res2.json();
      if (res2.status === 200) {
        toast.success("Assigned Successfully");
      } else {
        toast.error("Some error occured");
      }
    }
  }
  };

  

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <NavLink
          style={{
            color: "#2980b9",
            fontWeight: "bolder",
          }}
          to="/sample-upload"
          className="btn btn"
        >
          <i
            style={{ marginRight: "5px" }}
            className="nav-icon fas fa-arrow-left"
          />
          Back to sample upload
        </NavLink>
              <div className="col-md-12 mt-2">
                <div className="card card-info">
                  <div className="card-header">
                    <h6 style={{ fontSize: "13px" }} className="col-md-5">
                      Data Mapping Section:
                    </h6>
                  </div>
                  <div className="card-body">
                    <form
                      noValidate
                      className="needs-validation"
                      onSubmit={HandleSubmit}
                    >
                      <div id="process" className=" form-group col-sm-5">
                        <label style={{ fontSize: "11px" }}>Process</label>
                        <span style={{ color: "red" }}>*</span>
                        <select
                          name="process"
                          onChange={setdata}
                          className="form-control form-control-sm"
                          style={{ fontSize: "12.4px" }}
                          required
                        >
                          <option value="">--Select--</option>
                          <option>
                            Information Technology|Software Development|Software
                            Development
                          </option>
                          <option>Abc|Xyz|123</option>
                        </select>
                        <div className="invalid-feedback">
                          Please choose a process.
                        </div>
                      </div>
                      <div className="card card-info">
                        <div className="card-header row">
                          <h6 style={{ fontSize: "13px" }} className="col-md-5">
                            Select Common Criteria to be mapped:
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className=" form-group col-sm-3">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            CDR Criteria
                          </label>
                          <select
                            name="local"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                            <option>G</option>
                            <option>H</option>
                            <option>I</option>
                            <option>J</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a CDR Criteria.
                          </div>
                        </div>
                        <div className=" form-group col-sm-3">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Tagging Criteria
                          </label>
                          <select
                            name="foreign"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                            <option>G</option>
                            <option>H</option>
                            <option>I</option>
                            <option>J</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a Tagging Criteria.
                          </div>
                        </div>
                        <div
                          style={{ marginTop: "30px" }}
                          className="col-sm-4 "
                        >
                          <button
                            style={{ fontSize: "11px" }}
                            type="submit"
                            className="btn btn-primary"
                            id="mapbtn"
                            // onClick={HandleSubmit}
                          >
                            MAP
                          </button>
                        </div>
                      </div>
                      <p className="text-muted offset-9">
                        Total entries mapped:{" "}
                        <span id="totdata" className="text-danger">
                          {mappedDataCount ? mappedDataCount : null}
                        </span>
                      </p>

                      <table className="table mb-5 table-responsive">
                        <thead
                          style={{
                            fontSize: "12.4px",
                          }}
                          className="thead-light"
                        >
                          <tr
                            style={{ color: "black" }}
                            className="table table-dark"
                          ><th scope="col">#</th>
                            <th scope="col">A</th>
                            <th scope="col">B</th>
                            <th scope="col">C</th>
                            <th scope="col">D</th>
                            <th scope="col">E</th>
                            <th scope="col">F</th>
                            <th scope="col">G</th>
                            <th scope="col">H</th>
                            <th scope="col">I</th>
                            <th scope="col">J</th>
                            <th scope="col">K</th>
                            <th scope="col">L</th>
                            <th scope="col">M</th>
                            <th scope="col">N</th>
                            <th scope="col">O</th>
                            <th scope="col">P</th>
                            <th scope="col">Q</th>
                            <th scope="col">R</th>
                            <th scope="col">S</th>
                            <th scope="col">T</th>
                          </tr>
                        </thead>

                        <tbody style={{ fontSize: "12.4px" }}>
                        {mappedData?mappedData.map((element, id) => {
                          
                  return (
                    <>
                      <tr key={element._id}>
                        <th scope="row">{id + 1}</th>
                        <td>{element.A}</td>
                        <td>{element.B}</td>
                        <td>{element.C}</td>
                         <td>{element.D}</td>
                        <td>{element.E}</td>
                        <td>{element.F}</td>
                         <td>{element.G}</td>
                        <td>{element.H}</td>
                        <td>{element.I}</td>
                         <td>{element.J}</td>
                        <td>{element.new[0]?element.new[0].A:null}</td>
                        <td>{element.new[0]?element.new[0].B:null}</td>
                        <td>{element.new[0]?element.new[0].C:null}</td>
                        <td>{element.new[0]?element.new[0].D:null}</td>
                        <td>{element.new[0]?element.new[0].E:null}</td>
                        <td>{element.new[0]?element.new[0].F:null}</td>
                        <td>{element.new[0]?element.new[0].G:null}</td>
                        <td>{element.new[0]?element.new[0].H:null}</td>
                        <td>{element.new[0]?element.new[0].I:null}</td>
                        <td>{element.new[0]?element.new[0].J:null}</td>
                        {/* <td>{element.role}</td> */}
                      </tr>
                    </>
                  );
                }):null}
                        </tbody>
                      </table>
                    </form>
                    <form id="form1">
                      <div className="card card-info mt-lg-5">
                        <div className="card-header row">
                          <h6 style={{ fontSize: "13px" }} className="col-md-5">
                            Assign criteria from mapped preview.
                          </h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="row form-group">
                          <div className="col-md-3">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              ACHT
                            </label>
                          </div>
                          <div className="col-md-7">
                            <select
                              name="acht"
                              onChange={setdata2}
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px"}}
                              id="acht"
                              required
                            >
                              <option value="">--Select--</option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                              <option>G</option>
                              <option>H</option>
                              <option>I</option>
                              <option>J</option>
                              <option>K</option>
                              <option>L</option>
                              <option>M</option>
                              <option>N</option>
                              <option>O</option>
                              <option>P</option>
                              <option>Q</option>
                              <option>R</option>
                              <option>S</option>
                              <option>T</option>
                            </select>
                          
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-4">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              calltype
                            </label>
                          </div>
                          <div className="col-md-7">
                            <select
                              name="calltype"
                              onChange={setdata2}
                              id="calltype"
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              required
                            >
                              <option value="">--Select--</option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                              <option>G</option>
                              <option>H</option>
                              <option>I</option>
                              <option>J</option>
                              <option>K</option>
                              <option>L</option>
                              <option>M</option>
                              <option>N</option>
                              <option>O</option>
                              <option>P</option>
                              <option>Q</option>
                              <option>R</option>
                              <option>S</option>
                              <option>T</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-4">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Agent Id
                            </label>
                          </div>
                          <div className="col-md-7">
                            <select
                              name="agentid"
                              onChange={setdata2}
                              id="agentid"
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              required
                            >
                              <option value="">--Select--</option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                              <option>G</option>
                              <option>H</option>
                              <option>I</option>
                              <option>J</option>
                              <option>K</option>
                              <option>L</option>
                              <option>M</option>
                              <option>N</option>
                              <option>O</option>
                              <option>P</option>
                              <option>Q</option>
                              <option>R</option>
                              <option>S</option>
                              <option>T</option>
                            </select>
                          </div>
                        </div>
                        <div className=" form-group row">
                          <div className="col-md-4">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Call id
                            </label>
                          </div>
                          <div className="col-md-7">
                            <select
                              name="callid"
                              onChange={setdata2}
                              id="callid"
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              required
                            >
                              <option value="">--Select--</option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                              <option>G</option>
                              <option>H</option>
                              <option>I</option>
                              <option>J</option>
                              <option>K</option>
                              <option>L</option>
                              <option>M</option>
                              <option>N</option>
                              <option>O</option>
                              <option>P</option>
                              <option>Q</option>
                              <option>R</option>
                              <option>S</option>
                              <option>T</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-7">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Customer contact(Mobile#/Email/Chat ID)
                            </label>
                          </div>
                          <div className="col-md-3">
                            <select
                              name="mobileno"
                              onChange={setdata2}
                              id="mobileno"
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              required
                            >
                              <option value="">--Select--</option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                              <option>G</option>
                              <option>H</option>
                              <option>I</option>
                              <option>J</option>
                              <option>K</option>
                              <option>L</option>
                              <option>M</option>
                              <option>N</option>
                              <option>O</option>
                              <option>P</option>
                              <option>Q</option>
                              <option>R</option>
                              <option>S</option>
                              <option>T</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <button
                            style={{ fontSize: "11px" }}
                            className="btn btn-primary"
                            onClick={HandleSave}
                          >
                            SAVE
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Mapping;
