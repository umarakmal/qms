const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sheetDetailsListCollection = new Schema(
  {
    employeeid: {
     type: String,
    },
    sheet_name:{
     type:String
    },
    wow_call_option: {
     type: String,
    },
    ztp_option: {
     type: String,
    },
    ztp_remark: {
     type: String,
    },
    callid: {
     type: String,
    },
    extrafield1: {
     type: String,
    },
    extrafield2: {
     type: String,
    },
    auditor_remark: {
     type: String,
    },
    msisdn: {
     type: String,
    },
    option_bonus_call: {
     type: String,
    },
    finalScore: {
     type: String,
    },
    obtainedMarks: {
     type: String,
    },
    maximumMarks: {
     type: String,
    },
    fatalCount: {
     type: String,
    },
    wow_call_remark: {
     type: String,
    },
    audit_time:{
     type:String
    },
    auditor_name:{
     type:String
    },
    auditorid:{
      type:String
    },
    auditee_id:{
     type:String
    },
    calibration_status:{
     type:String,
      default:'0'
     },
     Acknowledgement:{
     type:String,
     default:'agree'
     },
     Auditee_Remark:{
     type:String
     },
     rbtlstatus:{
     type:String
     },
     auditee_feedurl:{type:String},
     FeedbackDate:{type:String},
     rbtlstatus:{type:String},
     fclose:{type:String},
     Updated_at:{type:String},
     fb_source:{type:String},
    bonus_call_remark: { type: String },
    marking_bonus_call: { type: String },
    parameter: {},
    subparameter: {},
    remark: {},
    subParaRemarks: {},
    fieldData: {},
    attributes1: {},
    subParaAttributes1: {},
    subParaAttributes2: {},
    subParaAttributes3: {},
    attributes2: {},
    attributes3: {},
    marks: {},
    subParaMarks: {},
    subparameter2: {},
    processDetails: {
      type: String,
      default: "Information Technology|Software Development|Software Development",
    },
    OH:{
      type:String,
      default:"CE123456789"
    },
    OH_Name:{
      type:String,
      default:"XYZ"
    },
    QH:{
      type:String,
      default:"CE987654321"
    },
    QH_Name:{
      type:String,
      default:"ABC"
    },
    TH:{
      type:String,
      default:"CE123456789"
    },
    TH_Name:{
      type:String,
      default:"XYZ"
    },
    AH:{
      type:String,
      default:"CE987654321"
    },
    AH_Name:{
      type:String,
      default:"ABC"
    },
    Report_to:{
      type:String,
      default:"CE123456789"
    },
    Report_to_Name:{
      type:String,
      default:"XYZ"
    },
    reject_by:{
      type:String
    },
    center:{
      type:String,
      default:'Noida'
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "SheetDetailsListCollections",
  sheetDetailsListCollection
);
