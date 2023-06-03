const express = require("express");
const {
  createSheet,
  getDynamicCollectionNamesWithNameInput,
  getDynamicCollectionData,
  getDynamicCollectionNames,
  sheetListSubmit,
  getDynamicCollectionDataParam,
  updateSheetAttributes,
  getDynamicCollectionDataParamid,
  updateDynamicCollectionWithSelectOptions,
  updateDynamicCollectionWithSelectOptionsTest,
  updateDynamicCollectionWithSelectOptionsTestAttribute,
  updateDynamicCollectionWithListImport,
  findDataWithProcessName,
  updateStatusSheets,
  upload,
  uploaddataCdr,
  uploaddataTagging,
  RygAssignmentSubmit,
  findRygAssignment,
  updateRygAssignment,
  getDynamicCollectionDataWithName,
  getMisReport,
  createMappedAssigningData,
  filterDataAcht,
  findDataJoin,
  findDataJoinCount,
  MappingCdrAndTaggingDataJoin,
  findDistinctAgent,
  findDistinctCalltypes,
  calltypesFilter,
  achtAndCalltypeDataFilter,
  checkRyg,
  allocationDataManual,
  getAssign,
  getCallid,
  reAllocation,
  getCalibrationData,
  calibrationAssignmentt,
  calibrationStatusUpdate,
  getSuperAuditData,
  superAuditSave,
  getCalibrationViewData,
  getSheetListDetailsForCalibration,
  insertCalibrationStatus,
  updateCalibrationAssignment,getmanualempid,manualdata,getCalibratedData,
  masterReport,getMasterIdReport,getDashboardReport,getReportData,getSuperAuditedData,getSkippedAllcatedData,
  getMasterReport,achtAndBucketAndNewHireDataFilter,calltypeAndBucketAndAchtAndNewHireDataFilter,newHireApiNew,
  getAuditViewData,achtAndBucketAndCalltypeDataFilter,calltypeAndBucketDataFilter,calltypeAndBucketAndNewHireDataFilter,
  updateAllocationAssignment,achtAndNewHireDataFilter,achtAndBucketDataFilter,achtAndNewHireAndCalltypeDataFilter,
  updateSheetDetailsList,findDataWithProcessNameForManageSheet,newHireAndBucketDataFilter,newHireAndCalltypeDataFilter,
  updateAuditStatus,getAttributeParasubpara,updateDynamicCollectionWithSelectOptionsTestAttributeGetdataSubfield,
  getRebuttelViewData,updateSheetDetailsListForRebuttelScore,findDataManageListParticularField,filterDataRyg,updateDynamicCollectionWithSelectOptionsTestAttributeGetdata,updateDynamicCollectionWithSelectOptionsTestAttribute11,
  getRebuttelScoreData,D_MasterProcess,getMisReportDynamic,getReprtDynamic,sheetListSubmitForAudioRecording,
  createRebuttalStatus,getSheetForFeedbackAuditee,feedbackGet,updateSheetDetailsListFeedback,D_MasterReoprtGet,
  updateSheetDetailsListRebuttal,getSheetListDataForFeedback,getSheetDetailsForFeedbackss,agentFeedackUpdate,
  getReprt,getSuperAssign,updateSuperAssignmentAudit,getSheetListDataForSuperAssignment, upload1
} = require("../controllers/qmsSheet");

const router = express.Router();
//Creating Dynamic sheet
router.post("/createsheet", createSheet);
//Get data of dynamically created collections
router.post("/get-dynamic-collection-data", getDynamicCollectionData);
//Get names of all dynamically created collections
router.post("/get-dynamic-collection-names", getDynamicCollectionNames);
//Get collection name of dynamically created collection
router.post(
  "/get-dynamic-collection-with-name",
  getDynamicCollectionNamesWithNameInput
);
//Sheet list submit
router.post("/sheet-list-submit", sheetListSubmit);
router.post("/sheet-list-submit-for-audio",upload1.single("audioURL"), sheetListSubmitForAudioRecording);
router.post(
  "/getDynamicCollectionDataParam/:getdynamiccollection",
  getDynamicCollectionDataParam
);
router.put(
  "/update-sheet-attribute/:getdynamiccollection",
  updateSheetAttributes
);
router.put(
  "/update-dynamiccollection-selected-options-test-attribute/:getdynamiccollection",
  updateDynamicCollectionWithSelectOptionsTestAttribute
);
router.put(
  "/update-dynamiccollection-selected-options-test-attribute11/:getdynamiccollection",
  updateDynamicCollectionWithSelectOptionsTestAttribute11
);
router.post(
  "/attribute-get-subfield",
  updateDynamicCollectionWithSelectOptionsTestAttributeGetdataSubfield
);
router.post("/update-test-att-get-data", updateDynamicCollectionWithSelectOptionsTestAttributeGetdata);
router.post("/get-attri-parasubpara", getAttributeParasubpara);
router.post(
  "/get-sheet-data/:getdynamiccollection",
  getDynamicCollectionDataParamid
);
router.post(
  "/find-data-particular-field",
  findDataManageListParticularField
);
router.put(
  "/update-dynamiccollection-selected-options/:getdynamiccollection",
  updateDynamicCollectionWithSelectOptions
);
router.put(
  "/update-dynamiccollection-selected-options-test/:getdynamiccollection",
  updateDynamicCollectionWithSelectOptionsTest
);
router.put(
  "/update-dynamiccollection-selected-options-test-attribute/:getdynamiccollection",
  updateDynamicCollectionWithSelectOptionsTestAttribute
);
router.put(
  "/update-dynamiccollection-list-import",
  updateDynamicCollectionWithListImport
);
router.post("/find-data-with-process-name", findDataWithProcessName);
router.post("/find-data-with-process-name-for-managesheet", findDataWithProcessNameForManageSheet);
router.put("/update-sheet-status/:id", updateStatusSheets);
router.post("/upload-sheet-data", upload.single("csv_cdr"), uploaddataCdr);
router.post("/upload-sheet-data-tagging",upload.single("csv_tagging"),uploaddataTagging);
router.post("/ryg-assignment", RygAssignmentSubmit);
router.post("/ryg-assignment-find", findRygAssignment);
router.put("/ryg-assignment-update/:id", updateRygAssignment);
router.post("/get-mis-Report", getMisReport);
router.post("/get-mis-Report-dynamic", getMisReportDynamic);
router.post(
  "/get-dynamic-collectiondata-with-name",
  getDynamicCollectionDataWithName
);
router.post("/create-mapped-assigning-data", createMappedAssigningData);
//Filter ACHT Data 
router.post("/filter-acht-data",filterDataAcht)
router.post("/mapping-cdr-and-tagging-join",MappingCdrAndTaggingDataJoin)
router.post("/find-data-join",findDataJoin)
router.post("/find-data-join-count",findDataJoinCount)
router.post("/get-distinct-agents",findDistinctAgent)
router.post("/find-distinct-calltypes",findDistinctCalltypes)
router.post("/calltypes-filter",calltypesFilter)

