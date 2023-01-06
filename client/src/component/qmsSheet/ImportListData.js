import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
const ImportListData = () => {
  const [sheets, setSheets] = useState("");
  const [sheetData, setSheetData] = useState("");
  const [listData, setListData] = useState([]);
  const [listData2, setListData2] = useState([]);
  const [sheetListId, setSheetListId] = useState("")
  const [dynamicCollection, setDynamicCollectionData] = useState("");
  const [dynamicCollection2, setDynamicCollectionData2] = useState("");

  const [duallist, setDualList] = useState({});
  let { selected } = duallist;
  var m = [];
  m.push(selected);

  const onChanges = (selected) => {
    setDualList({ selected });
  };

  const opt = listData
    ? listData.map((element) => ({
        label: element.fieldname,
        value: element.fieldname,
      }))
    : "";
  let sel = [];

  const p = listData
    ? listData.map((element) => {
        listData2.map((el) => {
          m.map((i) => {
            i.map((x) => {
              if (
                // element.fieldname === el.fieldname &&
                element.fieldname === x &&
                el.fieldname === x
              ) {
                sel.push(element.sel);
              } else {
                
              }
            });
          });
        });
      })
    : "";

//Validation
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
          setSheetData(data);
          // setListData(data[0].any);
          data.map((element) => {
            return element.any.map((el) => {
              if (el.controltype === "select") {
                // setListData(el.fieldname);
                setListData(element.any);
              } else {
                setListData([]);
              }
            });
          });
        }
      }
    };
    postdata();
  };

  const getCollectionData1 = (e, id) => {
    // e.preventDefault();
    setDynamicCollectionData2(e.target.value);
    const postdata1 = async () => {
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
          setSheetData(data);
          setSheetListId(data[0]._id)
          // setListData(data[0].any);
          data.map((element) => {
            return element.any.map((el) => {
              if (el.controltype === "select") {
                // setListData(el.fieldname);
                setListData2(element.any);
              } else {
                setListData2([]);
              }
            });
          });
        }
      }
    };
    postdata1();
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    sel = String(sel);
    selected = String(selected);
    const id = sheetListId
    
   if(!id  || !dynamicCollection2 || !selected){
      return false
    }else {
      if(!sel){
        toast.error("Fieldname is different!")
       }else { 
      const postdata1 = async () => {
        const res = await fetch(`/api/update-dynamiccollection-list-import`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            sel,
            selected,
            dynamicCollection2,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            toast.error("No Data!");
          } else if(res.status === 200){
            toast.success("Added Successfully!")
          }else{
            toast.error("Fieldname is not matched")
          }
        }
      };
      postdata1();
    }
  }
  };


if(duallist.selected != null){
  $("#dynCollection2").attr('disabled', false)
}else{
  $("#dynCollection2").attr('disabled', true)
}
  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form  noValidate
              className="needs-validation" onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-dark mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Import Sheet Items</h3>
                    </div>
                    <div className="card-body">
                      <div style={{ border: "solid #c9c9c9 1px" }}>
                        <div className="row m-2 ml-3">
                          <div className="form-group col-sm-4 mr-2">
                            <label style={{ fontSize: "11px" }} htmlFor="xyz">
                              Old Sheet:
                            </label>
                            <select
                              name="getdynamiccollection"
                              onChange={(e) => getCollectionData(e)}
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              id="selectsheet"
                              required
                            >
                              <option value="">Select</option>
                              {sheets
                                ? sheets.map((element) => {
                                    return (
                                      <option
                                        value={element.collectionname}
                                        key={element._id + "jhyu"}
                                      >
                                        {element.collectionname}
                                      </option>
                                    );
                                  })
                                : ""}
                            </select>
                            <div className="invalid-feedback">
                            Please choose a sheet.
                          </div>
                          </div>
                          <div className="form-group col-sm-4 ml-5">
                            <label style={{ fontSize: "11px" }}>
                              New Sheet:
                            </label>
                            <select
                              name="getdynamiccollection1"
                              onChange={(e) => getCollectionData1(e)}
                              className="form-control form-control-sm"
                              style={{ fontSize: "12.4px" }}
                              required
                              id="dynCollection2"
                        
                            >
                              <option value="">Select</option>
                              {sheets
                                ? sheets.map((element) => {
                                if($("#selectsheet").val()!=element.collectionname){
                                  return (
                                    <option
                                      value={element.collectionname}
                                      key={element._id + "23326s"}
                                    >
                                      {element.collectionname}
                                    </option>
                                  );
                                }
                                   
                                  })
                                : ""}
                            </select>
                            <div className="invalid-feedback">
                            Please choose a sheet.
                          </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div
                          // style={{ fontSize: "12.5px" }}
                          className="mt-2 ml-3 row"
                        >
                          <legend
                            className="col-md-4 mr-1 font-weight-bold"
                            style={{ fontSize: "11px" }}
                          >
                            Move From
                          </legend>
                          <legend
                            className="col-md-4 ml-5 font-weight-bold"
                            style={{ fontSize: "11px" }}
                          >
                            Move To
                          </legend>
                          <DualListBox
                            options={opt}
                            selected={selected}
                            onChange={onChanges}
                            name="duallisttt[]"
                            id="dls"
                            alignActions="top"
                            style={{ fontSize: "12.4px" }}
                            className="m-2 w-75 "
                            required
                          />
                           <div className="invalid-feedback">
                            Please choose an option.
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{
                          fontSize: "12px",
                          marginTop: "1.6rem",
                        }}
                        className="btn btn-primary form-group offset-5"
                        
                      >
                        IMPORT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ImportListData;
