const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/internship", {
  useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

// setup view engine
app.set("view engine", "ejs");

// Load assest
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assest/js")));

app.use("/", require("./server/routes/router"));

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
