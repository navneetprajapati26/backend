//Initialization
const { response } = require("express");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongodbPath =
  "mongodb+srv://nanu:nanu123@cluster0.hcu8y.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongodbPath).then(function () {
  //APP Routes

  //home rout (/)
  app.get("/", function (req, res) {
    const response = { statuscode: res.statusCode, massage: "API work!" };
    res.json(response);
  });

  const noteRouter = require("./routes/Note_routes");
  app.use("/notes", noteRouter);
});

//Starting the server on a PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server started at PORT: " + PORT);
});
