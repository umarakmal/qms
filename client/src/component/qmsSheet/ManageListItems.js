import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import $ from 'jquery'
const ManageListItems = () => {
  const [listItems, setListItems] = useState("");
  const [fieldnam, setFieldNam] = useState("");
  const [selectData, setSelectData] = useState("");
  const [dynamicCollection, setDynamicCollectionData] = useState("");
  const [sheets, setSheets] = useState("");
  const [sheetData, setSheetsData] = useState("");

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

  const setdata = (e) => {
    const { name, value } = e.target;
    setListItems((listItems) => {
      return {
        ...listItems,
        [name]: value,
      };
    });
  };

  const setdata1 = (e) => {
    const { name, value } = e.target;
    setFieldNam((fieldnam) => {
      return {
        ...fieldnam,
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
    setDynamicCollectionData(e.target.value);
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
          setSelectData(data[0].any);
        }
      }
    };
    postdata();
  };

  //Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { fieldname, controltype, isnumeric, mandatory } = selectData;
    const { updateOption } = listItems;
    const { field } = fieldnam;
   
if(!updateOption || !field || !dynamicCollection){
  return false
}else{
    const res = await fetch(
      `/api/update-dynamiccollection-selected-options-test/${dynamicCollection}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          updateOption,
          field,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Error Occurred!");
    } else {
      toast.success("Submitted Successfully!");
      $("#sheet").val("")
    $("#updatetext").val("")
    $("dynColl").val("")
    setListItems("")
    setFieldNam("")
    }
    
  }
  };
  let id = [];
  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="form" noValidate
              className="needs-validation" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-dark mt-3">
                    <div className="card-header">
                      <h3 className="card-title">
                        Manage Sheet Items.{" "}
                        <span
                          style={{ fontSize: "12.4px", color: "red" }}
                          className="ml-5"
                        >
                          Please add the items only separated by ',' comma. Do
                          not Use space,enter or any other symbol.
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
                            id="sheet"
                            required
                          >
                            <option value="">--Select--</option>
                            {sheets
                              ? sheets.map((element) => {
                                  return (
                                    <option
                                      value={element.name}
                                      key={element._id}
                                    >
                                      {element.collectionname}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a Sheet.
                          </div>
                        </div>
                        <div className="form-group col-sm-4">
                          <label htmlFor="xyz">Fields Name:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="field"
                            onChange={setdata1}
                            id='dynColl'
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">--Select--</option>
                            {sheetData
                              ? sheetData.map((element) => {
                                  id.push(element._id);
                                  return element.any.map((el) => {
                                    if (el.controltype === "select") {
                                      return <option>{el.fieldname}</option>;
                                    } else {
                                      <option>NA</option>;
                                    }
                                  });
                                })
                              : ""}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a Field.
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
                            Items:
                          </label>
                          <span style={{ color: "red" }}>* separated by ,</span>
                          <textarea
                            type="text"
                            onChange={setdata}
                            style={{ fontSize: "12.4px" }}
                            name="updateOption"
                            id="updatetext"
                            className="form-control form-control-sm"
                            aria-describedby="emailHelp"
                            required
                          />
                          <div className="invalid-feedback">
                            Please input items.
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{ fontSize: "12.4px" }}
                        className="btn btn-primary mt-2"
                      >
                        Update
                      </button>
                      <hr></hr>
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

export default ManageListItems;
