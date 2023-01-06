import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import Menu from "../Menu";
import $ from "jquery";
const RygAssignment = () => {
  const [dataSource, setDataSource] = useState("");
  const [rygFind, setRygFind] = useState("");
  const [process, setProcess] = useState("");

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
    setProcess(e.target.value);
    const res = await fetch(`/api/ryg-assignment-find`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        process,
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
      if (!process) {
        return false;
      } else {
        const { redfrom, redto, amberfrom, amberto, greenfrom, greento } =
          dataSource;
        const res = await fetch(`/api/ryg-assignment-update/${rygFind._id}`, {
          method: "PUT",
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
            process,
          }),
        });
        var data = await res.json();
        if (res.status === 200) {
          toast.success("Updated Sucessfully");
        } else if (res.status === 500) {
          toast.error("Error Occured");
        } else {
          toast.error("Error Occured");
        }
      }
    } else {
      if (!process) {
        return false;
      } else {
        const { redfrom, redto, amberfrom, amberto, greenfrom, greento } =
          dataSource;
if(!redfrom || !redto || !amberfrom || !amberto || !greenfrom || !greento){
  return false
}else{
        const res = await fetch(`/api/ryg-assignment`, {
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
            process,
          }),
        });
        var data = await res.json();
        if (res.status === 200) {
          toast.success("Added Sucessfully");
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
                <div className="card card-dark">
                  <div className="card-header">
                    <h6 style={{ fontSize: "13px" }} className="col-md-5">
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
                            <option>
                              Information Technology|Software
                              Development|Software Development
                            </option>
                            <option>rge</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row bg-info">
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
                      <div className="row bg-info">
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
                      <div className="row bg-info">
                        <div className="col-md-3 mb-4">
                          <label
                            style={{ fontSize: "12px", marginTop: "35px" }}
                          >
                            Green BUCKET SCORE EVALUATION:
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
                        <button type="submit" className="btn btn-primary mt-2">Save</button>
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
