const express = require("express");
const router = require("express").Router();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname) + "/index.html");
});

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
