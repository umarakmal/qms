const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const filterDataSave = new Schema({
    A: {
        type: String,
    },
    B: {
        type: String,
    },
    C: {
        type: String,
    },
    D: {
        type: String,
    },
    E: {
        type: String,
    },
    F: {
        type: String,
    },
    G: {
        type: String,
    },
    H: {
        type: String,
    },
    I: {
        type: String,
    },
    J: {
        type: String,
    },
    new: {},

}, {
    timestamps: true
});
module.exports = mongoose.model(
    "FilterDataSave",
    filterDataSave
);