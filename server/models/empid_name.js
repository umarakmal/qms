const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const empid_name = new Schema(
  {
    EmployeeID: {
      type: String,
    },
    cm_id:{
      type:Number
    },
    EmployeeName: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "empid_name",
  empid_name
);
