import React from "react";
import { FaLink } from "react-icons/fa";
import Chapters from "./Chapters";

const MangaDetailComponent = ({ manga }) => {
  if (!manga) {
    return <p>No manga data available.</p>;
  }
  console.log(manga);
  // Destructure manga attributes
  const {
    attributes: {
      title = { en: "No title available" },
      altTitles = [],
      description = { en: "No description found" },
      status = "Unknown",
      publicationDemographic = "Unknown",
      year = "Unknown",
      tags = [],
      links = {},
      author = {},
    },
    relationships: { cover_art: { id: coverArtId } = {} } = {},
  } = manga;

  const coverUrl = manga.coverUrl || "https://via.placeholder.com/100x150";

  return (
    <>
       <div className="w-full mx-auto p-10 bg-gray-900/60  border border-slate-400/10 text-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={coverUrl}
          alt={title.en}
          className="w-72 h-[28rem] object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{title.en}</h1>
          <div className="text-lg mb-4">
            <p className="font-semibold">Description:</p>
            <p>{description.en}</p>
          </div>
        <div className="flex gap-14 justify-between">
        <div className="mb-4">
            <p className="font-semibold">Status:</p>
            <p>{status}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Publication Demographic:</p>
            <p>{publicationDemographic}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Year:</p>
            <p>{year}</p>
          </div>
          <div>
            <p className="font-semibold">Author:</p>
            <p>{author.name}</p>
          </div>
        </div>
          <div className="flex items-center space-x-4">
            {links.amz && (
              <a
                href={links.amz}
                className="flex items-center text-blue-400 hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="mr-2" />
                Amazon
              </a>
            )}
            {links.raw && (
              <a
                href={links.raw}
                className="flex items-center text-blue-400 hover:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLink className="mr-2" />
                Read Online
              </a>
            )}
            {tags.length > 0 &&
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-gray-800 text-gray-400 rounded-full px-3 py-1 text-sm font-semibold mr-2"
                >
                  {tag.attributes.name.en}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
    <div>
    <Chapters mangaId={manga.id} />
    </div>
    </>
  );
};

export default MangaDetailComponent;
