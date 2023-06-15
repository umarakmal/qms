const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reportMaster = new Schema({
    employeeId: {
        type: String,
    },
    process: {
        type: String,
    },
    cm_id:{
        type:String
    },
    report_name: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    employeeName: {
        type: String,
    }
}, {
    timestamps: true
});
module.exports = mongoose.model(
    "ReportMaster",
    reportMaster
);