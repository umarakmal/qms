const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sheet = new Schema(
  {
    collectionname: {
      type: String,
      unique: true,
    },
    sheet_name: {
      type: String,
      unique: true
    },
    sheetid: {
      type: String,
      unique: true
    },
    process: {
      type: String,
    },
    cm_id: {
      type: String
    },
    status: {
      type: String,
      default: "active",
    },
    createdBy: {
      type: String,
    },
    sheettype: {
      type: String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Sheets", sheet);
