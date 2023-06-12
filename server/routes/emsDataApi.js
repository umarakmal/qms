const express = require("express");
const router = express.Router();
const { getAllCmidViaEmpID, getWholeDetailsPerEmp ,getEmployeeDataSOAP2, getProcess,getProcessForReport, getNameByID, getQaTlTrDecByCmid,getActiveEmpID, getActiveClient,getAggingByCmid} = require("../controllers/emsDataApi");
//Get all cmid via employee id
router.post("/getall-cmid-via-empid", getAllCmidViaEmpID);
router.post("/get-whole-details-employee", getWholeDetailsPerEmp);
router.post("/get-employee-data-soap2", getEmployeeDataSOAP2);
router.post("/get-process", getProcess);
router.post("/get-process-for-report", getProcessForReport);
router.post("/get-name-by-id", getNameByID);
router.post("/get-qa-tl-tr", getQaTlTrDecByCmid);
router.get("/get-active-empid", getActiveEmpID);
router.get("/get-active-client", getActiveClient);
router.post("/get-agging-by-cmid", getAggingByCmid);

module.exports = router;