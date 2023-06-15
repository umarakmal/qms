const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const personal_detail = new Schema(
  {
    emp_id: {
        type: Number,
    },
    EmployeeID: {
        type: String,
    },
    INTID: {
        type: String,
    },
    EmployeeName: {
        type: String,
    },
    FirstName: {
        type: String,
    },
    MiddleName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    DOB: {
        type: String,
    },
    FatherName: {
        type: String,
    },
    MotherName: {
        type: String,
    },
    Gender: {
        type: String,
    },
    BloodGroup: {
        type: String,
    },
    MarriageStatus: {
        type: String,
    },
    Spouse: {
        type: String,
    },
    MarriageDate: {
        type: String,
    },
    ChildStatus: {
        type: String,
    },
    createdby: {
        type: String,
    },
    createdon: {
        type: Date,
    },
    modifiedby: {
        type: String,
    },
    modifiedon: {
        type: Date,
    },
    img: {
        type: String,
    },
    ref_id: {
        type: Number,
    },
    ref_txt: {
        type: String,
    },
    primary_language: {
        type: String,
    },
    secondary_language: {
        type: String,
    },
    first_dod: {
        type: Date,
    },
    day_stpn: {
        type: String,
    },
    location: {
        type: String,
    },
    spouse_dob: {
        type: String,
    },
    nominee_name: {
        type: String,
    },
    nominee_relation: {
        type: String,
    },
    father_dob: {
        type: String,
    },
    mother_dob: {
        type: String,
    },
    dstatus: {
        type: String,
    },
    total_experience: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("personal_detail", personal_detail);
