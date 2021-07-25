const mongoose = require("mongoose");

// Author schema
const AuthorSchema = mongoose.Schema({
    ID: Number,
    name: String,
    books: [String],
});

const AuthorModel = mongoose.model("author",AuthorSchema);

module.exports = AuthorModel;