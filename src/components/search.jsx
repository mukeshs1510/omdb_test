import debounce from "lodash.debounce";
import React, { useState, useCallback } from "react";
import axios from "axios";

const SearchComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [defaultSearchpage, setDefaultSearchpage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = "b74e254a";

  const debouncedSearch = debounce(
    (searchQuery) => searchMovie(searchQuery),
    500
  );

  const searchMovie = async (searchQuery) => {
    if (searchQuery == "") return;
    setIsLoading(true);
    await axios
      .get(`?apikey=${API_KEY}&s=${searchQuery}&page=${defaultSearchpage}`)
      .then((res) => {
        setIsLoading(false);
        setSearchResult(res.data.Search);
      })
      .catch((error) => {
        setIsLoading(false);
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

  return (
    <>
      <div
        className={`${
          searchQuery == "" ? "my-auto" : " bg-[#1c1c1c]"
        } w-full flex justify-center p-10`}
      >
        <input
          type="search"
          className="py-1 px-2 rounded-sm 
          w-100
          outline-none
          focus:border-2
          focus:border-gray-400 active:border-gray-400"
          value={searchQuery}
          onChange={onSearch}
          placeholder="Search Movie..."
        />
      </div>
      {isLoading && <div className="loading-spinner"></div>}
      <div>
        {searchResult &&
          searchResult.map((movie) => (
            <div key={movie.imdbID} className="text-white">
              {movie.Title}
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchComp;
