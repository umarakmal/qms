const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uploadDataDynamicCollections = new Schema(
  {
    collectionname: {
      type: String,
      unique: true,
    },
    process: {
      type: String,
    },
    createdBy: {
      type: String,
      default: "test123",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "UploadDataDynamicCollections",
  uploadDataDynamicCollections
);
