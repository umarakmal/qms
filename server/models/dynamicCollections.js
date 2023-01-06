const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dynamicCollection = new Schema(
  {
    collectionname: {
      type: String,
      unique: true,
    },
    process: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    createdBy: {
      type: String,
      default: "test123",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DynamicCollections", dynamicCollection);
