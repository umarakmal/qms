const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const column_assignment = new Schema(
  {
    collectionname: {
      type: String,
    },
    cm_id:{
      type:String
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
  "Column_assignment",
  column_assignment
);
