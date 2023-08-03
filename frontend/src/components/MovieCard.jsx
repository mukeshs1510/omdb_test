import React, { useState } from "react";
import HeartSvg from "../../assets/heart.png";
import HeartFilledSvg from "../../assets/heart_red.png";
import axios from "axios";

const MovieCard = (props) => {
  const [isFavIc, setIsFavIc] = useState(props.fav ? HeartFilledSvg : HeartSvg);
  const [isLoading, setIsLoading] = useState(false);

  const markFavorite = async () => {
    // console.log(props.id);
    setIsLoading(true);
    const isFav = isFavIc == HeartFilledSvg ? HeartSvg : HeartFilledSvg;
    await axios
      .post(`apis/movies/favorite/${props.id}`)
      .then((res) => {
        // setIsLoading(false);
        console.log(res.data);
        // if (res.data.success == 'success') {
        //   setSearchResult([]);
        //   setErrorMsg(res.data.data.Error);
        // } else {
        //   setSearchResult(res.data.data.Search);
        //   setTotalResults(+res.data.data.totalResults);
        // }
        // console.log(res.data.data.Error);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    setIsFavIc(isFav);
    setIsLoading(false);
  };

  return (
    <div className="my-5 mx-8 w-100 flex rounded-lg shadow-md">
      {props.img == "N/A" || (
        <img
          src={props.img}
          className="max-h-[200px] overflow-hidden rounded-l-lg"
        />
      )}
      <div className="lg:border-l-0 lg:border-t lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-center leading-normal">
        <div className="text-gray-900 font-bold text-xl mb-2">
          {props.title}
        </div>
        <p className="text-gray-700 text-base">{props.year}</p>
      </div>
      <img
        className="max-h-[50px] my-auto ml-auto mr-4"
        src={isFavIc}
        width={50}
        alt="Favorite"
        onClick={() => isLoading == false && markFavorite()}
      />
    </div>
  );
};

export default MovieCard;
