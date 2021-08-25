const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let exampleSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        author: {
            type: String,
        },
    },
    { timestamps: true }
);

let Example = mongoose.model("example", exampleSchema);

module.exports = Example;