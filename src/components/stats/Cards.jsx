import React from "react";
import {
  FaFilm,
  FaTv,
  FaClock,
  FaStar,
  FaUserAlt,
  FaUserAlt as FaDirector,
} from "react-icons/fa";

const Cards = ({ stats }) => {
  const data = [
    {
      title: "Movies",
      value: stats.movieCount || 0,
      icon: <FaFilm className="text-4xl text-white" />,
    },
    {
      title: "TV Shows",
      value: stats.tvShowCount || 0,
      icon: <FaTv className="text-4xl text-white" />,
    },
    {
      title: "Total Hours",
      value: Math.round((stats.totalWatchTime || 0) / 60), // Round to nearest whole number
      icon: <FaClock className="text-4xl text-white" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-14 justify-center w-full p-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white/20 backdrop-blur-sm w-56 border border-white/20 hover:border-white/50 p-6 rounded-2xl 
          flex flex-col items-center shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="mb-4">{item.icon}</div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {item.title}
          </h2>
          <p className="text-2xl font-bold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
