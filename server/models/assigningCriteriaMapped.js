const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assigningCriteriaMappedData = new Schema(
  {
    collectionname: {
      type: String,
    },
    acht: {
      type: String,
    },
    calltype: {
      type: String,
    },
    agentid: {
      type: String,
    },
    callid: {
      type: String,
    },
    mobileno: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "AssigningCriteriaMappedData",
  assigningCriteriaMappedData
);