//Filtering sample allocation
router.post("/acht-newhire-filter",achtAndNewHireDataFilter)
router.post("/acht-bucket-filter",achtAndBucketDataFilter)
router.post("/newhire-bucket-filter",newHireAndBucketDataFilter)
router.post("/newhire-acht-calltype-filter",achtAndNewHireAndCalltypeDataFilter)
router.post("/newhire-calltype-filter",newHireAndCalltypeDataFilter)
router.post("/acht-bucket-calltype-filter",achtAndBucketAndCalltypeDataFilter)
router.post("/bucket-calltype-filter",calltypeAndBucketDataFilter)
router.post("/bucket-calltype-newhire-filter",calltypeAndBucketAndNewHireDataFilter)
router.post("/bucket-acht-newhire-filter",achtAndBucketAndNewHireDataFilter)
router.post("/bucket-calltype-newhire-acht-filter",calltypeAndBucketAndAchtAndNewHireDataFilter)
router.post("/new-hire-filter-new",newHireApiNew)
router.post("/filter-data-ryg",filterDataRyg)
router.post("/acht-calltype-filter-save",achtAndCalltypeDataFilter)
router.post("/check-ryg",checkRyg)
router.post("/allocation-data",allocationDataManual)
router.post("/get-assign",getAssign)
router.post("/get-callid", getCallid)
router.put("/re-allocation", reAllocation)
router.post("/get-calibration-data", getCalibrationData)
router.post("/calibration-assignment",calibrationAssignmentt)
router.put("/calibration-status-update", calibrationStatusUpdate)
router.post("/get-super-audit", getSuperAuditData)
router.post("/super-audit-save", superAuditSave)
router.post("/get-calibration-view-data", getCalibrationViewData)
router.post("/get-sheetlistdetails-calibration", getSheetListDetailsForCalibration)
router.post("/calibration-status", insertCalibrationStatus)
router.put("/update-calibration-assignment", updateCalibrationAssignment)
router.post("/report-master", masterReport)
router.get("/get-report-master", getMasterReport)
router.post("/get-audit-view-data", getAuditViewData)
router.post("/update-allocation-assignment", updateAllocationAssignment)
router.put("/update-sheet-details-list",upload1.single("audioURL"), updateSheetDetailsList)
router.put("/update-sheet-details-list-for-rebuttel-score", updateSheetDetailsListForRebuttelScore)
router.put("/update-audit-status", updateAuditStatus)
router.post("/get-rebuttel-view-data", getRebuttelViewData)
router.post("/get-rebuttel-score-data", getRebuttelScoreData)
router.post("/create-rebuttal-status", createRebuttalStatus)
router.put("/update-rebuttal-sheetlistdetails", updateSheetDetailsListRebuttal)
router.post("/get-report-master-id", getMasterIdReport)
router.post("/get-report",getReprt)
router.post("/get-super-assignment",getSuperAssign)
router.put("/update-super-assignment",updateSuperAssignmentAudit)
router.post("/get-sheetlist-data-super-assignment",getSheetListDataForSuperAssignment)
router.post("/get-sheetList-for-feedback",getSheetListDataForFeedback)
router.post("/get-sheet-details-for-feedback-audio",getSheetDetailsForFeedbackss)
router.put("/agent-feedback-update",upload1.single("audioURL"),agentFeedackUpdate)
router.post("/get-sheet-auditee-feedback",getSheetForFeedbackAuditee)
router.post("/feedback-get",feedbackGet)
router.put("/update-feedback-sheetdetails",updateSheetDetailsListFeedback)
router.post("/d-master-report-get",D_MasterReoprtGet)
router.post("/d-master-report-process",D_MasterProcess)
router.post("/d-report-get",getReprtDynamic)
router.post("/get-dashboard-report",getDashboardReport)
router.post("/get-report-data",getReportData)
router.post("/get-manual-empid",getmanualempid);
router.post("/get-manual-data",manualdata)
router.post("/get-skipped-allocated-data",getSkippedAllcatedData)
router.post("/get-super-audited-data",getSuperAuditedData)
router.post("/get-calibrated-data",getCalibratedData)
module.exports = router;
