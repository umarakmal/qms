const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const qatlam = new Schema({
    employeeId: {
        type: String,
    },
    process: {
        type: String,
    },
    qa: {
        type: String,
    },
    tl: {
        type: String,
    },
    trainer: {
        type: String,
    }

}, {
    timestamps: true
});
module.exports = mongoose.model(
    "Qatlam",
    qatlam
);