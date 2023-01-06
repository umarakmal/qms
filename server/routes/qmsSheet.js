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
  MappingCdrAndTaggingData,
  getDynamicCollectionDataOfMapping,
  getDynamicCollectionDataInA,
  getDynamicCollectionDataInCount,
  createMappedAssigningData,
  filterDataAcht,
  findDataJoin,
  findDataJoinCount,
  MappingCdrAndTaggingDataJoin,
  findDistinctAgent,
  findDistinctCalltypes,
  calltypesFilter,
  newHireApi,
  createEmployeeIDandDOJ,
  achtAndCalltypeDataFilter,
  qaTlTrainerCreate,
  getQaTlTrainer,
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
  updateCalibrationAssignment,
  createSheetDynamic,
  getDynamicCollectionNamesForDynamicOption,
  masterReport,
  getMasterReport,
  getAuditViewData,
  updateAllocationAssignment,
  updateSheetDetailsList,
  updateAuditStatus,
  getRebuttelViewData,
  getRebuttelScoreData,
  createRebuttalStatus,
  updateSheetDetailsListRebuttal,
  getReprt,getSuperAssign,updateSuperAssignmentAudit,getSheetListDataForSuperAssignment
} = require("../controllers/qmsSheet");

const router = express.Router();
//Creating Dynamic sheet
router.post("/createsheet", createSheet);
//Get data of dynamically created collections
router.post("/get-dynamic-collection-data", getDynamicCollectionData);
//Get names of all dynamically created collections
router.get("/get-dynamic-collection-names", getDynamicCollectionNames);
//Get collection name of dynamically created collection
router.post(
  "/get-dynamic-collection-with-name",
  getDynamicCollectionNamesWithNameInput
);
//Sheet list submit
router.post("/sheet-list-submit", sheetListSubmit);
router.post(
  "/getDynamicCollectionDataParam/:getdynamiccollection",
  getDynamicCollectionDataParam
);
router.put(
  "/update-sheet-attribute/:getdynamiccollection",
  updateSheetAttributes
);
router.post(
  "/get-sheet-data/:getdynamiccollection",
  getDynamicCollectionDataParamid
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
router.put("/update-sheet-status/:id", updateStatusSheets);
router.post("/upload-sheet-data", upload.single("csv_cdr"), uploaddataCdr);
router.post("/upload-sheet-data-tagging",upload.single("csv_tagging"),uploaddataTagging);
router.post("/ryg-assignment", RygAssignmentSubmit);
router.post("/ryg-assignment-find", findRygAssignment);
router.put("/ryg-assignment-update/:id", updateRygAssignment);
router.post("/get-mis-Report", getMisReport);
router.post(
  "/get-dynamic-collectiondata-with-name",
  getDynamicCollectionDataWithName
);
router.post("/mapping-cdr-and-tagging", MappingCdrAndTaggingData);
router.post(
  "/get-dynamic-collection-mapping",
  getDynamicCollectionDataOfMapping
);
router.post("/get-dynamic-collection-A", getDynamicCollectionDataInA);
router.post("/get-dynamic-collection-count", getDynamicCollectionDataInCount);
router.post("/create-mapped-assigning-data", createMappedAssigningData);
//Filter ACHT Data 
router.post("/filter-acht-data",filterDataAcht)
router.post("/mapping-cdr-and-tagging-join",MappingCdrAndTaggingDataJoin)
router.post("/find-data-join",findDataJoin)
router.post("/find-data-join-count",findDataJoinCount)
router.post("/get-distinct-agents",findDistinctAgent)
router.post("/find-distinct-calltypes",findDistinctCalltypes)
router.post("/calltypes-filter",calltypesFilter)
//Employee Details
router.post("/create-employee-details",createEmployeeIDandDOJ)
router.post("/new-hire-filter",newHireApi)
router.post("/acht-calltype-filter-save",achtAndCalltypeDataFilter)
router.post("/qa-tl-trainer",qaTlTrainerCreate)
router.post("/get-qa-tl-trainer",getQaTlTrainer)
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
router.post("/create-sheet-dynamic", createSheetDynamic)
router.post("/get-dynamic-collectionname-for-dynamic",getDynamicCollectionNamesForDynamicOption)
router.post("/report-master", masterReport)
router.get("/get-report-master", getMasterReport)
router.post("/get-audit-view-data", getAuditViewData)
router.post("/update-allocation-assignment", updateAllocationAssignment)
router.put("/update-sheet-details-list", updateSheetDetailsList)
router.put("/update-audit-status", updateAuditStatus)
router.post("/get-rebuttel-view-data", getRebuttelViewData)
router.post("/get-rebuttel-score-data", getRebuttelScoreData)
router.post("/create-rebuttal-status", createRebuttalStatus)
router.put("/update-rebuttal-sheetlistdetails", updateSheetDetailsListRebuttal)
router.post("/get-report",getReprt)
router.post("/get-super-assignment",getSuperAssign)
router.put("/update-super-assignment",updateSuperAssignmentAudit)
router.post("/get-sheetlist-data-super-assignment",getSheetListDataForSuperAssignment)
module.exports = router;
