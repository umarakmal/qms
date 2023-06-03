const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const md5 = require('md5')
const whole_details_peremp = new Schema(
    {
        EmployeeID: {
            type: String,
        },
        INTID: {
            type: String,
        },
        FirstName: {
            type: String,
        },
        LastName: {
            type: String,
        },
        EmployeeName: {
            type: String,
        },
        DOB: {
            type: String,
        },
        MotherName: {
            type: String,
        },
        BloodGroup: {
            type: String
        },
        MarriageStatus: {
            type: String
        },
        ChildStatus: {
            type: String
        },
        FatherName: {
            type: String
        },
        primary_language: {
            type: String
        },
        secondary_language: {
            type: String
        },
        img: {
            type: String
        },
        emp_level: {
            type: String
        },
        emp_status: {
            type: String
        },
        cm_id: {
            type: Number
        },
        df_id: {
            type: Number
        },
        DOJ: {
            type: String
        },
        EmpIDcreationdate: {
            type: Date
        },
        secques: {
            type: String
        },
        secans: {
            type: String
        },
        Process: {
            type: String
        },
        sub_process: {
            type: String
        },
        account_head: {
            type: String
        },
        oh: {
            type: String
        },
        qh: {
            type: String
        },
        th: {
            type: String
        },
        client_name: {
            type: String
        },
        VH: {
            type: String
        },
        clientname: {
            type: String
        },
        id: {
            type: Number
        },
        function: {
            type: String
        },
        des_id: {
            type: String
        },
        designation: {
            type: String
        },
        dept_id: {
            type: Number
        },
        dept_name: {
            type: String
        },
        status: {
            type: Number
        },
        ReportTo: {
            type: String
        },
        Qa_ops: {
            type: String
        },
        BatchID: {
            type: Number
        },
        TL: {
            type: String
        },
        DOD: {
            type: String
        },
        CreatedOn: {
            type: Date
        },
        onFloor: {
            type: Date
        },
        OutTraining: {
            type: Date
        },
        InOJT: {
            type: Date
        },
        InQAOJT: {
            type: Date
        },
        OutOJTQA: {
            type: Date
        },
        reOJT: {
            type: Date
        },
        reTrain: {
            type: Date
        },
        mapped_date: {
            type: Date
        },
        InTraining: {
            type: Date
        },
        ojt_Date: {
            type: Date
        },
        Quality: {
            type: String
        },
        ojt_status: {
            type: Number
        },
        date_cer_1: {
            type: Date
        },
        Trainer: {
            type: String
        },
        Statustr: {
            type: String
        },
        password:{
            type:String
        },
        retrain_flag: {
            type: Number
        },
        AppraisalMonth: {
            type: String
        },
        location: {
            type: String
        },
        rt_type: {
            type: Number
        },
    },
    { timestamps: true }
);

// methods
whole_details_peremp.methods = {

    authenticate: function (plainText) {
      return md5(plainText) === this.password; // true false
    }
}


module.exports = mongoose.model(
    "whole_details_peremp",
    whole_details_peremp
);


