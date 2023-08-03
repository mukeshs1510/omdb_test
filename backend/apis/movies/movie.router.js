const { getSearchMovies, markAsFavoriteMovie } = require("./movie.controller");
const router = require("express").Router();

// movies
router.get("/search/:q/:page", getSearchMovies);
router.post("/favorite/:id", markAsFavoriteMovie);
// router.post("/favorites", markAsFavorite);

module.exports = router;
