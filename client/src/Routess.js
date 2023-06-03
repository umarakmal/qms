import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./component/auth/PrivateRoute";
import Signin from "./component/auth/Signin";
import PageNotFound from "./component/PageNotFound";
import QmsSheetCreate from "./component/qmsSheet/QmsSheetCreate";
import SheetList from "./component/qmsSheet/SheetList";
import ManageAttributes from "./component/qmsSheet/ManageAttributes";
import ManageListItems from "./component/qmsSheet/ManageListItems";
import UpdateExistingSheet from "./component/qmsSheet/UpdateExistingSheet";
import ManageSheet from "./component/qmsSheet/ManageSheet";
import ImportListData from "./component/qmsSheet/ImportListData";
import SheetStatus from "./component/qmsSheet/SheetStatus";
import Dashboard from "./component/qmsSheet/Dashboard";
import SampleUpload from "./component/qmsSheet/SampleUpload";
import Mapping from "./component/qmsSheet/Mapping";
import RygAssignment from "./component/qmsSheet/RygAssignment";
import MisReport from "./component/qmsSheet/MisReport";
import SampleAllocation from "./component/qmsSheet/SampleAllocation";
import ReAllocation from "./component/qmsSheet/ReAllocation";
import Calibration from "./component/qmsSheet/Calibration";
import SuperAudit from "./component/qmsSheet/SuperAudit";
import CalibrationView from "./component/qmsSheet/CalibrationView";
import CalibrationAudit from "./component/qmsSheet/CalibrationAudit";
import AuditView from "./component/qmsSheet/AuditView"
import RebuttalView from "./component/qmsSheet/RebuttalView";
import SuperAuditView from "./component/qmsSheet/SuperAuditView";
import AgentFeedback from "./component/qmsSheet/AgentFeedback";
import DynCreateSheet from "./component/dynamicSheet/DynCreateSheet";
import DynMisReport from "./component/dynamicSheet/DynMisReport";
import MasterReport from "./component/dynamicSheet/MasterReport";
import EvaluationAutoTest from "./component/qmsSheet/EvaluationAutoTest";
import RebuttelScore from "./component/qmsSheet/RebuttelScore";
import Report from "./component/qmsSheet/Report";
import SuperAuditAssignment from "./component/qmsSheet/SuperAuditAssignment";
import Feedback from "./component/qmsSheet/Feedback";
import AgentSheetView from "./component/qmsSheet/AgentSheetView";
import DynMaster from "./component/dynamicSheet/DynMaster";
import DynAgentView from "./component/dynamicSheet/DynAgentView";
import DynReport from "./component/dynamicSheet/DynReport";
import Evaluation5 from "./component/qmsSheet/Evaluation5";
import { isAuth } from "./component/auth/helpers";
import SkippedAllocation from "./component/qmsSheet/SkippedAllocation";
import SuperAuditedData from "./component/qmsSheet/SuperAuditedData";
import CalibratedData from "./component/qmsSheet/CalibratedData";

const Routess = () => {
  let qhd2 = "Null"
  let qh = "Null"
  let EmployeeID = "Null"
  if(!isAuth()){
     qhd2 = "Null"
     qh = "Null"
     EmployeeID = "Null"
  }else{
     qhd2 = "No"
     qh = isAuth().qh
     EmployeeID = isAuth().EmployeeID
    if(EmployeeID === qh){
      qhd2 = "Yes"
    }
  }

  
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Signin />} />
       <Route element={<PrivateRoute />}>
       <Route path="/app" element={<App />} />
       <Route path="/sheetlist"  element={<SheetList />} />
        <Route path="/evaluation5"  element={<Evaluation5 />} />  
        <Route path="/random/calibration-view"  element={<CalibrationView />} />
        <Route path="/random/calibration-view/edit"  element={<CalibrationAudit />} />
        <Route path="/random/audit-view/edit/audit"  element={<EvaluationAutoTest />} />
        <Route path="/random/rebuttal-view/edit/rebuttel"  element={<RebuttelScore />} />
        <Route path="/random/audit-view"  element={<AuditView />} />
        <Route path="/random/rebuttal-view"  element={<RebuttalView />} />
        <Route path="/random/super-audit-view"  element={<SuperAuditView />} />
        <Route path="/agent-feedback"  element={<AgentFeedback />} />
        <Route path="/feedback"  element={<Feedback />} />
        <Route path="/agent-sheetview"  element={<AgentSheetView />} />
        <Route path="/d-agent-sheetview"  element={<DynAgentView />} />
        <Route path="/d/d-create-sheet"  element={<DynCreateSheet />} />
        <Route path="/d/d-mis-report"  element={<DynMisReport />} />
        <Route path="/get-report"  element={<Report />} />
        
        <Route path="/d/d-get-report"  element={  <DynReport />} />
        <Route path="/random/super-audit-view/super-assignment-audit"  element={<SuperAuditAssignment />} />
        { (qhd2 !== 'No') ?
    <>
     <Route path="/createqmssheet"  element={<QmsSheetCreate />} /> 
     <Route path="/manage-attributes"  element={<ManageAttributes />} /> 
     <Route path="/update-sheet"  element={<UpdateExistingSheet />} />
     <Route path="/manage-sheet"  element={<ManageSheet />} />
     <Route path="/import-list-data"  element={<ImportListData />} />
     <Route path="/manage-listitems"  element={<ManageListItems />} />
     <Route path="/random/sample-upload"  element={<SampleUpload />} /> 
     <Route path="/random/mapping/:id1/:id2"  element={<Mapping />}  />
     <Route path="/random/ryg-assignment"  element={<RygAssignment />} />  
     <Route path="/random/sample-allocation"  element={<SampleAllocation />} />  
     <Route path="/random/re-allocation"  element={<ReAllocation />} />  
     <Route path="/random/calibration"  element={<Calibration />} /> 
     <Route path="/random/super-audit"  element={<SuperAudit />} />
     <Route path="/random/skipped-allocation" element={<SkippedAllocation />} />
     <Route path="/random/superaudited-data" element={<SuperAuditedData />} />
     <Route path="/random/calibrated-data" element={<CalibratedData />} />
     </>
     :null
     }
       
       { qh !== 'No' && (EmployeeID === 'CE10091236' || EmployeeID === 'CE03070003' || EmployeeID === 'CE07147134' || EmployeeID ==='CE01145570') ?
       <>
        <Route path="/sheet-status"  element={<SheetStatus />} /> 
        <Route path="/dashboard"  element={<Dashboard />} /> 
        <Route path="/mis-report"  element={<MisReport />} /> 
        <Route path="/d/d-master"  element={<DynMaster />} />
        <Route path="/d/master-report"  element={<MasterReport />} />
           </>
        :null}
       
       {( EmployeeID === 'CE01080195' || EmployeeID === 'CE02145717') ? 
       <>
       <Route path="/sheet-status"  element={<SheetStatus />} />
       <Route path="/dashboard"  element={<Dashboard />} /> 
       <Route path="/mis-report"  element={<MisReport />} />
       </>
        :null }

       {( EmployeeID === 'CE12102224' || EmployeeID === 'CE0321936544' )?  <Route path="/mis-report"  element={<MisReport />} /> :null}
       </Route>
      <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;
