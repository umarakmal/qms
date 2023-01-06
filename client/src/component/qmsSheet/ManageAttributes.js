import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
const ManageAttributes = () => {
  const [attributess, setAttributes] = useState("");
  const [attri, setAttri] = useState();
  const [datas, setData] = useState("");
  const [sheets, setSheets] = useState("");
  const [sheetData, setSheetsData] = useState("");
  const [x, setX] = useState("");
  
  const setdata = (e) => {
    const { name, value } = e.target;
    setAttributes((attributes) => {
      return {
        ...attributes,
        [name]: value,
      };
    });
  };

  const setdata1 = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };

  const getdata = async () => {
    const res = await fetch("/api/get-dynamic-collection-names", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setSheets(data);
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  const getCollectionData = (e) => {
    // e.preventDefault();
    setX(e.target.value);
    const postdata = async () => {
      const res = await fetch(
        `/api/getDynamicCollectionDataParam/${e.target.value}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setSheetsData(data);
        }
      }
    };
    postdata();
  };

  //Submit the form
  const handleSubmit1 = async (event) => {
    const form = event.currentTarget;
    const { attribute } = attributess;
    const { para } = datas;
    if (!process || !attributess || !datas) {
      event.preventDefault();
      return false;
    }
    event.preventDefault();

    const res = await fetch(
      `/api/update-dynamiccollection-selected-options-test-attribute/${x}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          attribute,
          para,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Error Occurred!");
    } else {
      toast.success("Submitted Successfully!");
    }
  };
  let attributesShow = [];
  let id = [];

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
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form
              noValidate
              className="needs-validation"
              onSubmit={handleSubmit1}
            >
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-dark mt-3">
                    <div className="card-header">
                      <h3 className="card-title">
                        Manage Sheet Attributes{" "}
                        <span
                          style={{ fontSize: "12.4px", color: "red" }}
                          className="ml-5"
                        >
                          Please add the Attributes separated by '|' pipe only.
                          Do not Use enter or any other symbol to separate
                        </span>
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div id="process" className=" form-group col-sm-4">
                          <label htmlFor="xyz">sheet</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="process"
                            onChange={(e) => getCollectionData(e)}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">select</option>
                            {sheets
                              ? sheets.map((element) => {
                                  return (
                                    <option value={element.name}>
                                      {element.collectionname}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>

                        <div className="form-group col-sm-4">
                          <label htmlFor="xyz">Headers:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="para"
                            onChange={setdata1}
                            id="headers"
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value=""></option>
                            {sheetData
                              ? sheetData.map((element) => {
                                  return element.param.map((el) => {
                                    $(function () {
                                      $("#headers").on("change", function () {
                                        if ($(this).val() === el.parameter) {
                                        setTimeout(()=>{
                                          setAttri(el.attributes);
                                        },3000)  
                                        }
                                      });
                                    });
                                    return <option>{el.parameter}</option>;
                                  });
                                })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a header.
                          </div>
                        </div>
                        <div className="form-group col-sm-4">
                          <label htmlFor="xyz">Questions:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="questions"
                            onChange={setdata1}
                            id="questions"
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value=""></option>
                            {sheetData
                              ? sheetData.map((element) => {
                                  id.push(element._id);
                                  return element.param.map((el) => {
                                    attributesShow.push(el.attributes);
                                    return <option>{el.subparameter}</option>;
                                  });
                                })
                              : ""}
                          </select>
                          <div class="invalid-feedback">
                            Please choose a question.
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "12.4px",
                          }}
                          className="form-group col-sm-12"
                        >
                          <label
                            style={{ fontSize: "12.4px" }}
                            htmlFor="exampleInputEmail"
                          >
                            Attributes:
                          </label>
                          <span style={{ color: "red" }}>* separated by |</span>

                          <textarea
                            id="attributes"
                            type="text"
                            onChange={setdata}
                            defaultValue={attri ? attri : ""}
                            style={{ fontSize: "12.4px" }}
                            name="attribute"
                            className="form-control form-control-sm"
                            aria-describedby="emailHelp"
                            required
                          />
                          <div class="invalid-feedback">
                            Please input attributes.
                          </div>
                        </div>
                      </div>
                      <button
                        id="btn"
                        type="submit"
                        // onClick={handleSubmit1}
                        style={{ fontSize: "12.4px" }}
                        className="btn btn-primary mt-2"
                      >
                        Update
                      </button>
                      <hr></hr>
                      <p>
                        Note: Add Attributes like below, don't use Enter or
                        Space to separate Attributes, also No need to add 'NA'
                        as 'NA' is already added by the system.
                        Attribute1|Attribute2|Attribute3|Attribute4|Attribute5|Attribute6
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <br></br>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ManageAttributes;
