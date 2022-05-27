//Initialization
const { response } = require("express");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Note = require("./models/Note");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://nanu:nanu123@cluster0.hcu8y.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(function () {
    //APP Routes

    //home rout (/)
    app.get("/", function (req, res) {
      res.send("this is the home pase");
    });
    //notes rout
    app.get("/notes/list/:userid", async function (req, res) {
      var notes = await Note.find({ userid: req.params.userid });
      res.json(notes);
    });

    app.post("/notes/add", async function (req, res) {
      //res.json(req.body);

      const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.connect,
      });
      await newNote.save();

      const response = { massage: "New Note Created! " };
      res.json(response);
    });
  });

//Starting the server on a PORT
app.listen(5000, function () {
  console.log("Server started at PORT: 5000");
});
