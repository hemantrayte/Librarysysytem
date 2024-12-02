require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
require("./connection/connection");
const User = require("./routes/user");
const Book= require("./routes/book");

app.use(cors());

app.use(express.json());
//routes
app.use("/api/auth", User);
app.use("/api/data", Book);
  
//creating port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is listining on port ${PORT}`);  
})