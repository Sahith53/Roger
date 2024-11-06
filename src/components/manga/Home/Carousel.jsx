import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const mangaData = [
  {
    id: 1,
    title: "One Piece",
    description:
      "Gol D. Roger, a man referred to as the 'Pirate King,' is set to be executed by the World Government...",
    imgUrl: "https://i.redd.it/z6btu437zgi91.jpg",
    categories: ["Action", "Adventure"],
  },
  {
    id: 2,
    title: "Bleach",
    description:
      "Ichigo Kurosaki, a teenager with the ability to see ghosts, becomes a Soul Reaper tasked with defending humans...",
    imgUrl: "https://wallpapercave.com/wp/wp9064731.png",
    categories: ["Action", "Supernatural"],
  },
  {
    id: 3,
    title: "Demon Slayer",
    description:
      "Tanjiro Kamado becomes a demon slayer to avenge his family and cure his demon-turned sister...",
    imgUrl: "https://wallpapercave.com/wp/wp9899754.jpg",
    categories: ["Action", "Fantasy"],
  },
  // Add more manga objects as needed
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const intervalRef = React.useRef();

  useEffect(() => {
    const changeImage = () => {
      controls.start({ opacity: 0, x: -100 }).then(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mangaData.length);
        controls.start({ opacity: 1, x: 0 });
      });
    };

    intervalRef.current = setInterval(changeImage, 15000);

    return () => clearInterval(intervalRef.current);
  }, [controls]);

  useEffect(() => {
    // Set loading to false when image is loaded
    const handleImageLoad = () => setLoading(false);
    const image = new Image();
    image.src = mangaData[currentIndex].imgUrl;
    image.onload = handleImageLoad;

    return () => {
      image.onload = null; // Cleanup
    };
  }, [currentIndex]);



  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mangaData.length) % mangaData.length
    );
    controls
      .start({ opacity: 0, x: -100 })
      .then(() => controls.start({ opacity: 1, x: 0 }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mangaData.length);
    controls
      .start({ opacity: 0, x: 100 })
      .then(() => controls.start({ opacity: 1, x: 0 }));

    };

    useEffect(() => {
      handleNext();
    }, []);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);



  const { title, description, imgUrl, categories } = mangaData[currentIndex];

  return (
    <div className="w-full lg:w-9/12 flex items-center justify-center">
      <div className="flex w-full items-center rounded-[30px] relative h-[20rem] md:h-[25rem] lg:h-[30rem] shadow-lg">
        {!loading && (
          <motion.img
            src={imgUrl}
            alt={title}
            className="h-full rounded-3xl w-full object-cover"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className="absolute w-full h-full bg-gradient-to-tr p-4 md:p-10 justify-between flex px-5 md:px-12 flex-col items-start from-black to-gray-900/10 rounded-3xl">
          <span className="bg-gray-600/10 border border-gray-500 text-white py-1 rounded-full backdrop-blur-lg px-3 text-xs md:text-sm">
            🔥 Now Trending
          </span>
          <div className="w-full flex flex-col md:flex-row items-end justify-between">
            <div className="flex items-start flex-col w-full md:w-1/2 gap-2">
              <div className="flex text-xs md:text-sm items-center gap-3">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-gray-800/50 border border-gray-700 text-white py-1 rounded-full backdrop-blur-lg px-3 md:px-5"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-xl md:text-3xl lg:text-6xl py-2 font-semibold w-full text-white">
                {title}
              </h1>
              <p className="text-xs md:text-sm text-zinc-200">{description}</p>
              <div className="flex items-center gap-3 pt-3">
                <button className="bg-white flex items-center gap-2 text-black py-2 px-4 md:py-4 md:px-7 border text-xs md:text-sm font-semibold rounded-full">
                  <FaPlay className="text-xs md:text-sm" />
                  Read Now
                </button>
                <button className="bg-black/10 backdrop-blur-sm text-white border border-white py-2 px-4 md:py-4 md:px-7 text-xs md:text-sm rounded-full flex gap-2 items-center">
                  <IoAddOutline className="text-lg md:text-xl" />
                  Add to List
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-end gap-2 justify-end">
              <button
                onClick={handlePrev}
                className="bg-black/20 backdrop-blur-2xl text-zinc-200 p-2 md:p-3 text-lg md:text-xl rounded-full"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-black/20 backdrop-blur-2xl text-zinc-200 p-2 md:p-3 text-lg md:text-xl rounded-full"
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
