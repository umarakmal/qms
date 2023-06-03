import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import '../../css/Responsive.css'
import { isAuth } from "../auth/helpers";
import { TagsInput } from "react-tag-input-component";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const ManageAttributes = () => {
  const [attributesss, setAttributes] = useState("");
  const [attri, setAttri] = useState("");
  const [datas, setData] = useState("");
  const [header, setHeader] = useState([])
  const [sheets, setSheets] = useState("");
  const [sheetData, setSheetsData] = useState("");
  const [x, setX] = useState("");
  const [para, setPara] = useState("");
  const [questions, setQuestions] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const setdata = (e) => {
    const { name, value } = e.target;
    setAttributes((attributesss) => {
      return {
        ...attributesss,
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


    const postdataQuestions = async () => {
      const getdynamiccollection = x
      const subparameter = e.target.value
      setQuestions(e.target.value)
      const res = await fetch(
        `${url}/api/attribute-get-subfield`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            para, getdynamiccollection, subparameter
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          // setAttri(data);
          setAttributes(String(data))
        }
      }
    };
    postdataQuestions();

  };

  const setdata11 = (e) => {
    const { name, value } = e.target;
    setHeader((header) => {
      return {
        ...header,
        [name]: value,
      };
    });
    setPara(e.target.value)
    const postdataHeader = async () => {
      const para = e.target.value
      const getdynamiccollection = x
      const res = await fetch(
        `${url}/api/get-attri-parasubpara`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            para, getdynamiccollection
          }),
        }
      );
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setHeader(data);
        }
      }
    };
    postdataHeader();
  };

  const getdata = async () => {
    const cm_id = await isAuth().cm_id
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
    setX(e.target.value);
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
        }
      }
    };
    postdata();
    $("#headers").val("")
    $("#questions").val("")
    setAttri("")
    setHeader("")
  };

  const handleReset = () => {
    setAttri("")
    setHeader("")
    setQuestions("")
    setX("")
    setAttributes("")
    setData("")
    Array.from(document.querySelectorAll("textarea")).forEach(
      input => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      input => (input.value = "")
    );
  }

  //Submit the form
  const handleSubmit1 = async (event) => {
    // const { attributess } = attributesss;
    const subparameter = questions
    const attributess = attributesss
    const errors = {};
    if (!x) {
      event.preventDefault();
      errors['process'] = `Sheet is required`;
      setFormErrors(errors);
      return false
    } else if (!header) {
      event.preventDefault();
      errors['para'] = `Header is required`;
      setFormErrors(errors);
      return false
    } else if (!questions) {
      event.preventDefault();
      errors['questions'] = `Question is required`;
      setFormErrors(errors);
      return false
    }
    else if (!attributesss) {
      event.preventDefault();
      errors['attributess'] = `Attribute is required`;
      setFormErrors(errors);
      return false;
    }
    event.preventDefault();
    const res = await fetch(
      `${url}/api/update-dynamiccollection-selected-options-test-attribute11/${x}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          attributess,
          subparameter,
          para,
        }),
      }
    );
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Error Occurred!");
    } else {
      handleReset()
      document.getElementById('form1').reset();
      setFormErrors({});
      toast.success("Submitted Successfully!");
    }
  };

  let id = [];

  const updateField = (element, value) => {
    let newFields = [...attributesss];
    if (element === 'attributess') {
      let attVal = []
      let attVal1 = []
      let strAttVal
      let strAttVal1
      attVal.push(value.join('|'))
      strAttVal = String(attVal)
      if (strAttVal.indexOf("|") === 0) {
        var attValFilter = value.filter(n => n)
        attVal1.push(attValFilter.join('|'))
        strAttVal1 = String(attVal1)
        newFields = strAttVal1
      } else {
        newFields = strAttVal
      }
    }
    setAttributes(newFields);
  };

  const checkSpecialCharForAttri = (e) => {
    if (e.key === "*" || e.key === "/" || e.key === "(" || e.key === ")" || e.key === "+" || e.key === "%" || e.key === ":" || e.key === ";" || e.key === ">" || e.key === "<" || e.key === "[" || e.key === "]" || e.key === "{" || e.key === "}" || e.key === "|" || e.key === "@" || e.key === "!" || e.key === "'" || e.key === "=" || e.key === "#" || e.key === "$" || e.key === "%" || e.key === "^" || e.key === "&" || e.key === "`" || e.key === "~" || e.key === `"`) {
      e.target.value = ""
    }
    if (e.target.value.includes("*") || e.target.value.includes("#") || e.target.value.includes("%") || e.target.value.includes("@") || e.target.value.includes("~") || e.target.value.includes("[") || e.target.value.includes("]") || e.target.value.includes("$") || e.target.value.includes("!") || e.target.value.includes("&") || e.target.value.includes("=") || e.target.value.includes(">") || e.target.value.includes("<") || e.target.value.includes(";") || e.target.value.includes(":") || e.target.value.includes(")") || e.target.value.includes("(") || e.target.value.includes("{") || e.target.value.includes("}") || e.target.value.includes("?") || e.target.value.includes("|") || e.target.value.includes("+") || e.target.value.includes("^") || e.target.value.includes(`"`) || e.target.value.includes("`")) {
      e.target.value = ""
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
            <form
              noValidate
              id="form1"
              className="needs-validation"
              onSubmit={handleSubmit1}
            >
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h5 style={{ fontSize: '1rem' }} className="card-title">
                        Manage Sheet Attributes{" "}
                        {/* <span
                          style={{ fontSize: "12.4px", color: "white" }}
                          className="ml-5"
                        >
                          Please add the Attributes separated by '|' pipe only.
                          Do not Use enter or any other symbol to separate
                        </span> */}
                      </h5>
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
                            required
                          >
                            <option value="">select</option>
                            {sheets
                              ? sheets.map((element) => {
                                var sheetname = element.collectionname.split('_')
                                var newSheetName = sheetname.slice(1);
                                return (
                                  <option value={element.collectionname} key={element._id}>
                                    {newSheetName.join('_')}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                          {formErrors.process && <span className="text-danger">{formErrors.process}</span>}
                        </div>

                        <div className="form-group col-sm-4">
                          <label htmlFor="xyz">Headers:</label>
                          <span style={{ color: "red" }}>*</span>
                          <select
                            name="para"
                            onChange={setdata11}
                            id="headers"
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">select</option>
                            {sheetData
                              ? sheetData.map((element) => {
                                return element.param.map((el) => {
                                  return <option>{el.parameter}</option>;
                                });
                              })
                              : ""}
                          </select>
                          {formErrors.para && <span className="text-danger">{formErrors.para}</span>}
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
                            <option value="">select</option>
                            {
                              header.length > 0 ? header.map(el => (
                                <option>{el}</option>
                              )) : null
                            }
                          </select>
                          {formErrors.questions && <span className=" text-danger">{formErrors.questions}</span>}
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
                          {/* <span style={{ color: "red" }}>* separated by |</span> */}
                          {/* <textarea
                            id="attributess"
                            type="text"
                            onChange={setdata}
                            defaultValue={attri ? attri : ""}
                            onKeyDown={(e)=>handleKeyDownAttri(e)}
                            onPaste={handlePaste}
                            style={{ fontSize: "12.4px" }}
                            name="attributess"
                            className="form-control form-control-sm"
                            aria-describedby="emailHelp"
                          /> */}
                          <TagsInput
                            onKeyUp={(e) => checkSpecialCharForAttri(e)}
                            value={attributesss.split('|') || []}
                            onChange={(tags) => updateField("attributess", tags)}
                            name="attributess"
                            placeHolder="Enter Attributes"
                          />
                          {formErrors.attributess && <span className=" text-danger">{formErrors.attributess}</span>}
                        </div>
                      </div>
                      <button
                        id="btn"
                        type="submit"
                        // onClick={handleSubmit1}
                        style={{ fontSize: "12.4px" }}
                        className="btn btn-info mt-2"
                      >
                        Update
                      </button>
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
