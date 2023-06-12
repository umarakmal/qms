const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ryg_master = new Schema(
  {
    process: {
      type: String,
    },
    cm_id:{
      type:String
    },
    redfrom: {
      type: String,
    },
    redto: {
      type: String,
    },
    amberfrom: {
      type: String,
    },
    amberto: {
      type: String,
    },
    greenfrom: {
      type: String,
    },
    greento: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "Ryg_master",
  ryg_master
);
