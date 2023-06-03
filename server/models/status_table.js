const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const status_table = new Schema({
    EmployeeID:{
        type: String,
    }, Status:{
        type: Number
    }, ReportTo:{
        type: String,
    }, Qa_ops:{
        type: String,
    }, BatchID:{
        type: Number
    }, createdon:{
        type: Date,
    }, InTraining:{
        type: Date,
    }, InOJT:{
        type: Date,
    }, OnFloor:{
        type: Date,
    }, OutTraining:{
        type: Date,
    }, InQAOJT:{
        type: Date,
    }, OutOJTQA:{
        type: Date,
    }, RetrainTime:{
        type: Date,
    }, roster:{
        type: String,
    }, reOJT:{
        type: Date,
    }, mapped_date:{
        type: Date,
    }, TL:{
        type: String,
    }
},{
    timestamps:true 
});

module.exports = mongoose.model("status_table",status_table);