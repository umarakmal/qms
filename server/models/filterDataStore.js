const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sample_dump = new Schema({
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
    K: {
        type: String,
    },
    L: {
        type: String,
    },
    M: {
        type: String,
    },
    N: {
        type: String,
    },
    O: {
        type: String,
    },
    P: {
        type: String,
    },
    Q: {
        type: String,
    },
    R: {
        type: String,
    },
    S: {
        type: String,
    },
    T: {
        type: String,
    },
    new: {},
    delId:{
        type:String
    }

}, {
    timestamps: true
});
module.exports = mongoose.model(
    "Sample_dump",
    sample_dump
);