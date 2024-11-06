import React, { useState, useEffect } from "react";
import { FaPlay, FaTimes, FaCheck } from "react-icons/fa";
import { IoAddOutline, IoCheckmarkOutline } from "react-icons/io5";
import { constructPosterUrl } from "../../services/Constants";
import { motion } from "framer-motion";
import { saveToWatchlist } from "../../services/apiService";
import { addToWatchedList as markAsWatched } from "../../services/stats";
import { useParams, useLocation } from "react-router-dom";

const MovieBackdropAndInfo = ({
  backdropPath,
  id,
  title,
  runtime,
  logo,
  cast,
  overview,
  genres,
  isModalOpen,
  setIsModalOpen,
  tagline,
  networks,
}) => {
  const [isWatched, setIsWatched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfWatched = async () => {
      // Replace with your own function to check if the item is marked as watched
      const watched = await checkWatchedStatus(id);
      setIsWatched(watched);
    };

    checkIfWatched();
    setLoading(false);
  }, [id]);

  const handleWatchNowClick = () => {
    setIsModalOpen(true);
  };

  const { id: movieId } = useParams();
  const location = useLocation();

  const addToWatchlist = () => {
    console.log("Adding to watchlist");
    console.log(movieId);
    let pt = location.pathname.includes("movie") ? "movie" : "tv";
    saveToWatchlist(pt, movieId);
  };

  const toggleWatchedStatus = async () => {
    let pt = location.pathname.includes("movie") ? "movie" : "tv";
    await markAsWatched(pt, movieId, runtime, cast , genres);
    setIsWatched(!isWatched);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex w-full items-center rounded-[30px] relative h-[38rem] shadow-lg">
      {loading ? (
        <div className="animate-pulse w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-full bg-gray-700 rounded-3xl"></div>
          <div className="absolute w-full h-full bg-gradient-to-tr p-16 justify-end flex px-14 flex-col items-start from-black to-gray-900/20 rounded-3xl">
            <div className="w-full flex items-end justify-between">
              <div className="flex items-start flex-col w-1/2 gap-2">
                <div className="w-96 h-24 bg-gray-500 rounded-md"></div>
                <div className="w-full h-6 bg-gray-500 rounded-md"></div>
                <div className="w-full h-4 bg-gray-500 rounded-md"></div>
                <div className="flex text-sm items-center gap-3">
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                  <div className="w-24 h-4 bg-gray-500 rounded-md"></div>
                </div>
                <div className="flex items-center gap-3 pt-3">
                  <div className="w-32 h-10 bg-gray-500 rounded-md"></div>
                  <div className="w-32 h-10 bg-gray-500 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <motion.img
            initial={{ opacity: 0 , x: 100 , skewY: 10 }}
            animate={{ opacity: 1 , x: 0  , skewY: 0 }}
            src={constructPosterUrl(backdropPath) || "/spiderman.jpg"}
            alt={title || "Movie Poster"}
            className="h-full rounded-3xl w-full object-cover object-top"
          />
          <div className="absolute w-full h-full bg-gradient-to-tr p-4 md:p-16 justify-end flex md:px-14 flex-col items-start from-black to-gray-900/20 rounded-3xl">
            <div className="w-full flex items-end justify-between">
              <div className="flex items-start flex-col w-full lg:w-1/2 gap-2">
                {logo ? (
                  <motion.img
                    initial={{ opacity: 0 , x: -100 }}
                    animate={{ opacity: 1 , x: 0 }}
                    src={constructPosterUrl(logo) || "/spiderman.jpg"}
                    alt={title || "Movie Logo"}
                    className="py-10 w-52 lg:w-96 h-auto ease-in-out overflow-hidden object-contain"
                  />
                ) : (
                  <h1 className="md:text-4xl lg:text-6xl md:py-2 font-bold text-white">
                    {title}
                  </h1>
                )}
                <motion.h1
                  initial={{ opacity: 0 , y: -100 }}
                  animate={{ opacity: 1 , y: 0 }}
                  transition={{ delay: 0.2 }}
                 className="text-sm md:text-xl text-white/80 font-semibold">
                  {tagline || ""} 
                </motion.h1>
                <p className="hidden lg:flex text-sm text-zinc-200">
                  {overview?.length > 200
                    ? `${overview.slice(0, 200)}...`
                    : overview}
                </p>
                <div className="flex text-sm items-center gap-3">
                  {genres &&
                    genres.map((genre, index) => (
                      <span
                        key={index}
                        className="border-gray-700 text-white py-1 rounded-full backdrop-blur-lg"
                      >
                        {genre.name} &nbsp; |
                      </span>
                    ))}
                </div>
                <div className="flex flex- lg:flex-row items-center gap-3 pt-3">
                  <button
                    onClick={handleWatchNowClick}
                    className="bg-white flex items-center gap-2 text-black py-4 px-7 border text-sm font-semibold rounded-full"
                  >
                    <FaPlay className="text-sm" />
                    Watch Now
                  </button>
                  <div className="relative">
                    <button
                      onClick={handleDropdownToggle}
                      className="bg-black/10 backdrop-blur-sm text-white border border-white py-4 px-7 text-sm rounded-full flex gap-2 items-center"
                    >
                      {isWatched ? (
                        <FaCheck className="text-xl" />
                      ) : (
                        <IoCheckmarkOutline className="text-xl" />
                      )}
                      {isWatched ? "Watched" : "Add to List"}
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-black/70 text-white rounded-lg shadow-lg w-48">
                        <button
                          onClick={addToWatchlist}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                        >
                          Add to Watchlist
                        </button>
                        <button
                          onClick={toggleWatchedStatus}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                        >
                          {isWatched
                            ? "Remove from Watched"
                            : "Mark as Watched"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {isModalOpen && <VideoModal id={id} onClose={handleCloseModal} />} */}
      
    </div>
  );
};

const VideoModal = ({ id, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white p-2 bg-gray-800 rounded-full focus:outline-none"
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://vidsrc.to/embed/movie/${id}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieBackdropAndInfo;
