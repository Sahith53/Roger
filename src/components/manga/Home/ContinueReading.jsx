import React from 'react';
import { FaPlay } from "react-icons/fa";

const ContinueReading = () => {
  const continuewatchingmoveis = [
    {
      id: 1,
      title: "Blue Lock",
      poster: "https://img.mreadercdn.com/_m/200x300/100/67/94/6794532be44ca6b8e28ad45292b76a97/6794532be44ca6b8e28ad45292b76a97.jpg",
      rating: 7.9,
      progress: 0.2
    },
    {
      id: 2,
      title: "Bleach",
      poster: "https://img.mreadercdn.com/_m/300x400/100/8e/f1/8ef1fb0b5d5f54ffd7afbac6a4164db7/8ef1fb0b5d5f54ffd7afbac6a4164db7.jpg",
      rating: 7.9,
      progress: 0.5
    },
    {
      id: 3,
      title: "Oshi no Ko",
      poster: "https://img.mreadercdn.com/_m/300x400/100/3e/c1/3ec1028a31fa8dc8d67c4cd511b14b55/3ec1028a31fa8dc8d67c4cd511b14b55.jpg",
      rating: 7.9,
      progress: 0.9
    },
    {
      id: 4,
      title: "Boruto - Naruto Next Generations",
      poster: "https://img.mreadercdn.com/_m/300x400/100/b6/63/b663dcba3d2cc9d158f15f13fe8fb5e3/b663dcba3d2cc9d158f15f13fe8fb5e3.jpg",
      rating: 7.9,
      progress: 0.9
    },
    {
      id: 5,
      title: "Black Clover",
      poster: "https://img.mreadercdn.com/_m/300x400/100/5d/12/5d12a67a5bb3c0a2fc9ea855ac7ec07a/5d12a67a5bb3c0a2fc9ea855ac7ec07a.jpg",
      rating: 7.9,
      progress: 0.9
    },
  ]
  return (
    <>
      <div className="w-full md:w-6/12 lg:w-4/12 xl:w-3/12 overflow-y-scroll relative h-[30rem] no-scrollbar bg-gradient-to-r p-3 from-zinc-900/70 border border-zinc-600/30 to-zinc-700/30 rounded-[30px] text-white">
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

export default ContinueReading;
