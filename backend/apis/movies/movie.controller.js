const { searchMovie } = require("./movie.service");

module.exports = {
  getSearchMovies: (req, res) => {
    const query = req.params.q;
    searchMovie(query, (err, results) => {
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
