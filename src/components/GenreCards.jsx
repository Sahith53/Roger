import React from "react";
import { Link } from "react-router-dom";

const GenreCards = () => {
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 9648, name: "Mystery" },
    { id: 80, name: "Crime" },
    { id: 10751, name: "Family" },
    { id: 99, name: "Documentary" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 37, name: "Western" },
    { id: 10752, name: "War" },
    { id: 16, name: "Animation" },
    { id: 53, name: "Thriller" },
    { id: 12, name: "Adventure" },
    { id: 878, name: "Sci-Fi" },
    { id: 35, name: "Comedy" },
    { id: 10402, name: "Music" },
    { id: 10770, name: "TV Movie" },
  ];
  return (
    <>
      <div className="w-full items-center flex justify-center py-10">
        <div className="w-11/12 h-20 flex items-center gap-3 overflow-x-scroll no-scrollbar">
          {genres.map((genre, index) => (
            <Link
              to={`/genre/${genre.id}`}
              key={index}
              className="w-3/5 h-14 px-6 bg-gray-900/30 hover:bg-gray-900/60 cursor-pointer 
                        transition-all hover:scale-105 rounded-2xl flex items-center justify-center
                        border border-gray-50/10
                         text-white font-semibold"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GenreCards;
