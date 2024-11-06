import React from "react";
import { Link } from "react-router-dom";

const Cast = ({ cast }) => {
  const castList = cast.map((actor) => (
    <Link 
      to={`/person/${actor.id}`} 
    key={actor.id} className="flex flex-col items-center gap-2 p-4 bg-gray-800/20 rounded-lg shadow-md min-w-[150px]">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : "https://preview.redd.it/is-there-a-lore-reason-why-muzan-didnt-just-immediately-v0-y4jfj06dlwic1.jpeg?auto=webp&s=159fa8aced24b21d19486fc23eb072e5f2f66e79"
        }
        alt={actor.name}
        className="w-32 h-32 rounded-full object-cover"
      />
      <p className="text-white text-sm font-semibold text-center">{actor.name}</p>
      <p className="text-gray-400 text-xs text-center">{actor.character}</p>
    </Link>
  ));

  return (
    <div className="w-full px-4">
      <h1 className="text-white text-3xl font-bold mb-6">Cast</h1>
      <div className="flex gap-4 overflow-x-scroll py-6 no-scrollbar">
        {castList}
      </div>
    </div>
  );
};

export default Cast;
