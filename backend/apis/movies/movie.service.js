const http = require("https");

module.exports = {
  searchMovie: (q, callBack) => {
    http
      .get(
        `https://omdbapi.com/?apikey=${process.env.API_KEY}&s=${q}`,
        (res) => {
          let chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
          res.on("end", function () {
            const body = Buffer.concat(chunks);
            //   console.log("data - " + body.toString());
            return callBack(null, JSON.parse(body));
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  },
};
