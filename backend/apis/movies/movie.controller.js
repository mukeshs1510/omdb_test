const { searchMovie, markAsFavorite } = require("./movie.service");

module.exports = {
  getSearchMovies: (req, res) => {
    const query = req.params.q;
    const page = req.params.page;
    searchMovie(query, page, (err, results) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Something went wrong!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  markAsFavoriteMovie: (req, res) => {
    const id = req.params.id;
    markAsFavorite(id, (err, results) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Something went wrong!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
