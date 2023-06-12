const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rebuttalStatus = new Schema({
    sheetid: {
        type: String,
    },
    dataid:{
        type:String
    },
    auditeeid: {
        type: String,
    },
    auditorid: {
        type: String,
    },
    qa_rebuttal_date: {
        type: String,
    } ,
    qh_rebuttal_date: {
        type: String,
    },
    qa_remark:{
        type: String,
    },
    qh_remark:{
        type:String
    },
    pre_score:{
        type:String
    },
    new_score:{
        type:String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model(
    "RebuttalStatus",
    rebuttalStatus
);