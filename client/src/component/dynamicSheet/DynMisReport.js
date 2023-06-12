import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { isAuth } from "../auth/helpers";
import $ from 'jquery'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`
const DynMisReport = () => {
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

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 120,
    },
    {
      field: "center",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Center",
      width: 130,
    },
    {
      field: "process",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Process",
      width: 150,
    },
    {
      field: "subprocess",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub Process",
      width: 150,
    },
    {
      field: "auditeeid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Auditee ID",
      width: 140,
    },
    {
      field: "auditorname",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Auditor Name",
      width: 150,
    },
    {
      field: "maximumMarks",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Max. Marks",
      width: 140,
    },
    {
      field: "obtainedMarks",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Obt. Marks",
      width: 140,
    },
    {
      field: "finalScore",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Final Score",
      width: 140,
    },
    {
      field: "fatalCount",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Fatal Count",
      width: 140,
    },
    {
      field: "callid",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Call ID",
      width: 130,
    },
    {
      field: "calltype",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Call TYPE",
      width: 130,
    },
    {
      field: "acht",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "ACHT",
      width: 130,
    },
    {
      field: "extrafield1",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Extra Field 1",
      width: 150,
    },
    {
      field: "extrafield2",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Extra Field 2",
      width: 150,
    },
    {
      field: "rebuttalstatus",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      headerName: "Rebuttal Status",
      width: 150,
    },
    {
      field: "calibrationstatus",
      headerName: "Calibration Status",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
  ];
  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    if ($("#date1").val() === "") {
      $("#date1err").show()
    }
    if ($("#date1").val() !== "") {
      $("#date1err").hide()
    }
    if ($("#date2").val() === "") {
      $("#date2err").show()
    }
    if ($("#date2").val() !== "") {
      $("#date2err").hide()
    }
    if (!startDate || !endDate) {
      return false
    }
    else {
      const date1 = startDate.toLocaleDateString();
      const date2 = endDate.toLocaleDateString();
      const employeeId = isAuth().EmployeeID
      const res = await fetch(`${url}/api/get-mis-Report-dynamic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date1,
          date2,
          employeeId
        }),
      });
      {
        const data = await res.json();
        setUserdata(data);
      }
      setShow(true);
    }
  };
  var z = [];
  var cent = ""
  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    mm: element.center === "1" ? cent = "Noida" : element.center === "2" ? cent = 'Mumbai' : element.center === "3" ? cent = "Meerut" : element.center === "4" ? cent = "Bareilly" : element.center === "5" ? cent = "Vadodara" : element.center === "6" ? cent = "Mangalore" : element.center === "7" ? cent = "Banglore" : "center",
    _id: element._id,
    any: (z = element.processDetails.split("|")),
    center: cent,
    process: z[0],
    subprocess: z[1],
    auditeeid: element.auditee_id,
    auditorname: element.auditor_name,
    maximumMarks: element.maximumMarks,
    obtainedMarks: element.obtainedMarks,
    finalScore: element.finalScore,
    fatalCount: element.fatalCount,
    callid: element.callid,
    calltype: element.calltype,
    acht: element.acht,
    extrafield1: element.extrafield1,
    extrafield2: element.extrafield2,
    rebuttalstatus: element.rbtlstatus,
    calibrationstatus: element.calibration_status,
  }));

  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form noValidate className="needs-validation" onSubmit={postData}>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: '1rem' }} className="card-title">Mis Report</h3>
                    </div>
                    <div className="card-body">

                      <div className="row">

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
                            style={{
                              fontSize: "12.4px",
                              height: "35px",
                              marginTop: "23px",
                            }}

                            className="btn btn-info btn-sm"
                            id="submit"
                          >
                            Get Data
                          </button>
                        </div>
                      </div>

                      <div className="card mt-5">
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
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 20,
                                },
                              },
                            }}
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

export default DynMisReport;
