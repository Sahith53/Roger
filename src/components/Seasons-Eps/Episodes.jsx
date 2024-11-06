import React, { useState, useEffect } from "react";
import { getTvEpisodes } from "../../services/TVService";
import { useParams } from "react-router-dom";
import { FaClock, FaStar, FaPlay, FaTimes } from "react-icons/fa";
import ReactDOM from 'react-dom';

const Episodes = ({ season }) => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const getEpisodes = async () => {
    try {
      const response = await getTvEpisodes(id, season.season_number);
      setEpisodes(response.episodes);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [season, id]);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEpisode(null);
  };

  return (
    <>
      <div className="w-full px-6 py-4">
        <div className="flex overflow-x-auto gap-6 no-scrollbar">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="relative cursor-pointer bg-gray-800/20 border border-white/10 rounded-lg p-4 w-64 flex-shrink-0 group"
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={episode.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/20">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <h1 className="text-white text-lg font-bold mb-2">
                {episode.name.length > 20
                  ? `${episode.name.slice(0, 20)}...`
                  : episode.name}
              </h1>
              <p className="text-gray-400 text-sm mb-2">
                {episode.overview.length > 100
                  ? `${episode.overview.slice(0, 100)}...`
                  : episode.overview}
              </p>
              <div className="flex items-center text-gray-300 text-xs">
                <div className="flex items-center mr-4">
                  <FaClock className="mr-1" /> {episode.runtime} min
                </div>
                <div className="flex items-center">
                  <FaStar className="mr-1" /> {episode.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedEpisode && ReactDOM.createPortal(
        <VideoModal episode={selectedEpisode} onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

const VideoModal = ({ episode, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-zinc-500/30 py-6 px-6 rounded-3xl overflow-hidden shadow-xl w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 text-black p-2 bg-zinc-200 rounded-full focus:outline-none"
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
            src={`https://vidsrc.me/embed/tv?tmdb=${episode.show_id}&season=${episode.season_number}&episode=${episode.episode_number}`}
            title={episode.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
