import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { NavLink, useLocation} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const AuditView = () => {

  const [getAuditViewData, setAuditViewData] =  useState("");
  const [dataSource, setDataSource] =  useState("");
  const location = useLocation()

  const setdata = (e) => {
    const { name, value } = e.target;
    setDataSource((dataSource) => {
      return {
        ...dataSource,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const postdata1 = async () => {
        const auditorid = "CE1528722"
            const res = await fetch("/api/get-audit-view-data", {
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
                setAuditViewData(data);
              }
            }
          };
          postdata1()
          
}, []);

const handleSkip =async(e,id)=>{
  e.preventDefault()
const {skip_reason} = dataSource
  const res2 = await fetch(`/api/update-allocation-assignment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,skip_reason
    }),
  });
  
  const data1 = await res2.json();
  if (res2.status === 422 || !data1) {
    console.log("error");
  } else {
    console.log("success");
  }

//Get data api
const postdata1 = async () => {
  const auditorid = "CE1528722"
      const res = await fetch("/api/get-audit-view-data", {
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
          setAuditViewData(data);
        }
      }
    };
    postdata1()

}

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
                        Audit View
                      </h3>
                    </div>
                    <div className="card-body">
                    <div>
  <table className="table table-sm mt-3">
    <thead style={{fontSize:'11px'}} className="thead-dark">
      <tr>
        <th scope="col">Audit Form</th>
        <th scope="col">Skip Audit</th>
        <th scope="col">Auditor ID</th>
        <th scope="col">Agent ID</th>
        <th scope="col">Allocation Date</th>
      </tr>
    </thead>
    <tbody>
  {getAuditViewData? getAuditViewData.map((el)=>{
    var v= el.assigningData.split(",")
    var call = v[3].substring(7,42)
    var acht = v[5].substring(7,10)
    var mobile=v[6].substring(7,17)
    var callid = v[1].substring(7,25)
return<tr>
<td className="d-flex " key={el._id + "tt"}>
                      <NavLink to={`edit/audit?id=${el._id}&sheetid=${el.sheetid}&auditeeid=${el.auditeeid}&acht=${acht}&mobile=${mobile}&call=${call}&callid=${callid}`}>
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
                  
                    <td  key={el._id + "tt894865"}>
                     
                  <div className='row'>
                    <select
                    name="skip_reason"
                    onChange={setdata}
                    className="form-control form-control-sm "
                    style={{ fontSize: "11.4px" , width:"30%"}}
                    >
                      <option defaultValue="">--select--</option>
                      <option>Non-Auditable</option>
                      <option>Call Not Found</option>
                      <option>Crossed 2 audits for week</option>
                      <option>Crossed 3 audits for week</option>
                      <option>UCID or Calling Issue</option>
                    </select>
                    <button
                          key={el._id + "hi9870"}
                          style={{fontSize:"11px"}}
                          onClick={(e) => handleSkip(e,el._id)}
                          className="btn btn-sm btn-primary ml-2"
                        >
                          Skip
                        </button>
                        </div>
                        
                    </td>
<td>{el.auditor_id}</td>
<td>{el.auditeeid}</td>
<td>{el.createdAt}</td>
</tr>

  }):null
  }
      
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
    </>
  )
}

export default AuditView