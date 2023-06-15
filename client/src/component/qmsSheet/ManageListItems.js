import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import $ from 'jquery'
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const ManageListItems = () => {
  const [listItems, setListItems] = useState("");
  const [fieldnam, setFieldNam] = useState("");
  const [selectData, setSelectData] = useState("");
  const [dynamicCollection, setDynamicCollectionData] = useState("");
  const [sheets, setSheets] = useState("");
  const [fieldVal, setFieldVal] = useState("")
  const [sheetData, setSheetsData] = useState("");
  const selVal = useRef("")
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

  const setdata1 = async (e) => {
    const { name, value } = e.target;
    setFieldNam((fieldnam) => {
      return {
        ...fieldnam,
        [name]: value,
      };
    });

    const field = e.target.value
    const getdynamiccollection = dynamicCollection
    const res = await fetch(
      `${url}/api/find-data-particular-field`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({
          getdynamiccollection, field
        }),
      }
    );
    const data2 = await res.json();
    if (res.status === 422 || !data2) {
      console.log("error ");
    } else {
      if (!data2) {
        console.log("No Data!");
      } else {
        if (data2.length > 0) {
          setFieldVal(data2);
        }
      }
    }
  };

  const getdata = async () => {
    const cm_id = isAuth().cm_id
    const res = await fetch(`${url}/api/get-dynamic-collection-names`, {
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
      setSheets(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const getCollectionData = (e) => {
    // e.preventDefault();
    e.persist()
    setDynamicCollectionData(e.target.value);
    const postdata = async () => {
      const res = await fetch(
        `${url}/api/getDynamicCollectionDataParam/${e.target.value}`,
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
    $("#dynColl").val("")
  };

  //Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { fieldname, controltype, isnumeric, mandatory } = selectData;
    // const { sel } = listItems;
    const { field } = fieldnam;
    var list = (selVal.current.value);
    if (!list || !field || !dynamicCollection) {
      return false
    } else {
      const res = await fetch(
        `${url}/api/update-dynamiccollection-selected-options-test/${dynamicCollection}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            list,
            field,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Error Occurred!");
      } else {
        toast.success("Submitted Successfully!");
        document.getElementById('form').reset();
        setListItems("")
        setFieldVal("")
        setFieldNam("")
      }

    }
  };
  let id = [];

  function handlePaste(event) {
    const pasteData = event.clipboardData.getData('text/plain');
    const regex = /^[a-zA-Z0-9\s_]*$/; // only allow alphanumeric characters

    if (!regex.test(pasteData)) {
      event.preventDefault();
      // show an error message or take other actions as needed
    }
  }

  const handleKeyDownList = (e) => {
    if (e.key === "  " || e.key === "*" || e.key === "/" || e.key === "(" || e.key === ")" || e.key === "+" || e.key === "%" || e.key === ":" || e.key === ";" || e.key === ">" || e.key === "<" || e.key === "[" || e.key === "]" || e.key === "{" || e.key === "}" || e.key === "@" || e.key === "!" || e.key === "'" || e.key === "=" || e.key === "#" || e.key === "$" || e.key === "%" || e.key === "^" || e.key === "&" || e.key === "`" || e.key === "~" || e.key === `"` || e.key === `-` || e.key === `?` || e.key === `|`) {
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
            <form id="form" noValidate
              className="needs-validation" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: '1rem' }} className="card-title">
                        Manage Sheet Items.{" "}
                        <span
                          style={{ fontSize: "12.4px", color: "white" }}
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
                          <label htmlFor="xyz">sheet:</label>
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
                                var sheetname = element.collectionname.split('_')
                                var newSheetName = sheetname.slice(1);
                                return (
                                  <option
                                    value={element.collectionname}
                                    key={element._id}
                                  >
                                    {newSheetName.join('_')}
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
                            ref={selVal}
                            defaultValue={fieldVal || ""}
                            style={{ fontSize: "12.4px" }}
                            name="sel"
                            onKeyDown={(e) => handleKeyDownList(e)}
                            onPaste={handlePaste}
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
                        className="btn btn-info mt-2"
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
