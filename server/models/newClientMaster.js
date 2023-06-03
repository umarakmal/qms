const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newClientMaster = new Schema(
  {
    cm_id: {
      type: Number,
    },
    oldcm_id: {
      type: Number,
    },
    client_name: {
      type: String,
    },
    oldclient_name: {
      type: Number,
    },
    account_head: {
      type: String,
    },
    dept_id: {
      type: Number,
    },
    process: {
      type: String,
    },
    location: {
      type: String,
    },
    oh: {
      type: String,
    },
    qh: {
      type: String,
    },
    th: {
      type: String,
    },
    er_scop: {
      type: String,
    },
    er_spoc2: {
      type: String,
    },
    er_spoc3: {
      type: String,
    },
    sub_process: {
      type: String,
    },
    createdon: {
      type: Date,
    },
    createdby: {
      type: String,
    },
    modifiedby: {
      type: String,
    },
    modifiedon: {
      type: Date,
    },
    Stipend: {
      type: String,
    },
    StipendDays: {
      type: Number,
    },
    days_from_joining: {
      type: Number,
    },
    days_from_floor: {
      type: Number,
    },
    days_of_rotation: {
      type: Number,
    },
    VH: {
      type: String,
    },
    excep_spoc: {
      type: String,
    },
    SiteSpoc: {
      type: String,
    },
    leave1_empid: {
      type: String,
    },
    leave2_empid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("newClientMaster", newClientMaster);
