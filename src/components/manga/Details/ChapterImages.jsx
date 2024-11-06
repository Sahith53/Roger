import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const ChapterImages = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { chapterId, mangaID, mangaTitle } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChapterImages = async () => {
      try {
        const response = await axios.get(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );
        const { baseUrl, chapter } = response.data;

        if (chapter && chapter.data) {
          const qualityPath = "data";
          const urls = chapter.data.map(
            (filename) =>
              `${baseUrl}/${qualityPath}/${chapter.hash}/${filename}`
          );
          setImageUrls(urls);
        } else {
          setError("No chapter data available.");
        }
      } catch (error) {
        setError("Failed to fetch chapter images.");
        console.error("Error fetching chapter images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterImages();
  }, [chapterId]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="chapterImagesContainer w-full mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <Link to={-1} className="backBtn text-white mb-4 flex items-center">
        <IoChevronBack />
        <span className="ml-2">Back</span>
      </Link>

      <div className="imagesContainer  w-full flex flex-wrap  gap-2">
        {imageUrls.length === 0 ? (
          <p>No images found for this chapter.</p>
        ) : (
          imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Chapter page ${index + 1}`}
              className="w-full h-full object-center object-scale-down rounded"
            />
          ))
        )}
      </div>
      <div className="flex justify-center gap-14 ">
        <button 
        onClick={() => navigate(-1)}
         className="text-white mt-4 border-white/10 border px-4 py-1 hover:bg-white hover:text-black">
          Previous Chapter
        </button>
        <button 
        onClick={() => navigate(1)}
        className="text-white mt-4 border-white/10 border px-4 py-1 hover:bg-white hover:text-black">
          Next Chapter
        </button>
      </div>
    </div>
  );
};

export default ChapterImages;
