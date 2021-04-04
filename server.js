const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require('./controller');
const path = require('path');

const PORT = process.env.PORT || 3001;

const db = require("./model");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./public"));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/exercise', function(req, res) {
  res.sendFile(path.join(__dirname,'./public/exercise.html'));
});

app.get('/stats', function(req, res) {
  res.sendFile(path.join(__dirname,'./public/stats.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
