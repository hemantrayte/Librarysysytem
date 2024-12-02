const mongoose = require("mongoose");

const book = new mongoose.Schema({
  url: {
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true, 
  },
  author: {
    type: String,
    required: true,
    unique:true,
  },
  publishedYear: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
    enum: ["available", "Borrowed"],
  }
},
{ timestamps:true});

module.exports = mongoose.model("book", book);
