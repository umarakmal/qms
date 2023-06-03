const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//Loads environment variables from .env file
require("dotenv").config();
const cors = require("cors");

const app = express();

//Connecting Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

var corsOptions = {
  origin: "http://192.168.220.59:3000"
};
app.use(cors(corsOptions));

// import routes
const authRoutes = require("./routes/auth");
const emsApiRoutes = require("./routes/emsDataApi");
const qmsSheetRoutes = require("./routes/qmsSheet");
// app middlewares

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(__dirname + "/public"));

// middleware
app.use("/api", authRoutes);
app.use("/api", emsApiRoutes);
app.use("/api", qmsSheetRoutes);
//Establishing server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
