const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const D_CollectionName = new Schema(
  {
    collectionnames: {
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
module.exports = mongoose.model("D_CollectionName", D_CollectionName);
