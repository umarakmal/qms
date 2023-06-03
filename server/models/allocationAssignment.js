const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const allocationAssignment = new Schema(
  {
    process: {
      type: String,
    },
    sheetid:{
      type:String
    },
    auditeeid: {
      type: String,
    },
    empid:{
      type:String
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
    sdid:{
        type:String
    },
    is_superaudit:{
        type:String,
        default:'0'
    },
    assigningData:{
      type:String
    },
    callid:{
      type:String
    },
    calltype:{
      type:String
    },
    agentid:{
      type:String
    }, mobileno:{
      type:String
    },
    acht:{
      type:String
    },
    cmid:{
      type:String
    }, joinNew:{

    },
    delid:{
      type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AllocationAssignment",
  allocationAssignment
);
