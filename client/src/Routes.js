import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
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
import D_CreateSheet from "./component/dynamicSheet/D_CreateSheet";
import D_MisReport from "./component/dynamicSheet/D_MisReport";
import MasterReport from "./component/dynamicSheet/MasterReport";
import EvaluationAutoTest from "./component/qmsSheet/EvaluationAutoTest";
import RebuttelScore from "./component/qmsSheet/RebuttelScore";
import Report from "./component/qmsSheet/Report";
import SuperAuditAssignment from "./component/qmsSheet/SuperAuditAssignment";
const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/createqmssheet" exact component={QmsSheetCreate} />
        <Route path="/sheetlist" exact component={SheetList} />
        <Route path="/re-allocation" exact component={ReAllocation} />
        <Route path="/manage-attributes" exact component={ManageAttributes} />
        <Route path="/manage-listitems" exact component={ManageListItems} />
        <Route path="/update-sheet" exact component={UpdateExistingSheet} />
        <Route path="/manage-sheet" exact component={ManageSheet} />
        <Route path="/sheet-status" exact component={SheetStatus} />
        <Route path="/import-list-data" exact component={ImportListData} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/mapping/:id1/:id2" exact component={Mapping} />
        <Route path="/sample-upload" exact component={SampleUpload} />
        <Route path="/sample-allocation" exact component={SampleAllocation} />
        <Route path="/ryg-assignment" exact component={RygAssignment} />
        <Route path="/mis-report" exact component={MisReport} />
        <Route path="/calibration" exact component={Calibration} />
        <Route path="/super-audit" exact component={SuperAudit} />
        <Route path="/calibration-view" exact component={CalibrationView} />
        <Route path="/edit" exact component={CalibrationAudit} />
        <Route path="/edit/audit" exact component={EvaluationAutoTest} />
        <Route path="/edit/rebuttel" exact component={RebuttelScore} />
        <Route path="/audit-view" exact component={AuditView} />
        <Route path="/rebuttal-view" exact component={RebuttalView} />
        <Route path="/super-audit-view" exact component={SuperAuditView} />
        <Route path="/agent-feedback" exact component={AgentFeedback} />
        <Route path="/d-create-sheet" exact component={D_CreateSheet} />
        <Route path="/d-mis-report" exact component={D_MisReport} />
        <Route path="/master-report" exact component={MasterReport} />
        <Route path="/get-report" exact component={Report} />
        <Route path="/super-assignment-audit" exact component={SuperAuditAssignment} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
