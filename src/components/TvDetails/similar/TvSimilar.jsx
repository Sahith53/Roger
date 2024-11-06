import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { getSimilarTvShows } from '../../../services/TVService';


const SimilarTv = ({id}) => {
  const [trendingmovies, setTrendingMovies] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getSimilarTvShows(id);
        setTrendingMovies(response.results);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchTrendingMovies();
  }, [id]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const truncateName = (name) => {
        return name.length > 15 ? name.substring(0, 15) + '...' : name;
    };
    const truncateRating = (rating) => {
        return rating.toString().length > 3 ? rating.toString().substring(0, 3) :
            rating.toString();
    }

    return (
        <div className="w-full flex flex-col gap-3 pb-10 items-center justify-center">
            <h1 className="text-2xl font-semibold text-start w-11/12 text-white">Similar Shows</h1>
            <div className="relative w-11/12 flex items-center">
                <button
                    onClick={scrollLeft}
                    className="absolute h-full w-12 left-0 z-10 p-2 bg-transparent backdrop-blur-lg from-zinc-800/80 to-black/0 text-white focus:outline-none"
                >
                    &#9664;
                </button>
                <div
                    ref={scrollRef}
                    className="flex flex-nowrap items-start gap-5 overflow-x-scroll no-scrollbar w-full px-10"
                >
                    {trendingmovies.map((movie, index) => (
                        <Link
                            to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
                            key={index}
                            className="w-48  flex-shrink-0 flex-col cursor-pointer transition-all rounded-2xl flex items-center justify-center text-white font-semibold"
                        >
                            <div className="w-full items-start h- flex flex-col">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}` || 'https://via.placeholder.com/150'}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover rounded-2xl"
                                />
                                <div className="w-full pt-2 flex text-start px-2 text-sm">
                                    {truncateName(`${movie.title || movie.name}`)}
                                </div>
                                <div className="w-full pt-1.5 flex text-start px-2 text-xs font-extralight">
                                    <FaStar className='mr-2 text-yellow-400' /> {truncateRating(`${movie.vote_average}`)} &nbsp;| &nbsp; 
                                    {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                                     &nbsp;
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute h-full w-12 right-0 z-10 p-2 bg-gradient-to-tr backdrop-blur-md from-transparent to-transparent/0 text-white focus:outline-none"
                >
                    &#9654;
                </button>
            </div>
        </div>
    );
};

export default SimilarTv;
