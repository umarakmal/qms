const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calibrationStatus = new Schema(
  {
    sheetid:{
      type:String
    },
    auditeeid: {
      type: String,
    },
    auditor_id: {
      type: String,
    },dataid:{
      type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "CalibrationStatus",
  calibrationStatus
);
