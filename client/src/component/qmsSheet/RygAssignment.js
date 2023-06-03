import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import Menu from "../Menu";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const RygAssignment = () => {
  const [dataSource, setDataSource] = useState("");
  const [rygFind, setRygFind] = useState("");
  const [processes, setProcess] = useState("");
  const [prcss, setProcesses] = useState("")

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  const handleSelect = async (e) => {
    e.preventDefault();
    const process = e.target.value;
    var a = process.split('|')
    var cm_id = a[3]
    setProcess(e.target.value);
    const res = await fetch(`${url}/api/ryg-assignment-find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cm_id,
      }),
    });
    var data = await res.json();

    if (res.status === 200) {
      setRygFind(data);
    } else if (res.status === 500) {
      console.log("error");
    } else {
      console.log("error");
    }
  };

  const addFile = async (e) => {
    e.preventDefault();


    if (rygFind && Object.keys(rygFind)) {
      if (!processes) {
        return false;
      } else {
        var a = processes.split('|')
        var b = a[0]
        var c = a[1]
        var d = a[2]
        let r = b.concat("|", c);
        var cm_id = a[3]
        var process = r.concat("|", d);
        const { redfrom, redto, amberfrom, amberto, greenfrom, greento } =
          dataSource;
        const res = await fetch(`${url}/api/ryg-assignment-update/${rygFind._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            redfrom,
            cm_id,
            redto,
            amberfrom,
            amberto,
            greenfrom,
            greento,
            process,
          }),
        });
        var data = await res.json();
        if (res.status === 200) {
          toast.success("Updated Sucessfully");
          setDataSource({
            redfrom: "",
            redto: "",
            greenfrom: "",
            greento: "",
            amberfrom: "",
            amberto: ""
          })
          setProcess("")
        } else if (res.status === 500) {
          toast.error("Error Occured");
        } else {
          toast.error("Error Occured");
        }
      }
    } else {
      if (!processes) {
        return false;
      } else {
        const { redfrom, redto, amberfrom, amberto, greenfrom, greento } =
          dataSource;
        if (!redfrom || !redto || !amberfrom || !amberto || !greenfrom || !greento) {
          return false
        } else {
          var a = processes.split('|')
          var b = a[0]
          var c = a[1]
          var d = a[2]
          let r = b.concat("|", c);
          var cm_id = a[3]
          var process = r.concat("|", d);
          const res = await fetch(`${url}/api/ryg-assignment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              redfrom,
              redto,
              amberfrom,
              amberto,
              greenfrom,
              greento,
              cm_id,
              process,
            }),
          });
          var data = await res.json();
          if (res.status === 200) {
            toast.success("Added Sucessfully");
            setDataSource({
              redfrom: "",
              redto: "",
              greenfrom: "",
              greento: "",
              amberfrom: "",
              amberto: ""
            })
            setProcess("")
          } else if (res.status === 500) {
            toast.error("Error Occured");
          } else {
            toast.error("Error Occured");
          }
        }
      }
    }
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
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 mt-2">
                <div className="card card-info">
                  <div className="card-header">
                    <h6 style={{ fontSize: "1rem" }} className="col-md-5">
                      RYG Allocation
                    </h6>
                  </div>

                  <div className="card-body">
                    <form
                      id="form"
                      encType="multipart/form-data"
                      noValidate
                      className="needs-validation"
                      onSubmit={addFile}
                    >
                      <div className=" form-group row">
                        <div className="col-md-3">
                          <label
                            className="text-muted"
                            style={{ fontSize: "12.4px" }}
                          >
                            Process
                          </label>
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div id="process" className="col-md-3">
                          <select
                            name="process"
                            id="select1"
                            onChange={(e) => {
                              handleSelect(e);
                            }}
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
                      </div>
                      <hr></hr>
                      <div className="row ">
                        <div className="col-md-3">
                          <label
                            style={{ fontSize: "12px", marginTop: "35px" }}
                          >
                            RED BUCKET SCORE EVALUATION:
                          </label>
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>Red From</label>
                          <input
                            defaultValue={rygFind ? rygFind.redfrom : ""}
                            type="number"
                            name="redfrom"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>Red To</label>
                          <input
                            type="number"
                            defaultValue={rygFind ? rygFind.redto : ""}
                            name="redto"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-3">
                          <label
                            style={{ fontSize: "12px", marginTop: "35px" }}
                          >
                            AMBER BUCKET SCORE EVALUATION:
                          </label>
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>
                            Amber From
                          </label>
                          <input
                            type="number"
                            defaultValue={rygFind ? rygFind.amberfrom : ""}
                            name="amberfrom"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>Amber To</label>
                          <input
                            type="number"
                            defaultValue={rygFind ? rygFind.amberto : ""}
                            name="amberto"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-md-3 mb-4">
                          <label
                            style={{ fontSize: "12px", marginTop: "35px" }}
                          >
                            GREEN BUCKET SCORE EVALUATION:
                          </label>
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>
                            Green From
                          </label>
                          <input
                            type="number"
                            defaultValue={rygFind ? rygFind.greenfrom : ""}
                            onChange={setdata}
                            name="greenfrom"
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                        <div className="col-md-3">
                          <label style={{ fontSize: "11.5px" }}>Green To</label>
                          <input
                            type="number"
                            defaultValue={rygFind ? rygFind.greento : ""}
                            name="greento"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            required
                          />
                        </div>
                      </div>
                      <center>
                        <button type="submit" className="btn btn-info mt-2">Save</button>
                      </center>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RygAssignment;
