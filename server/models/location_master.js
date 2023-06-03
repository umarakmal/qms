const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const location_master = new Schema(
    {
        id: {
            type: String,
        },
        location: {
            type: String,
        }
    }, {
    timestamps: true,
}
);

module.exports = mongoose.model("location_master", location_master);
