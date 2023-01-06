import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Menu from '../Menu'
import { ToastContainer } from 'react-toastify'
const AgentFeedback = () => {
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
        <th scope="col">No.</th>
        <th scope="col">Action</th>
        <th scope="col">Sheet View</th>
        <th scope="col">Audit Date</th>
        <th scope="col">Max. Marks</th>
        <th scope="col">Obt. Marks</th>
        <th scope="col">Final Score</th>
        <th scope="col">Fetal count</th>
        <th scope="col">Auditee Name</th>
        <th scope="col">Auditor Name</th>
        <th scope="col">Auditor Remark</th>
      </tr>
    </thead>
    <tbody>
  
      
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

export default AgentFeedback