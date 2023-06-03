import React, { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAuth } from "../auth/helpers";
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
const SuperAuditedData = () => {
    const [processName, setProcessName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sheetName, setSheetName] = useState("")
    const [prcss, setProcesses] = useState("")
    const [datas, setData] = useState([])
    const [show, setShow] = useState(false);

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
            field: "AuditorId",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Auditor Id",
            width: 150,
        },
        {
            field: "AuditorPost",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Auditor Post",
            width: 140,
        },
        {
            field: "AuditeeId",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Auditee Id",
            width: 140,
        },
        {
            field: "AuditStatus",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Audit Status",
            width: 130,
        },
        {
            field: "MobileNo",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Mobile No",
            width: 150,
        },
        {
            field: "CallId",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Call Id",
            width: 160,
        },

        {
            field: "Acht",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Acht",
            width: 120,
        },
        {
            field: "CallType",
            headerClassName: " small",
            headerName: "Call Type",
            cellClassName: "small font-weight-bold",
            width: 200,
        },
        {
            field: "SuperAuditAt",
            headerName: "SuperAudit At",
            headerClassName: "  small",
            cellClassName: "small font-weight-bold",
            width: 140,
        },
    ];

    const handleChangeProcess = (e) => {
        e.preventDefault();
        const getdata = async () => {
            const process = e.target.value;
            var a = process.split('|')
            var cm_id = a[3]
            const res = await fetch(`${url}/api/find-data-with-process-name`, {
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
                setProcessName(data);
            }
        };
        getdata();
    };

    const handleSheetData = (e) => {
        e.preventDefault();
        setSheetName(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!startDate || !endDate) {
            return false
        } else {
            const date1 = startDate.toLocaleDateString();
            const date2 = endDate.toLocaleDateString();

            const postdata2 = async () => {
                const sheetid = sheetName
                const res = await fetch(`${url}/api/get-super-audited-data`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        date1, date2, sheetid,
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
                            setData(data)
                        } else {
                            setData([])
                        }
                    }
                }
            };
            postdata2()
            setShow(true)
        }
    }

    const rows = datas.map((element, index) => ({
        id: index + 1,
        _id: element._id,
        AuditorId: element.auditor_id,
        AuditorPost: element.auditor_post,
        AuditeeId: element.auditeeid,
        AuditStatus: element.audit_status,
        MobileNo: element.mobileno,
        CallId: element.callid,
        Acht: element.acht,
        CallType: element.calltype,
        SuperAuditAt: formatDate(new Date(element.superauditedAt))
    }));

    //For process
    useEffect(() => {
        const postdata1 = async () => {
            const EmployeeID = isAuth().EmployeeID
            const process = isAuth().Process
            const client = isAuth().client_name
            const res = await fetch(`${url}/api/get-process-for-report`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    EmployeeID, process, client
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
                        setProcesses(data);
                    } else {
                    }
                }
            }
        };
        postdata1()

    }, []);

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

    return (
        <>
            <Header />
            <Menu />
            <ToastContainer />
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <form id="form1" noValidate
                            className="needs-validation" onSubmit={handleSubmit}>
                            <div className="row mt-2">
                                <div style={{ fontSize: "12px" }} className="col-md-12">
                                    <div className="card card-info mt-3">
                                        <div className="card-header">
                                            <h3 style={{ fontSize: "1rem" }} className="card-title">
                                                Super Audited Data
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div id="process" className=" form-group col-md-3">
                                                    <label htmlFor="xyz">Process:</label>
                                                    <span style={{ color: "red" }}>*</span>
                                                    <select
                                                        id="Auditor"
                                                        name="process"
                                                        onChange={handleChangeProcess}
                                                        className="form-control form-control-sm"
                                                        style={{ fontSize: "12.4px" }}
                                                        required
                                                    >
                                                        <option value="">--Select--</option>
                                                        {(Object.values(prcss).length >= 1) ? prcss ? prcss.map((element) => {
                                                            return <option value={element.Process} key={element.cm_id}>{element.Process}</option>
                                                        }) : null : null}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        Please choose a process.
                                                    </div>
                                                </div>
                                                <div className=" form-group col-md-3">
                                                    <label htmlFor="xyz">Sheet:</label>
                                                    <span style={{ color: "red" }}>*</span>
                                                    <select
                                                        name="collectionname"
                                                        onChange={handleSheetData}
                                                        className="form-control form-control-sm"
                                                        style={{ fontSize: "12.4px" }}
                                                        required
                                                    >
                                                        <option value="">--Select--</option>
                                                        {processName
                                                            ? processName.map((element) => {
                                                                var collection = element.collectionname.split('_')
                                                                var newSheetName1 = collection.slice(1);
                                                                return (
                                                                    <option key={element._id} value={element.collectionname}>
                                                                        {newSheetName1.join('_')}
                                                                    </option>
                                                                );
                                                            })
                                                            : ""}
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        Please choose a sheet.
                                                    </div>
                                                </div>
                                                <div className="form-group col-md-2">
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
                                                </div>
                                                <div className="form-group col-md-2">
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
                                                </div>
                                                <div className='form-group col-md-2 mt-4 '>
                                                    <button
                                                        type='submit'
                                                        style={{ fontSize: '11.6px' }}
                                                        className="btn btn-info btn-sm"
                                                    >GET DATA</button>
                                                </div>
                                            </div>
                                            <div className="card">
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
                                                                paginationModel: { page: 0, pageSize: 15 },
                                                            },
                                                        }}
                                                        pageSizeOptions={[15, 30, 50]}
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
        </>
    )
}

export default SuperAuditedData