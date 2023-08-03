require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movieRouter = require("./apis/movies/movie.router");

const app = express();
app.use(express.json());

const APP_PORT = 4000;
app.use(cors());
app.use("/apis/movies", movieRouter);

app.listen(APP_PORT, () => {
  console.log("Server running: " + APP_PORT);
});
module.exports = app;
// app.listen();
