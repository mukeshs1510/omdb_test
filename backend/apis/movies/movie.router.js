const { getSearchMovies } = require("./movie.controller");
const router = require("express").Router();

// movies
router.get("/search/:q", getSearchMovies);
// router.post("/favorites", markAsFavorite);

module.exports = router;
