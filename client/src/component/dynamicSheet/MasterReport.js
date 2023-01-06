import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const MasterReport = () => {
  const [getuserdata, setUserdata] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold ",
      width: 120,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      headerClassName: "bg-dark h6 small ",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "process",
      headerName: "Process",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "report_name",
      headerName: "Report Name",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      headerClassName: "bg-dark h6 small",
      cellClassName: "small font-weight-bold",
      width: 150,
    }
  ];
  var date = [];
  var d = [];
  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    employeeId: element.employeeId,
    process: element.process,
    dateeee: (d = formatDate(new Date(element.createdAt))),
    createdBy: element.createdBy,
    employeeName:element.employeeName,
    report_name:element.report_name,
    createdAt: d,
  }));

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }

  var p = [];

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("/api/get-report-master", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          setUserdata(data);
        }
      }
    };
    getdata();
  }, []);
  var i = 0;
  var j = 0;
  var activeLength = [];
  var inactiveLength = [];
  var z = getuserdata.map((el) => {
    if (el.status === "active") {
      i++;
    } else if (el.status === "inactive") {
      j++;
    }
  });
  activeLength.push(i);
  inactiveLength.push(j);
  return (
    <div>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content ">
          <div className="container-fluid ">
            <form>
              <div className="row mt-2">
                <div style={{ fontSize: "12.3px" }} className="col-md-12">
                  <div className="card card-dark mt-3">
                    <div className="card-header">
                      <h3 className="card-title">Master Report</h3>
                    </div>
                    <div className="card-body">
                      <div style={{ overflow: "auto", height: "27rem" }}>
                        <DataGrid
                          style={{ fontWeight: "400" }}
                          components={{
                            Toolbar: MyExportButton,
                          }}
                          autoHeight
                          getRowId={(element) => element._id}
                          rows={rows}
                          columns={columns}
                          pageSize={50}
                          rowsPerPageOptions={[50]}
                        />
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

export default MasterReport;
