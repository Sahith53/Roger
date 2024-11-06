import React from "react";
import { constructPosterUrl } from "../services/Constants";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const truncateName = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };

  const truncateRating = (rating) => {
    return rating.toString().substring(0, 3);
  }
  return (
    <Link
      to={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}
      className="w-48 divide-y-8 hover:scale-105  group divide-neutral-50  flex-shrink-0 flex-col
       cursor-pointer transition-all rounded-2xl flex items-center justify-center text-white font-semibold"
    >
      <div className="w-full items-start h- flex flex-col">
        <motion.img
          src={
            `https://image.tmdb.org/t/p/original/${movie.poster_path}` ||
            "https://via.placeholder.com/150"
          }
          alt={movie.title}
          className="w-full h-80 object-cover rounded-2xl"
        />
        <div className="w-full pt-2 group-hover:tracking-wide transition-all duration-500 flex text-start px-2 text-sm">
          {truncateName(`${movie.title || movie.name}`)}
        </div>
        <div className="w-full pt-1.5 flex text-start px-2 text-xs font-extralight">
          <FaStar className="mr-2 text-yellow-400" />{" "}
          {truncateRating(`${movie.vote_average}`)} &nbsp;| &nbsp;
          {new Date(movie.release_date || movie.first_air_date).getFullYear()}
          &nbsp;
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
