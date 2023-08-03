require("dotenv").config();
const express = require("express");
const cors = require("cors");
const movieRouter = require("./apis/movies/movie.router");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/apis/movies", movieRouter);

// app.listen(process.env.APP_PORT, () => {
//   console.log("Server running: " + process.env.APP_PORT);
// });

app.listen();
