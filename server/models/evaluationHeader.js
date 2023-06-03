const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const evaluationHeader = new Schema(
  {
    process: {
      type: String,
    },
    sheet_name:{
        type:String
    },
    cm_id:{
        type:String,
    },
    created_by: {
      type: String
    },
    fieldname:{
        type:String
    },
    type:{
        type:String
    },
    Mandatory:{
        type:String
    },
    isNumeric:{
        type:String
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("EvaluationHeader", evaluationHeader);
