import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getCover, getTopManga } from "../../../services/MangaService"; // Adjust the import path as necessary

const TrendingManga = () => {
  const [mangaData, setMangaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const data = await getTopManga();
        setMangaData(data);
      } catch (err) {
        console.error("Error fetching manga data:", err);
        setError("Failed to load manga data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + "..." : name;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 pb-10 items-center justify-center">
      <h1 className="text-2xl font-semibold text-start w-11/12 text-white">
        Top Trending Manga
      </h1>
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
          {mangaData?.map((manga) => (
            <Link
              to={`/manga/${manga.id}`}
              key={manga.id}
              className="w-48 flex-shrink-0 flex-col cursor-pointer transition-all rounded-2xl flex items-center justify-center text-white font-semibold"
            >
              <img
                src={manga.coverUrl || "https://via.placeholder.com/150"}
                alt={manga.name}
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="w-full pt-2 flex text-start px-2 text-sm">
                {truncateName(manga.name)}
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

export default TrendingManga;
