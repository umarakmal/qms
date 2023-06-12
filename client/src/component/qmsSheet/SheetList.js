import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "../Menu";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../auth/helpers";

const url = `${process.env.REACT_APP_BACKEND_URL}`
const SheetList = () => {
  const [sheets, setSheets] = useState("");
  const [sheetName, setSheetName] = useState({
    getdynamiccollection: "",
  });
  const navigate = useNavigate()
  const location = useLocation()
  //Validation
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
  }, [navigate]);

  const setdata = (e) => {
    const { name, value } = e.target;
    setSheetName((sheetName) => {
      return {
        ...sheetName,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (location.state != null) {
      toast.success("Data saved successfully!");
    }
    setTimeout(() => {
      window.history.replaceState({}, document.title)
    }, 100);
  }, [location])

  //Get all cmid via employeeid
  useEffect(() => {
    const getdata1 = async () => {
      const EmployeeID = await isAuth().EmployeeID
      const client = await isAuth().client_name
      const emp_type = await isAuth().usertype

      const res = await fetch(`${url}/api/getall-cmid-via-empid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeID, client, emp_type
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        const getdata = async () => {
          const cm_id = await data[0].cm_id
          const res = await fetch(`${url}/api/get-dynamic-collection-names`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cm_id,
            }),
          });
          const data1 = await res.json();
          if (res.status === 422 || !data1) {
            console.log("error ");
          } else {
            setSheets(data1);
          }
        };
        getdata()
      }
    };
    getdata1()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const { getdynamiccollection } = sheetName;
    if ($("#selectsheet").val() === "") {
      $("#sheeterr").show()
      $("#selectsheet").css('border-color', 'red')
    }
    else {
      $("#sheeterr").hide()
    }
    if (!getdynamiccollection) {
      return false
    } else {
      const postdata = async () => {

        const res = await fetch(`${url}/api/get-dynamic-collection-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            getdynamiccollection,
          }),
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          if (!data) {
            console.log("No Data!");
          } else {
            navigate('/evaluation', { state: { data, getdynamiccollection } })
          }
        }
      };
      postdata();
    }
  };

  const sheetsname = sheetName.getdynamiccollection.split('_')
  var newSheetName = sheetsname.slice(1);
  var addnewSheetName = '';
  for (var i = 0; i < newSheetName.length; i++) {
    addnewSheetName += newSheetName[i]
    if (i < newSheetName.length - 1) {
      addnewSheetName += "_";
    }
  }
  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form noValidate
              className="needs-validation">
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info ">
                    <div className="card-header">
                      <h4 className="card-title">Sheet List: {addnewSheetName}</h4>
                    </div>
                    <div className="card-body">
                      <div
                        className="row"
                        style={{ border: "solid text-muted 1px" }}
                        id="sheethide"
                      >
                        <div className="form-group col-md-5">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Sheet:
                          </label>
                          <select
                            name="getdynamiccollection"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            id="selectsheet"
                          >
                            <option value="">Select</option>
                            {sheets
                              ? sheets.map((element) => {
                                const sheetsname1 = element.collectionname.split('_')
                                var newSheetName1 = sheetsname1.slice(1);
                                var addnewSheetName1 = '';

                                for (var i = 0; i < newSheetName1.length; i++) {
                                  addnewSheetName1 += newSheetName1[i]
                                  if (i < newSheetName1.length - 1) {
                                    addnewSheetName1 += "_";
                                  }
                                }
                                return (
                                  <option
                                    value={element.collectionname}
                                    key={element._id + "jhyu"}
                                  >
                                    {addnewSheetName1}
                                  </option>
                                );
                              })
                              : ""}
                          </select>
                          <div style={{ display: 'none', color: 'red' }} id="sheeterr">
                            Please choose a sheet.
                          </div>
                        </div>
                        <div className="form-group ml-2">
                          <button
                            type="click"
                            id="sheetbtn"
                            style={{
                              fontSize: "11px",
                              marginTop: "1.6rem"
                            }}
                            className="btn btn-sm btn-info col-md-12"
                            onClick={handleSubmit}
                          >
                            GET SHEET
                          </button>
                        </div>
                      </div>
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

export default SheetList;
