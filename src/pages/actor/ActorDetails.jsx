import React, { useState, useEffect } from "react";
import {
  getPersonDetails,
  getPersonMovies,
  getPersonTVShows,
  getPersonImages,
} from "../../services/MovieServices";
import { Link, useParams } from "react-router-dom";

const ActorDetails = () => {
  const { id } = useParams();
  const [actorDetails, setActorDetails] = useState({});
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [showFullBio, setShowFullBio] = useState(false);

  const fetchActorDetails = async () => {
    try {
      const response = await getPersonDetails(id);
      setActorDetails(response);
    } catch (error) {
      console.log("Error fetching actor details:", error);
    }
  };

  const fetchActorMovies = async () => {
    try {
      const response = await getPersonMovies(id);
      setMovies(response.cast);
    } catch (error) {
      console.log("Error fetching actor movies:", error);
    }
  };

  const fetchActorTVShows = async () => {
    try {
      const response = await getPersonTVShows(id);
      setTVShows(response.cast);
    } catch (error) {
      console.log("Error fetching actor TV shows:", error);
    }
  };

  const fetchActorImages = async () => {
    try {
      const response = await getPersonImages(id);
      setImages(response.profiles);
    } catch (error) {
      console.log("Error fetching actor images:", error);
    }
  };

  useEffect(() => {
    fetchActorDetails();
    fetchActorMovies();
    fetchActorTVShows();
    fetchActorImages();
  }, [id]);


  const renderTabContent = () => {
    switch (activeTab) {
      case "movies":
        return (
          <div className="flex flex-wrap gap-6">
            {movies.length ? (
              movies.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                >
                  <img
                    // src={`https://image.tmdb.org/t/p/w500${movie.poster_path}` || "https://www.wsupercars.com/thumbnails-phone/Endurance-Racing/2023-Porsche-963-LMDh-006.jpg" }
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://www.wsupercars.com/thumbnails-phone/Endurance-Racing/2023-Porsche-963-LMDh-006.jpg"
                    }
                    alt={movie.title}
                    className="w-full h72 object-contain rounded-lg shadow-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                  <p className="text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-white">No movies found.</p>
            )}
          </div>
        );
      case "tvshows":
        return (
          <div className="flex flex-wrap gap-6">
            {tvShows.length ? (
              tvShows.map((show) => (
                <Link
                  to={`/tv/${show.id}`}
                  key={show.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="w-full object-cover rounded-lg shadow-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{show.name}</h3>
                  <p className="text-gray-300">
                    {new Date(show.first_air_date).getFullYear()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-white">No TV shows found.</p>
            )}
          </div>
        );
      case "gallery":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.length ? (
              images.map((image) => (
                <img
                  key={image.file_path}
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt="Gallery"
                  className="w-full border-2 border-white/40 object-cover rounded-lg shadow-lg"
                />
              ))
            ) : (
              <p className="text-white">No images found.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto px-14 py-8 text-white">
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-8 bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
            alt={actorDetails.name}
            className="object-cover rounded-xl h-96 border border-white/40 border-opacity-30 shadow-lg"
          />
          <h1 className="text-4xl font-bold mt-4">{actorDetails.name}</h1>
        </div>
        <div className="w-full lg:w-2/3">
          <p className="text-gray-300 text-lg mt-2">
            {showFullBio
              ? actorDetails.biography
              : `${actorDetails.biography?.slice(0, 900)}...`}
            {actorDetails.biography?.length > 900 && (
              <button
                className="text-blue-400 ml-1"
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? "See Less" : "See More"}
              </button>
            )}
          </p>
          <div className="mt-4 text-gray-400">
            <p>
              <strong>Birthday:</strong>{" "}
              {new Date(actorDetails.birthday).toLocaleDateString()}
            </p>
            <p>
              <strong>Place of Birth:</strong> {actorDetails.place_of_birth}
            </p>
            <p>
              <strong>Known For:</strong> {actorDetails.known_for_department}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <div className="flex space-x-4 mb-4 border-b border-gray-700">
          <button
            className={`py-2 px-4 font-semibold rounded-t-lg ${
              activeTab === "movies"
                ? "bg-blue-100 text-black "
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-t-lg ${
              activeTab === "tvshows"
                ? "bg-blue-100 text-black"
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setActiveTab("tvshows")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-t-lg ${
              activeTab === "gallery"
                ? "bg-blue-100 text-black"
                : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ActorDetails;
