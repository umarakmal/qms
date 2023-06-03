const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const responce = new Schema(
  {
    employeeid: {
      type: String,
    },
    sheet_name: {
      type: String
    },
    sheetid: {
      type: String
    },
    dataId: {
      type: String
    },
    clientname: {
      type: String
    },
    process: {
      type: String
    },
    sub_process: {
      type: String
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
    calltype: {
      type: String
    },
    acht: {
      type: String
    },
    extrafield1: {
      type: String,
    },
    extrafield2: {
      type: String,
    },
    email: {
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
      type: Number,
      default: 0
    },
    wow_call_remark: {
      type: String,
    },
    audit_time: {
      type: String
    },
    auditor_name: {
      type: String
    },
    auditorid: {
      type: String
    },
    auditee_id: {
      type: String
    },
    auditee_name: {
      type: String
    },
    calibration_status: {
      type: String,
      default: '0'
    },
    Acknowledgement: {
      type: String,
    },
    Auditee_Remark: {
      type: String
    },
    rbtlstatus: {
      type: String,
      default: '0'
    },
    auditee_feedurl: { type: String },
    FeedbackDate: { type: String },
    fclose: {
      type: String,
      default: '0'
    },
    Updated_at: { type: String },
    fb_source: { type: String },
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
      type: String
    },
    OH: {
      type: String
    },
    OH_Name: {
      type: String
    },
    QH: {
      type: String
    },
    QH_Name: {
      type: String
    },
    TH: {
      type: String
    },
    TH_Name: {
      type: String
    },
    AH: {
      type: String
    },
    AH_Name: {
      type: String
    },
    Report_to: {
      type: String
    },
    Report_to_Name: {
      type: String
    },
    reject_by: {
      type: String,
      default: '0'
    },
    center: {
      type: String,
      default: '1'
    },
    cm_id: {
      type: String
    }, audioURL: {
      type: String
    }, DOJ: {
      type: String
    },
    audit_type: {
      type: String
    },
    responce: {
      type: String
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "Responce",
  responce
);
