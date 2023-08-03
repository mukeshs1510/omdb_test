import debounce from "lodash.debounce";
import React, { useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../App.css";

const SearchComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [defaultSearchpage, setDefaultSearchpage] = useState(1); // to add pagination
  const [totalResults, setTotalResults] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  const debouncedSearch = debounce(
    (searchQuery) => searchMovie(searchQuery),
    500
  );

  const searchMovie = async (searchQuery) => {
    setErrorMsg("");
    if (searchQuery == "") {
      setSearchResult([]);
      setTotalResults(0);
      return;
    }
    setIsLoading(true);
    await axios
      .get(`apis/movies/search/${searchQuery}/${defaultSearchpage}`)
      .then((res) => {
        setIsLoading(false);
        // if (searchPage == 1) {
        if (res.data.data.Search == undefined) {
          setSearchResult([]);
          setErrorMsg(res.data.data.Error);
        } else {
          setSearchResult(res.data.data.Search);
          setFavoritesMovies(res.data.data.favorites);
          setTotalResults(+res.data.data.totalResults);
          console.log(+res.data.data.totalResults);
        }
        // } else {
        //   console.log("pagi");
        //   if (res.data.data.Search == undefined) {
        //     setSearchResult([]);
        //     setErrorMsg(res.data.data.Error);
        //   } else {
        //     setSearchResult([...searchResult, res.data.data.Search]);
        //     console.log(res.data.data.Search[0].Title);
        //     setTotalResults(+res.data.data.totalResults - 10);
        //   }
        // }
        // console.log(res.data.data.Error);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg(error);
      });
  };

  const callBackDebouce = useCallback(
    (searchQ) => debouncedSearch(searchQ),
    []
  );

  const onSearch = (event) => {
    setSearchQuery(event.target.value);
    callBackDebouce(event.target.value);
  };

  // const processPagination = () => {
  //   setDefaultSearchpage(defaultSearchpage + 1);
  //   searchMovie(searchQuery, defaultSearchpage + 1);
  // };

  return (
    <>
      <div
        className={`${
          searchQuery == "" ? "my-auto" : " bg-slate-200"
        } w-full flex justify-center p-10`}
      >
        <div className="max-w-md mx-auto">
          <div
            className={`relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden ${
              searchQuery == "" && "border-2 border-slate-200"
            }`}
          >
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="bg-white h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              value={searchQuery}
              onChange={onSearch}
              placeholder="Search Movie..."
            />
          </div>
        </div>
      </div>
      {errorMsg != "" && (
        <div className="my-auto mx-auto text-black">{errorMsg}</div>
      )}
      {isLoading && <div className="loading-spinner"></div>}
      <div className="card-container">
        {searchResult &&
          searchResult.map((movie) => (
            // <div key={movie.imdbID} className="text-white">
            //   {movie.Title}
            // </div>
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              img={movie.Poster}
              fav={favoritesMovies.indexOf(movie.imdbID) > -1}
            />
          ))}
      </div>
      {/* {totalResults > 10 && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={processPagination}
        >
          Load More
        </button>
      )} */}
    </>
  );
};

export default SearchComp;
