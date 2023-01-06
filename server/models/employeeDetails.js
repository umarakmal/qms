const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeDetails = new Schema(
  {
    process: {
      type: String,
    },
    employeeId: {
      type: String
    },
    doj: {
      type: String
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("EmployeeDetails", employeeDetails);
