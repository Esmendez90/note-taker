// I need...
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

// Middleware route 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Back-end route
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});


// API route
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})

// Back-end route
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.post("api/notes", (req, res) => {
    let newNote = req.body;
    console.log(newNote);
    res.json(newNote);
})



// PORT is listening
app.listen(PORT, () => console.log(`App listening on location ${PORT}`));