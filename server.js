require("dotenv").config();
const express = require("express");
const router = require("express").Router();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname) + "/index.html");
});

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
