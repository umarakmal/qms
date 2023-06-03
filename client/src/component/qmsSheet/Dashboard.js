import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import $ from 'jquery'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import "react-datepicker/dist/react-datepicker.css";
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`
const Dashboard = () => {
  const columns = [
    {
      field: "id",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "S.No.",
      width: 120,
    },
    {
      field: "center",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Center",
      width: 150,
    },
    {
      field: "process",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Process",
      width: 150,
    },
    {
      field: "subprocess",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub Process",
      width: 150,
    },
    {
      field: "callauditcount",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Call Audit Count",
      width: 150,
    },
    {
      field: "Agree_Percentage",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Agree%",
      width: 150,
    },
    {
      field: "Disagree_Percentage",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Disagree%",
      width: 150,
    },
    {
      field: "No_Feedback_Percentage",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "No Feedback%",
      width: 150,
    },
    {
      field: "fatal_percent",
      headerClassName: "font-weight-bold  small",
      cellClassName: "small font-weight-bold",
      headerName: "Fatal%",
      width: 150,
    },
  ];
  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

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



  const postData = async (e) => {
    e.preventDefault();
    if ($("#date1").val() === "") {
      $("#date1err").show()
    }
    if ($("#date1").val() != "") {
      $("#date1err").hide()
    }
    if ($("#date2").val() === "") {
      $("#date2err").show()
    }
    if ($("#date2").val() != "") {
      $("#date2err").hide()
    }
    if (!startDate || !endDate) {
      return false
    }
    else {
      const date1 = startDate.toLocaleDateString();
      const date2 = endDate.toLocaleDateString();
      const res = await fetch(`${url}/api/get-dashboard-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date1,
          date2,
        }),
      });
      {
        const data = await res.json();
        if (data.length > 0) {
          setUserdata(data);
        }

      }
      setShow(true);
    }
  };

  var cent = ''
  const rows = getuserdata.map((element, index) => ({
    mm: element._id.Center === "1" ? cent = "Noida" : element._id.Center === "2" ? cent = 'Mumbai' : element._id.Center === "3" ? cent = "Meerut" : element._id.Center === "4" ? cent = "Bareilly" : element._id.Center === "5" ? cent = "Vadodara" : element._id.Center === "6" ? cent = "Mangalore" : element._id.Center === "7" ? cent = "Banglore" : "center",
    id: index + 1,
    _id: element._id.clientname,
    center: cent,
    process: element._id.process,
    subprocess: element._id.sub_process,
    callauditcount: element.Call_Audit,
    agree_count: element.Agree_Count,
    fatal_percent: Math.round(element.Fatal_Percentage),
    No_Feedback_Count: element.No_Feedback_Count,
    No_Feedback_Percentage: Math.round(element.No_Feedback_Percentage),
    Not_Fatal_Count: element.Not_Fatal_Count,
    Disagree_Percentage: Math.round(element.Disagree_Percentage),
    Agree_Percentage: Math.round(element.Agree_Percentage)
  }));
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
              onSubmit={postData}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Dashboard</h3>
                    </div>
                    <div className="card-body">
                      <div className="row ">
                        <div className="form-group col-md-4">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date1"
                            className="form-label"
                          >
                            From:
                          </label>

                          <DatePicker
                            selected={startDate}
                            selectsStart
                            className="form-control form-control-sm"
                            placeholderText="Select Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            id="date1"
                            autoComplete="off"
                            required
                          />
                          <div style={{ display: 'none', color: 'red' }} id="date1err" className="invalid-feedback">
                            Please choose a date.
                          </div>
                        </div>
                        <div className="form-group col-md-4">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date2"
                            className="form-label"
                          >
                            To:
                          </label>
                          <DatePicker
                            selected={endDate}
                            dateFormat="yyyy-MM-dd"
                            className="form-control form-control-sm"
                            selectsEnd
                            placeholderText="Select Date"
                            minDate={startDate}
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            id="date2"
                            autoComplete="off"
                            required
                          />
                          <div style={{ display: 'none', color: 'red' }} id="date2err" className="invalid-feedback">
                            Please choose a date.
                          </div>
                        </div>
                        <div className="form-group col-md-2">
                          <button
                            type="submit"
                            className="btn btn-info btn-sm mt-4"
                            id="submit"
                          >
                            Get Data
                          </button>
                        </div>
                      </div>
                      <div className="card mt-3">
                        {show ? (
                          <DataGrid
                            style={{ fontWeight: "400" }}
                            components={{
                              Toolbar: MyExportButton,
                            }}
                            density="compact"
                            autoHeight
                            getRowId={(element) => element._id}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                          />
                        ) : null}
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

export default Dashboard;
