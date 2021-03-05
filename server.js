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

// HTML GET request
// Code below handles when users "visit" a page.
// The user is shown an HTML page of content
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// =========== API Routes ============
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// they are shown a JSON of the data in the table
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Code below handles when the user submits data to the server
// POST route will allow the user to add a new note and save it
// The saved note will will save in our database (db.json)
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  // Use fs to read the db.json file and later parse this data so it can be modified
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      throw err;
    } else {
      // Parse data so we can push a new note into it
      let notes = JSON.parse(data);
      notes.push(newNote);
      // Each item in the JSON data is given an index number
      // Index numbers will begin at 1 since we are adding i + 1 for each item
      notes.forEach((item, i) => {
        item.id = i + 1;
      });
      // Use fs to write (send) the new data
      // Data has to be converted to a string
      fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        // send response with new data
        res.json(newNote);
      });
    }
  });
});

// DELETE route will allow the user to delete a note
// Will delete the specified data from the database
app.delete("/api/notes/:id", (req, res) => {
  let deleteId = req.params.id;
  // Use fs to read the db.json file and later parse this data so it can be modified
  fs.readFile("./db/db.json", function (err, data) {
    if (err) {
      throw err;
    } else {
      // Parse data then...
      let notes = JSON.parse(data);
      notes.forEach((note) => {
        // Compare id's then...
        if (deleteId == note.id) {
          // Grab the index to be deleted ...
          let currentIndex = notes.indexOf(note);
          // and delete it.
          notes.splice(currentIndex, 1);
          // Use fs to write (send) the new data
          // Data has to be converted to a string
          fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err;
            // send response with new data
            res.json(notes);
          });
        }
      });
    }
  });
});

// ==========================================

// Home route
// Code below handles when users "visit" a page.
// The user is shown an HTML page of content
// If no matching route is found then default to home
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// PORT is listening
app.listen(PORT, () => console.log(`App listening on location ${PORT}`));
