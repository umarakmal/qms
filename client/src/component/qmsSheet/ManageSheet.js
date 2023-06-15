import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import { isAuth } from "../auth/helpers";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const ManageSheet = () => {
  const [sheetName, setSheetName] = useState({});
  const [processName, setProcessName] = useState([]);
  const [prcss, setProcess] = useState("")

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

  const setdata = (e) => {
    const { name, value } = e.target;
    setSheetName((sheetName) => {
      return {
        ...sheetName,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { process } = sheetName;
    if (!process) {
      return false
    } else {
      const getdata = async () => {
        var a = process.split('|')
        var cm_id = a[3]
        const res = await fetch(`${url}/api/find-data-with-process-name-for-managesheet`, {
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
          if (data.length > 0) {
            setProcessName(data);
          } else {
          }
        }
      };
      getdata();
    }
  };

  const updateStatusSheets = async (e, id) => {
    e.preventDefault();
    e.persist()
    const { status } = sheetName;
    if (!status) {
      return false
    } else {
      const res = await fetch(`${url}/api/update-sheet-status/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Error Occurred!");
      } else {
        toast.success("Updated Successfully!");
        handleSubmit(e)
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
            setProcess(data);
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
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form noValidate
              className="needs-validation"
              onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: '1rem' }} className="card-title">Manage Sheet</h3>
                    </div>
                    <div className="card-body">
                      <div
                        className="row mt-2"
                        style={{ border: "solid #ecf0f1 1px" }}
                      >
                        <div className="form-group col-sm-4">
                          <label style={{ fontSize: "11px" }} htmlFor="xyz">
                            Process:
                          </label>
                          <select
                            name="process"
                            onChange={setdata}
                            className="form-control form-control-sm"
                            style={{ fontSize: "12.4px" }}
                            required
                          >
                            <option value="">Select</option>
                            {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {

                              return <option value={element.Process + '|' + element.cm_id} key={element.cm_id}>{element.Process}</option>
                            }) : null : null}
                          </select>
                          <div className="invalid-feedback">
                            Please choose a process.
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            style={{
                              fontSize: "12px",
                              marginTop: "1.6rem",
                            }}
                            className="btn btn-info form-group"
                          >
                            VIEW
                          </button>
                        </div>
                      </div>
                      <div style={{ overflow: "auto", height: "22rem" }}>
                        <table className="table mt-5 table-striped">
                          <thead
                            style={{ fontSize: "12.4px" }}
                            className="thead"
                          >
                            <tr
                              style={{ color: "black" }}
                              className="table"
                            >
                              <th scope="col">#</th>
                              <th scope="col">Sheet Name</th>
                              <th scope="col">Client</th>
                              <th scope="col">Process</th>
                              <th scope="col">Sub Process</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: "12.4px" }}>
                            {processName.map((element, id) => {
                              var p = [];
                              p = element.process.split("|");
                              var sheetname = element.collectionname.split('_')
                              var newSheetName = sheetname.slice(1);
                              return (
                                <>
                                  <tr key={element._id}>
                                    <th scope="row" key={element._id + "97867"}>
                                      {id + 1}
                                    </th>
                                    <td >
                                      {newSheetName.join('_')}
                                    </td>
                                    <td >{p[0]}</td>
                                    <td >{p[0]}</td>
                                    <td >{p[2]}</td>
                                    <td >
                                      {element.status}
                                    </td>
                                    <td
                                      className="d-flex"
                                    >
                                      <div className="form-group row">
                                        <div className="form-check mr-2 ">
                                          <input
                                            style={{ height: "10px" }}
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            value="active"
                                            onChange={setdata}
                                            required
                                          />
                                          <label className="form-check-label">
                                            Active
                                          </label>
                                        </div>
                                        <div className="form-check">
                                          <input
                                            style={{ height: "10px" }}
                                            className="form-check-input"
                                            type="radio"
                                            name="status"
                                            value="inactive"
                                            onChange={setdata}
                                            required
                                          />
                                          <label className="form-check-label">
                                            Inactive
                                          </label>
                                        </div>
                                        <button
                                          key={element._id + "97700"}
                                          className="btn  btn-info btn-sm btn ml-3"
                                          onClick={(e) =>
                                            updateStatusSheets(e, element._id)
                                          }
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
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

export default ManageSheet;
