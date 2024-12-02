const mongoose = require("mongoose");
const URI = process.env.URI;
const connection = async () => {
  try {
    await mongoose.connect(`${URI}`)
    console.log("Connection to database successfully");
  } catch(error) {
    console.log(error);
  }
};

connection()