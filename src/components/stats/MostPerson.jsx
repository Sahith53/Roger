import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { getPersonDetails } from '../../services/MovieServices'; // Adjust the import path
import { getPopularPeople } from '../../services/stats';

const MostPerson = () => {
  const [popularPeople, setPopularPeople] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTopPeople = async () => {
      try {
        // Fetch top 10 people from Firebase
        const topPeople = await getPopularPeople();
        
        // Fetch details for each person
        const peopleWithDetails = await Promise.all(topPeople.map(async (person) => {
          const details = await getPersonDetails(person.id);
          return { ...person, ...details };
        }));
        
        setPopularPeople(peopleWithDetails);
      } catch (error) {
        console.log("Error fetching popular people:", error);
      }
    };
    fetchTopPeople();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-10 items-center justify-center">
      <h1 className="text-2xl font-semibold text-start w-11/12 text-white">
        Top Actors
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
          {popularPeople?.map((person, index) => (
            <Link
              to={`/person/${person.id}`} // Adjust the route as necessary
              key={index}
              className="w-48 flex-shrink-0 flex-col cursor-pointer transition-all rounded-2xl flex items-center justify-center text-white font-semibold"
            >
              <div className="w-full items-start flex flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/original/${person.profile_path}` || 'https://via.placeholder.com/150'}
                  alt={person.name}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="w-full pt-2 flex text-start px-2 text-sm">
                  {truncateName(person.name)}
                </div>
                <div className="w-full pt-1.5 flex text-start px-2 text-xs font-extralight">
                  Titles: {person.count}
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

export default MostPerson;
