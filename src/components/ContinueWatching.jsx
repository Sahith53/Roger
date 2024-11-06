import React from 'react';
import { FaPlay } from "react-icons/fa";

const ContinueWatching = () => {
  const continuewatchingmoveis = [
    {
      id: 1,
      title: "The Falcon and the Winter Soldier",
      poster: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
      rating: 7.9,
      progress: 0.2
    },
    {
      id: 2,
      title: "Dune 2",
      poster: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
      rating: 7.9,
      progress: 0.5
    },
    {
      id: 3,
      title: "Bleach",
      poster: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
      rating: 7.9,
      progress: 0.9
    },
    {
      id: 4,
      title: "Bleach",
      poster: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
      rating: 7.9,
      progress: 0.9
    },
    {
      id: 5,
      title: "Bleach",
      poster: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
      rating: 7.9,
      progress: 0.9
    },
  ]
  return (
    <>
      <div className="hidden xl:flex flex-col w-full md:w-6/12 lg:w-4/12 xl:w-3/12 overflow-y-scroll relative h-[30rem] no-scrollbar bg-gradient-to-r p-3 from-zinc-900/70 border border-zinc-600/30 to-zinc-700/30 rounded-[30px] text-white">
        <h1 className="text-white text-lg font-semibold sticky top-0 bg-transparent p-4">Continue Watching</h1>
        <div className="w-full flex items-center flex-col p-2 gap-2">

          {continuewatchingmoveis.map((movie) => (
            <div key={movie.id} className="w-full hover:bg-zinc-600/60 rounded-3xl cursor-pointer flex items-center gap-3 justify-between p-2">
              <img src={movie.poster} alt={movie.title} className="w-16 h-16 object-cover rounded-lg" />
              <div className="w-4/5 flex items-center justify-between">
                <div className='flex flex-col items-start gap-1'>
                  <h1 className="text-white text-xs font-semibold">{movie.title}</h1>
                  <h1 className="text-white/60 text-xs font-light">{movie.rating} | 2024</h1>
                </div>
                <div className="rounded-full bg-zinc-300/40">
                  <FaPlay className='p-2.5 text-3xl bg-full ' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ContinueWatching;
