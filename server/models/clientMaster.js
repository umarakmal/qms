const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clientMaster = new Schema(
  {
    client_id: {
      type: Number,
    },
    client_name: {
      type: String,
    },
    createdon: {
      type: Date,
    },
    createdby: {
      type: String,
    },
    modifiedon: {
      type: Date,
    },
    modifiedby: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("clientMaster", clientMaster);
