import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { NavLink, useLocation} from 'react-router-dom'
import Menu from '../Menu'
import { toast, ToastContainer } from 'react-toastify'

const CalibrationView = () => {
const [getCalibrationViewData, setCalibrationViewData] =  useState("");
const location = useLocation()

useEffect(()=>{
  if(location.state != null){
    toast.success("successfully Calibrated!");
  }
},[])
  
    useEffect(() => {
        const postdata1 = async () => {
            const auditorid = "CE90980192"
                const res = await fetch("/api/get-calibration-view-data", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    auditorid
                  }),
                });
                const data = await res.json();
                if (res.status === 422 || !data) {
                  console.log("error ");
                } else {
                  if (!data) {
                    console.log("No Data!");
                  } else {
                    setCalibrationViewData(data);
                  }
                }
              };
              postdata1()
              
    }, []);
           
      

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <form id="form1">
              <div className="row mt-2">
                <div style={{ fontSize: "12px" }} className="col-md-12">
                  <div className="card card-info mt-3">
                    <div className="card-header">
                      <h3 style={{ fontSize: "12px" }} className="card-title">
                        Calibration View
                      </h3>
                    </div>
                    <div className="card-body">
                      
                    <table className="table table-sm mt-3">
    <thead style={{fontSize:'11px'}} className="thead-dark">
      <tr>
        <th scope="col">Audit Form</th>
        <th scope="col">Auditor ID</th>
        <th scope="col">Agent ID</th>
        <th scope="col">Call Type</th>
      </tr>
    </thead>
    <tbody>
    {getCalibrationViewData ? getCalibrationViewData.map((el)=>{
        var v= el.assigningData.split(",")
        var call = v[3].substring(7,42)
        var acht = v[5].substring(7,10)
        var mobile=v[6].substring(7,17)
        var callid = v[1].substring(7,25)
    return<tr>
        <td className="d-flex " key={el._id + "tt"}>
                              <NavLink to={`edit?id=${el._id}&sheetid=${el.sheetid}&auditeeid=${el.auditeeid}&acht=${acht}&mobile=${mobile}&call=${call}&callid=${callid}`}>
                                {" "}
                                <button
                                  key={el._id + "97700"}
                                  style={{fontSize:"11px"}}
                                  className="btn btn-sm btn-primary"
                                >
                                  <i className="nav-icon fas fa-edit" />
                                </button>
                              </NavLink>
                            </td>
        <td>{el.auditor_id}</td>
        <td>{el.auditeeid}</td>
        <td>{call}</td>
    </tr>
    }):null}
      
    </tbody>
  </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div>
  
 
</div>

            </div>
            </section>
            </div>
            <Footer />
    </>
  )
}

export default CalibrationView