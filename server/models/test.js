const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testAssign = new Schema(
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
      type: Number,
    },
    assigningData:{
        type: String,
    },
    userid:{
        type:String
      }
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "TestAssign",
  testAssign
);
