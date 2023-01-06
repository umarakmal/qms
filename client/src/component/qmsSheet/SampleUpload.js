import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer, toast } from "react-toastify";
import Menu from "../Menu";
import $ from "jquery";
const SampleUpload = () => {
  const [file, setFile] = useState("");
  const [tagFile, setTagFile] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [nameCollection, setCollectionName] = useState("");
  const [totalCountCdr, setTotalCountCdr] = useState("");
  const [totalCountTagging, setTotalCountTagging] = useState("");
  const [totalCountCdrStatus, setTotalCountCdrStatus] = useState("");
  const [totalCountTaggingStatus, setTotalCountTaggingStatus] = useState("");
  const [taggData, setTaggData] = useState("");
  const [cdrrData, setCdrrData] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileTagging = (e) => {
    setTagFile(e.target.files[0]);
  };

  const setdata = (e) => {
    const { name, value } = e.target;
    setCollectionName((nameCollection) => {
      return {
        ...nameCollection,
        [name]: value,
      };
    });
  };

  //For Validation
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.process) {
      errors.process = "process is required!";
      $("#select1").addClass("is-invalid");
    } else if (values.process) {
      $("#select1").removeClass("is-invalid");
    }
    return errors;
  };

  //Upload File
  const addFile = async (e) => {
    e.preventDefault();
    setFormErrors(validate(nameCollection));
    setIsSubmit(true);
    const { process } = nameCollection;

    if (!process || !tagFile || !file) {
      return false;
    } else {
      var z = process.split("|");
      var c = z[0] + z[2];
      var y = "cdrdump" + c.replace(/ /g, "");
      //Cdr upload
      setCdrrData(y);
      var formData = new FormData();
      formData.append("csv_cdr", file);
      formData.append("dynamicCollection", y);

      const res = await fetch(`/api/upload-sheet-data`, {
        method: "POST",
        body: formData,
      });

      formData = await res.json();

      if (formData.chk == "0") {
        toast.success("Uploaded Sucessfully");
        setTotalCountCdr(formData.totalCountCdr);
        setTotalCountCdrStatus("Success");
      } else if (formData.chk == "1") {
        toast.error(formData.error);
        setTotalCountCdrStatus(formData.error);
      } else if (formData.chk == "2") {
        toast.error("Only CSV files are allowed!");
      }
    }
    //Tagging data upload
    var tagData = "tagdump" + c.replace(/ /g, "");
    setTaggData(tagData);
    var formData1 = new FormData();
    formData1.append("csv_tagging", tagFile);
    formData1.append("dynamicCollection", tagData);
    const resTag = await fetch(`/api/upload-sheet-data-tagging`, {
      method: "POST",
      body: formData1,
    });

    formData1 = await resTag.json();
    if (formData1.chk == "0") {
      toast.success("Uploaded Sucessfully");
      setTotalCountTagging(formData1.totalCount);
      setTotalCountTaggingStatus("Success");
    } else if (formData1.chk == "1") {
      toast.error(formData1.error);
      setTotalCountTaggingStatus(formData1.error);
    } else if (formData1.chk == "2") {
      toast.error("Only CSV files are allowed!");
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
  if(!taggData || !cdrrData){
    $("#btnMap").attr('disabled', false)
  }else{
    $("#btnMap").attr('disabled', false)
  }

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
                  <div className="card-header row">
                    <h6 style={{ fontSize: "13px" }} className="col-md-5">
                      CDR and Tagging data upload section
                    </h6>
                    <span
                      style={{ fontSize: "12px" }}
                      className="col-md-7 text-danger font-weight-bold"
                    >
                      Data in raw data files must be in 'dd-mm-YYYY' format for
                      e.g. 17-04-2021 10:12:50
                    </span>
                  </div>

                  <div className="card-body">
                    <form
                      id="form"
                      noValidate
                      className="needs-validation"
                      encType="multipart/form-data"
                      onSubmit={addFile}
                    >
                      
                      <div className=" form-group row">
                        <div className="col-md-6">
                          <label
                            className="text-muted"
                            htmlFor="validationCustom01"
                            style={{ fontSize: "12.4px" }}
                          >
                            Process
                          </label>
                          <span style={{ color: "red" }}>*</span>
                        </div>
                        <div id="process" className="col-md-3">
                          <select
                            name="process"
                            id="validationCustom01"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--select--</option>
                            <option>
                              Information Technology|Software
                              Development|Software Development
                            </option>
                            <option>Abc|Xyz|123</option>
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <label
                            style={{ fontSize: "12.4px" }}
                            className=" text-muted"
                          >
                            Upload CDR Data
                          </label>
                        </div>
                        <div className="col">
                          <input
                            filename="csv_cdr"
                            onChange={handleFile}
                            style={{ fontSize: "12.5px" }}
                            className="form-control-file"
                            type="file"
                            required
                          />

                          <div className="invalid-feedback">
                            Please choose a CSV file.
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col">
                          <label
                            style={{ fontSize: "12.4px" }}
                            className=" text-muted"
                          >
                            Upload Tagging Data
                          </label>
                        </div>
                        <div className="col">
                          <input
                            filename="csv_tagging"
                            onChange={handleFileTagging}
                            style={{ fontSize: "12.5px" }}
                            className="form-control-file"
                            type="file"
                            required
                          />
                          <div className="invalid-feedback">
                            Please choose a CSV file.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label
                            style={{ fontSize: "12.4px" }}
                            className=" text-muted"
                          ></label>
                        </div>
                        <div className="col">
                          <button
                            style={{
                              marginTop: "15px",
                              fontSize: "12.5px",
                              marginRight: "10px ",
                            }}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row mt-4">
                        <p
                          style={{ fontSize: "11.5px", fontWeight: "bold" }}
                          className="col-md-6"
                        >
                          CDR data file upload status :
                          <span style={{ color: "green" }}>
                            {" "}
                            {totalCountCdrStatus}{" "}
                          </span>
                        </p>

                        <p
                          style={{ fontSize: "11.5px", fontWeight: "bold" }}
                          className="col-md-6"
                        >
                          Total enteries uploaded :{" "}
                          <span style={{ color: "green" }}>
                            {totalCountCdr}
                          </span>{" "}
                        </p>
                        <hr></hr>
                        <p
                          style={{ fontSize: "11.5px", fontWeight: "bold" }}
                          className="col-md-6"
                        >
                          Tagging Data file upload status :{" "}
                          <span style={{ color: "green" }}>
                            {" "}
                            {totalCountTaggingStatus}{" "}
                          </span>
                        </p>
                        <p
                          style={{ fontSize: "11.5px", fontWeight: "bold" }}
                          className="col-md-6"
                        >
                          Total enteries uploaded :{" "}
                          <span style={{ color: "green" }}>
                            {" "}
                            {totalCountTagging}{" "}
                          </span>
                        </p>
                      </div>
                    </form>
                   
                    <NavLink to={`/mapping/${taggData}/${cdrrData}`}>
                      <button
                        style={{ fontSize: "12px" }}
                        className="btn btn-primary"
                        id="btnMap"
                        disabled
                      >
                        MAP COLUMNS
                      </button>
                    </NavLink>
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

export default SampleUpload;
