import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
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

const Dashboard = () => {
  const columns = [
    {
      field: "id",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "S.No.",
      width: 120,
    },
    {
      field: "center",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Center",
      width: 150,
    },
    {
      field: "process",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Process",
      width: 150,
    },
    {
      field: "subprocess",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Sub Process",
      width: 150,
    },
    {
      field: "callauditcount",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Call Audit Count",
      width: 150,
    },
    {
      field: "agree",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Agree%",
      width: 150,
    },
    {
      field: "disagree",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "Disagree%",
      width: 150,
    },
    {
      field: "nofeedback",
      headerClassName: "font-weight-bold h6 small",
      cellClassName: "small font-weight-bold",
      headerName: "No Feedback%",
      width: 150,
    },
    {
      field: "fatal",
      headerClassName: "font-weight-bold h6 small",
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



  const postData = async (e) => {
    e.preventDefault();
if($("#date1").val() ===""){
  $("#date1err").show()
}
if($("#date1").val() !=""){
  $("#date1err").hide()
}
if($("#date2").val() ===""){
  $("#date2err").show()
}
if($("#date2").val() !=""){
  $("#date2err").hide()
}    
if(!startDate || !endDate){
  return false
}
else{
  const date1 = startDate.toLocaleDateString();
    const date2 = endDate.toLocaleDateString();
    const res = await fetch("/api/get-mis-Report", {
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
      setUserdata(data);
    }
    setShow(true);
  }
  };
  var p = [];
  var z = [];
  var nofeedback = []
  var count = 0
  var agree =[]
  var disagree = []
  var cv=0
  var dis = 0
  var blank = 0
  var fatalcnt = 0
  getuserdata.map(index => {
    if(index.Acknowledgement ==="agree"){
     return cv++, count++
    }
    else if(index.Acknowledgement ==="disagree"){
     return dis++, count++
    }else if(index.Acknowledgement ===""){
      return blank++, count++
    }else if(index.fatalCount ==="0"){
      return fatalcnt++, count++
    } 
  });
  const rows = getuserdata.slice(count-1).map((element, index) => ({
    id: index + 1,
    _id: element._id,
    xyz: (p = element.processDetails.split("|")),
    abc: (z =(fatalcnt * 100) / (count)),
    center: element.center,
    process: p[0],
    subprocess: p[1],
    callauditcount: count,
    xcd:agree=(cv*100/count),
    agree: agree,
    hgi:disagree=(dis*100/count),
    disagree: disagree,
    mk:nofeedback=(blank*100/count),
    nofeedback: nofeedback,
    fatal: z,
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
                  <div className="card card-dark mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Dashboard</h3>
                    </div>
                    <div className="card-body">
                      <div className="row offset-md-3">
                        <div className="form-group ">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date1"
                            className="form-label text-muted"
                          >
                            From
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
                          <div style={{display:'none', color:'red'}} id="date1err" className="invalid-feedback">
                            Please choose a date.
                          </div>
                        </div>
                        <div className="form-group ml-2">
                          <label
                            style={{ fontSize: "12px" }}
                            htmlFor="date2"
                            className="form-label text-muted"
                          >
                            To
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
                          <div style={{display:'none', color:'red'}} id="date2err" className="invalid-feedback">
                            Please choose a date.
                          </div>
                        </div>
                        <button
                          type="submit"
                          style={{
                            fontSize: "12.4px",
                            height: "35px",
                            marginTop: "23px",
                          }}
                          className="btn btn-primary sm ml-2"
                          id="submit"
                        >
                          Get Data
                        </button>
                      </div>
                      <div style={{ margin: "15px" }} className="card">
                        {show ? (
                          <DataGrid
                            style={{ fontWeight: "400" }}
                            components={{
                              Toolbar: MyExportButton,
                            }}
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
