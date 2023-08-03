const http = require("https");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 15 });
const fs = require("fs");

module.exports = {
  searchMovie: (q, page, callBack) => {
    http
      .get(
        `https://omdbapi.com/?apikey=${process.env.API_KEY}&s=${q}&page=${page}`,
        (res) => {
          let chunks = [];
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
          res.on("end", function () {
            const body = Buffer.concat(chunks);
            //   console.log("data - " + body.toString());
            let favMovies = fs.readFileSync("./favMovies.txt");
            let listFavMovies = favMovies.toString().split(",");
            var obj = JSON.parse(body);
            obj.favorites = listFavMovies;
            // let jsonStr = JSON.stringify(obj);
            return callBack(null, obj);
          });
        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  },
  markAsFavorite: async (id, callBack) => {
    let favMovies = fs.readFileSync("./favMovies.txt");
    let listFavMovies = favMovies.toString().split(",");
    let toRemove = false;
    const index = listFavMovies.indexOf(id);
    if (index > -1) {
      toRemove = true;
      listFavMovies.splice(index, 1);
    }

    if (toRemove) {
      fs.writeFileSync("./favMovies.txt", "");

      try {
        fs.appendFile(
          "./favMovies.txt",
          listFavMovies.toString() + ",",
          (err) => {
            if (err) throw err;
          }
        );
        return callBack(null, "success");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        fs.appendFile("./favMovies.txt", id + ",", (err) => {
          if (err) throw err;
        });
        return callBack(null, "success");
      } catch (err) {
        console.error(err);
      }
    }
  },
};
