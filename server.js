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

// Back-end routes
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.listen(PORT, () => console.log(`App listening on location ${PORT}`));