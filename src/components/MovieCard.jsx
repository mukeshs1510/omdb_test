import React, { useState } from "react";
import HeartSvg from "../../assets/heart.png";
import HeartFilledSvg from "../../assets/heart_red.png";

const MovieCard = (props) => {
  const [isFavIc, setIsFavIc] = useState(HeartSvg);

  const markFavorite = () => {
    console.log(props.id);
    const isFav = isFavIc == HeartFilledSvg ? HeartSvg : HeartFilledSvg;
    setIsFavIc(isFav);
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
        className="-max-h-[50px] my-auto ml-auto mr-4"
        src={isFavIc}
        width={50}
        alt="Favorite"
        onClick={markFavorite}
      />
    </div>
  );
};

export default MovieCard;
