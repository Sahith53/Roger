import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieBackdropAndInfo from "../../components/movieDetails/MovieBackdropAndInfo";
import LoadingScreen from "../../components/movieDetails/LoadingScreen";
import TrendingCards from "../../components/Trending/TrendingCards";
import { getTvDetails, getTvPhotos, getTvCast } from "../../services/TVService";
import Cast from "../../components/cast/Cast";
import Seasons from "../../components/Seasons-Eps/Seasons";
import SimilarTv from "../../components/TvDetails/similar/TvSimilar";

const TvDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [logo, setLogo] = useState("");
  const [backdrops, setBackdrops] = useState([]);
  const [currentBackdrop, setCurrentBackdrop] = useState("");
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const fetchMovieDetails = async () => {
    try {
      const response = await getTvDetails(id);
      setMovieDetails(response);
      setLoading(false);
      setSeasons(response.seasons);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await getTvPhotos(id);
      const { logos, backdrops } = response;
  
      const filteredLogos = logos.filter((logo) => logo.iso_639_1 === "en");
      setLogo(filteredLogos[0]?.file_path);
  
      const sortedBackdrops = backdrops.sort((a, b) => b.vote_average - a.vote_average).slice(0, 7);
      setBackdrops(sortedBackdrops);
      setCurrentBackdrop(sortedBackdrops[0]?.file_path);
    } catch (error) {
      console.log("error", error);
    }
  };
  

  const fetchCast = async () => {
    try {
      const response = await getTvCast(id);
      setCast(response.cast);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchPhotos();
    fetchCast();
  }, [id]);

  useEffect(() => {
    let backdropIndex = 0;

    if (backdrops.length > 0) {
      const intervalId = setInterval(() => {
        backdropIndex = (backdropIndex + 1) % backdrops.length;
        setCurrentBackdrop(backdrops[backdropIndex]?.file_path);
      }, 7000);

      return () => clearInterval(intervalId); 
    }
  }, [backdrops]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full px-4 md:px-14 overflow-hidden py-6">
      <div className="w-full flex items-center justify-center">
        <MovieBackdropAndInfo
          backdropPath={currentBackdrop}
          title={movieDetails?.title}
          logo={logo}
          overview={movieDetails?.overview}
          genres={movieDetails?.genres}
          watchTime={movieDetails?.runtime}
          tagline={movieDetails?.tagline}
          networks={movieDetails?.networks}                                     
          runtime = {movieDetails?.episode_run_time[0] * movieDetails?.number_of_episodes || 49 * movieDetails?.number_of_episodes}
        />
      </div>
      <div className="pt-32">
        <Seasons seasons={seasons} />
      </div>
      <div className="py-32">
        <SimilarTv id={id} />
      </div>
      <div>
        <Cast cast={cast} />
      </div>
    </div>
  );
};

export default TvDetails;