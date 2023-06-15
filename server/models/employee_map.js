const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employee_map = new Schema(
    {
        EmployeeID:{
    type: String,
        }, df_id:{
    type: Number,
        }, cm_id:{
    type: Number,
        }, dateofjoin:{
    type: String,
        }, password:{
    type: String,
        }, emp_level:{
    type: String,
        }, emp_status:{
    type: String,
        }, secques:{
    type: String,
        }, secans:{
    type: String,
        }, createdon:{
    type: Date,
        }, createdby:{
    type: String,
        }, modifiedon:{
    type: Date,
        }, modifiedby:{
    type: String,
        }, flag:{
    type: Number,
        }, password_updated_time:{
    type: Date,
        }, dept_id:{
    type: Number,
        }
    },{
        timestamps:true
    }
);

module.exports = mongoose.model(
    "employee_map",
    employee_map
);