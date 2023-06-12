const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientStatusMaster = new Schema(
  {
    id:{
        type: Number,
    }, createdon:{
        type: Date,
    }, cm_id: {
        type: Number,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("clientStatusMaster", clientStatusMaster);