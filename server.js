// I need...
const { notStrictEqual } = require("assert");
const { RSA_NO_PADDING } = require("constants");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

// Middleware route
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML GET requests
// Code below handles when users "visit" a page.
// The user is shown an HTML page of content
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// =========== API Requests ============
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// they are shown a JSON of the data in the table
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// POST route will allow the user to add a new note and save it
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      throw err;
    } else {
      let notes = JSON.parse(data);
      notes.push(newNote);
      // Each item in the JSON data is given an index number
      // i + 1 will start the id's at number 1 ...
      notes.forEach((item, i) => {
        item.id = i + 1;
      });

      fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
      });
    }
  });
  res.json(newNote);
});

// DELETE route




// ==========================================

// Home route
// Code below handles when users "visit" a page.
// The user is shown an HTML page of content
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// PORT is listening
app.listen(PORT, () => console.log(`App listening on location ${PORT}`));
