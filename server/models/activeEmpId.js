const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const activeEmpId = new Schema(
  {
    EmployeeID: {
      type: String,
    },
    cm_id:{
      type:Number
    },
    df_id: {
      type: Number,
    },
    DOJ:{
      type:String
    },
    emp_level:{
      type:String
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "activeEmpId",
  activeEmpId
);
