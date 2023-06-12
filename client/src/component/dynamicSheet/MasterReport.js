import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`
const MasterReport = () => {
  const [getuserdata, setUserdata] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: " small",
      cellClassName: "small font-weight-bold ",
      width: 120,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      headerClassName: " small ",
      cellClassName: "small font-weight-bold",
      width: 150,
      renderCell: (row) =>
        <td>
          <Link to="/d/d-master" state={(row.row.test)} >{row.row.employeeId}</Link>
        </td>
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "process",
      headerName: "Process",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "report_name",
      headerName: "Report Name",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      headerClassName: " small",
      cellClassName: "small font-weight-bold",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      headerClassName: " small",
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
    employeeName: element.employeeName,
    report_name: element.report_name,
    createdAt: d,
    test: element.employeeName + "-" + element.employeeId,
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
      const res = await fetch(`${url}/api/get-report-master`, {
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
                  <div className="card card-info mt-3">
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
