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
const SkippedAllocation = () => {
    const [processName, setProcessName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sheetName, setSheetName] = useState("")
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
            width: 110,
        },
        {
            field: "AuditorID",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Auditor ID",
            width: 130,
        },
        {
            field: "AuditorPost",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Auditor Post",
            width: 150,
        },
        {
            field: "SkipReason",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Skip Reason",
            width: 180,
        },
        {
            field: "MobileNo",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Mobile No.",
            width: 150,
        },
        {
            field: "CallID",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Call ID",
            width: 150,
        },
        {
            field: "CallAlocatedDate",
            headerClassName: " small",
            cellClassName: "small font-weight-bold",
            headerName: "Call Alocated Date",
            width: 140,
        },
    ];



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
                const res = await fetch(`${url}/api/get-skipped-allocated-data`, {
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
            setShow(true);
        }
    }


    const rows = datas.map((element, index) => ({
        id: index + 1,
        _id: element._id,
        AuditorID: element.auditor_id,
        AuditorPost: element.auditor_post,
        SkipReason: element.skip_reason,
        MobileNo: element.mobileno,
        CallID: element.callid,
        CallAlocatedDate: formatDate(new Date(element.createdAt)),
    }));

    //For process
    useEffect(() => {
        let cm_id = isAuth().cm_id
        const getdata = async () => {
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
                                                Skipped Allocation
                                            </h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

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

export default SkippedAllocation