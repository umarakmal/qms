const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const process_map = new Schema({
    process_id: {
        type: Number,
    },
    process:{
        type:String
    },
    process_name: {
        type: String,
    },
    CreatedOn: {
        type: String,
    },
}, {
    timestamps: true
});
module.exports = mongoose.model(
    "process_map",
    process_map
);