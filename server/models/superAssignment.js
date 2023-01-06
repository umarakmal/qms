const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const superAssignment = new Schema(
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
    auditor_id: {
      type: String,
    },
    audit_status: {
      type: String,
    },
    auditor_post: {
      type: String,
    },
    assigningData:{
      type:String
    },
    callid:{
        type:String
    },
    acht:{
        type:String
    },
    mobileno:{
      type:String
    },
    calltype:{
        type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "SuperAssignment",
  superAssignment
);
