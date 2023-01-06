const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rygAssignmentCollection = new Schema(
  {
    process: {
      type: String,
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
  "RygAssignmentCollection",
  rygAssignmentCollection
);
