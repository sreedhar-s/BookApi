const mongoose = require("mongoose");

//Publication schema
const PublicationSchema = mongoose.Schema({
    ID: Number,
    name: String,
    books: [String],
});

const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;