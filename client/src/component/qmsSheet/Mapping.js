import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const Mapping = () => {
  const [dataSource, setDataSource] = useState("");
  const [assigningMappedData, setassigningMappedData] = useState("");
  const [collectionNameMap, setCollectionNameMap] = useState("");
  const [mappedData, setMappedData] = useState("");
  const [mappedDataCount, setMappedDataCount] = useState("");
  const [prcss, setProcesses] = useState("")


  const navigate = useNavigate()

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


  const HandleSubmit = (e) => {
    e.preventDefault();
    const { process, local, foreign } = dataSource;
    if (!process || !local || !foreign) {
      return false
    } else {
      const getdata = async () => {
        const y = process.split("|");
        const cmid = y[3]
        var x = "cdr_tagging_dump_" + cmid
        var collectionname = x.toLowerCase();

        setCollectionNameMap(collectionname);
        var z = "cdrdump_" + cmid
        var to = z.toLowerCase()
        var m = "tagdump_" + cmid
        var from = m.toLowerCase()

        const res = await fetch(`${url}/api/mapping-cdr-and-tagging-join`, {
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
            cmid
          }),
        });

        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {

          if (data.length > 0) {
            const pageSize = 10;
            const page = 1;
            const pageData = data.slice((page * pageSize) - pageSize, page * pageSize);
            setMappedData(pageData);
            setMappedDataCount(data.length);
          }
        }
      };
      getdata();


    }
  };

  //Mapped assigning data
  const HandleSave = async (e) => {
    e.preventDefault();
    const collectionname = collectionNameMap;

    const { acht, agentid, calltype, callid, mobileno } = assigningMappedData;
    if (!acht || !agentid || !calltype || !callid || !mobileno) {
      $("#acht").css('border', '1px red solid')
      $("#callid").css('border', '1px red solid')
      $("#mobileno").css('border', '1px red solid')
      $("#calltype").css('border', '1px red solid')
      $("#agentid").css('border', '1px red solid')
      return false
    } else {
      $("#acht").css('border', '1px green solid')
      $("#callid").css('border', '1px green solid')
      $("#mobileno").css('border', '1px green solid')
      $("#calltype").css('border', '1px green solid')
      $("#agentid").css('border', '1px green solid')
      const { process } = dataSource
      var a = process.split('|')
      var cmid = a[3]
      const res2 = await fetch(`${url}/api/create-mapped-assigning-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cmid,
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
          navigate('/random/sample-upload', { state: "Successfull!" })
        } else {
          toast.error("Some error occured");
        }
      }
    }
  };

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
          } else {

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
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <NavLink
                to="/random/sample-upload"
                className="btn btn-info ml-2"
              >
                <i
                  style={{ marginRight: "5px", fontSize: '11px' }}
                  className="nav-icon fas fa-arrow-left"
                />
                Back to sample upload
              </NavLink>
              <div className="col-md-12 mt-2">
                <div className="card card-info">
                  <div className="card-header">
                    <h6 style={{ fontSize: "12px" }} className="col-md-5">
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
                          {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {

                            return <option value={element.Process + '|' + element.cm_id} key={element.cm_id}>{element.Process}</option>
                          }) : null : null}
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
                            className="btn btn-info"
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

                      <table className="table mb-2 table-responsive">
                        <thead
                          style={{
                            fontSize: "12.4px",
                          }}
                          className="thead-light"
                        >
                          <tr
                            className="table"
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

                        <tbody style={{ fontSize: "12px" }}>
                          {mappedData ? mappedData.map((element, id) => {

                            return (
                              <>
                                <tr style={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden', textOverflow: 'ellipsis'
                                }} key={element._id}>
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
                                  <td>{element.K}</td>
                                  <td>{element.L}</td>
                                  <td>{element.M}</td>
                                  <td>{element.N}</td>
                                  <td>{element.O}</td>
                                  <td>{element.P}</td>
                                  <td>{element.Q}</td>
                                  <td>{element.R}</td>
                                  <td>{element.S}</td>
                                  <td>{element.T}</td>
                                  {/* <td>{element.role}</td> */}
                                </tr>
                              </>
                            );
                          }) : null}
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
                              style={{ fontSize: "12.4px" }}
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
                            className="btn btn-info"
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
