const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calibrationAssignment = new Schema(
  {
    process: {
      type: String,
    },
    cm_id: {
      type: String
    },
    sheetid: {
      type: String
    },
    auditeeid: {
      type: String,
    },
    empid: {
      type: String
    },
    auditor_id: {
      type: String,
    },
    audit_status: {
      type: String,
    },
    auditor_post: {
      type: String,
    },
    skip_reason: {
      type: String,
    },
    sdid: {
      type: String
    },
    callid: {
      type: String
    },
    mobileno: {
      type: String
    },
    acht: {
      type: String
    },
    calltype: {
      type: String
    },
    is_superaudit: {
      type: String
    },
    assigningData: {
      type: String
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "CalibrationAssignment",
  calibrationAssignment
);
