import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMoviePhotos, getCast } from "../../services/MovieServices";
import MovieBackdropAndInfo from "../../components/movieDetails/MovieBackdropAndInfo";
import LoadingScreen from "../../components/movieDetails/LoadingScreen";
import TrendingCards from "../../components/Trending/TrendingCards";
import Cast from "../../components/cast/Cast";
import { FaTimes } from "react-icons/fa";
import ReactDOM from 'react-dom';
import Similar from "../../components/movieDetails/similar/Similar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      const response = await getMovieDetails(id);
      setMovieDetails(response);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await getMoviePhotos(id);
      const { logos } = response;
      const filteredLogos = logos.filter((logo) => logo.iso_639_1 === "en");
      setLogo(filteredLogos[0]?.file_path);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPeople = async () => {
    try {
      const response = await getCast(id);
      setCast(response.cast);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovieDetails();
    fetchPhotos();
    getPeople();
    console.log(cast)
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  if (loading) {
    return <LoadingScreen />;
  }

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <div className="w-full px-4 md:px-14 overflow-hidden py-6">
        <div className="w-full flex items-center justify-center">
          <MovieBackdropAndInfo
            id={movieDetails?.id}
            backdropPath={movieDetails?.backdrop_path}
            title={movieDetails?.title}
            logo={logo}
            overview={movieDetails?.overview}
            genres={movieDetails?.genres}
            isModalOpen={isModalOpen}
            runtime={movieDetails?.runtime}
            setIsModalOpen={setIsModalOpen}
            cast={cast}
            tagline={movieDetails?.tagline}
            networks={movieDetails?.networks}
          />
        </div>
        <div className="py-32">
          <Similar id={id} />
        </div>
        <div className="w-full relative flex">
          <button
            onClick={scrollLeft}
            className="absolute h-full w-12 left-0 z-10 p-2 bg-transparent backdrop-blur-lg from-zinc-800/80 to-black/0 text-white focus:outline-none"
          >
            &#9664;
          </button>
          <div ref={scrollRef} className="flex flex-nowrap items-start gap-5 overflow-x-scroll no-scrollbar w-full px-10">
            <Cast cast={cast} />
          </div>
          <button
            onClick={scrollRight}
            className="absolute h-full w-12 right-0 z-10 p-2 bg-gradient-to-tr backdrop-blur-md from-transparent to-transparent/0 text-white focus:outline-none"
          >
            &#9654;
          </button>
        </div>
      </div>
      {isModalOpen && ReactDOM.createPortal(
        <VideoModal id={id} onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

const VideoModal = ({ id, onClose }) => {
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
            src={`https://vidsrc.me/embed/movie?tmdb=${id}`}
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

export default MovieDetails;
