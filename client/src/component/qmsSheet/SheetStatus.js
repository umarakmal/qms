import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import { ToastContainer } from "react-toastify";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { isAuth } from "../auth/helpers";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const url = `${process.env.REACT_APP_BACKEND_URL}`;
const SheetStatus = () => {
  const [getuserdata, setUserdata] = useState([]);
  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      cellClassName: "small font-weight-bold ",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.id}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.id}</p>;
        }
      },
      width: 120,
    },
    {
      field: "collectionname",
      headerName: "Sheet Name",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        const sheetsname = params.row.collectionname.split("_");
        var newSheetName = sheetsname.slice(1);
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{newSheetName.join("_")}</p>;
        } else {
          return <p style={{ color: "red" }}>{newSheetName.join("_")}</p>;
        }
      },
      width: 150,
    },
    {
      field: "client",
      headerName: "Client",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.client}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.client}</p>;
        }
      },
      width: 150,
    },
    {
      field: "process",
      headerName: "Process",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.process}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.process}</p>;
        }
      },
      width: 150,
    },
    {
      field: "subprocess",
      headerName: "Sub Process",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.subprocess}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.subprocess}</p>;
        }
      },
      width: 150,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.createdBy}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.createdBy}</p>;
        }
      },
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.createdAt}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.createdAt}</p>;
        }
      },
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      cellClassName: "small font-weight-bold",
      renderCell: (params) => {
        if (params.row.status === "active") {
          return <p style={{ color: "green" }}>{params.row.status}</p>;
        } else {
          return <p style={{ color: "red" }}>{params.row.status}</p>;
        }
      },
      width: 150,
    },
  ];

  var d = [];
  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    proceess: (p = element.process.split("|")),
    client: p[0],
    process: p[1],
    subprocess: p[2],
    dateeee: (d = formatDate(new Date(element.createdAt))),
    collectionname: element.collectionname,
    createdBy: element.createdBy,
    createdAt: d,
    status: element.status,
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
  var addnewSheetName = "";
  useEffect(() => {
    const getdata = async () => {
      const cm_id = await isAuth().cm_id;
      const res = await fetch(
        `${url}/api/find-data-with-process-name-for-managesheet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cm_id,
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
          setUserdata(data);
          data.map((el) => {
            const sheetsname = el.collectionname.split("_");
            var newSheetName = sheetsname.slice(1);
            for (var i = 0; i < newSheetName.length; i++) {
              addnewSheetName += newSheetName[i];
              if (i < newSheetName.length - 1) {
                addnewSheetName += "_";
              }
            }
          });
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
                      <h3 style={{ fontSize: "1rem" }} className="card-title">
                        Sheet Status
                      </h3>
                    </div>
                    <div className="card-body">
                      <div style={{ overflow: "auto" }}>
                        <DataGrid
                          components={{
                            Toolbar: MyExportButton,
                          }}
                          autoHeight
                          density="compact"
                          getRowId={(element) => element._id}
                          rows={rows}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 7,
                              },
                            },
                          }}
                        />
                      </div>
                      <div
                        className="row card-body"
                        style={{ display: "none" }}
                      >
                        <p className=" font-weight-bold bg-info col-md-3">
                          No. of total sheets :- {getuserdata.length}
                        </p>
                        <p className=" font-weight-bold bg-success col-md-3">
                          No. of active sheets :- {activeLength}
                        </p>
                        <p className=" font-weight-bold bg-danger col-md-3">
                          No. of inactive sheets :- {inactiveLength}
                        </p>
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

export default SheetStatus;
