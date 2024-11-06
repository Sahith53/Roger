import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ContinueWatching from '../components/ContinueWatching';
import GenreCards from '../components/GenreCards';
import TrendingCards from '../components/Trending/TrendingCards';
import TopRatedCards from '../components/Trending/TopRatedCards';
import PopularPeopleCards from '../components/people/PopularPeopleCards';

const Home = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className="w-full md:flex-nowrap flex-row-reverse  flex-wrap md:h-[32rem] items-start flex md:flex-row-reverse justify-between md:py-10 gap-8 px-4">
          <ContinueWatching />
          <Carousel />
        </div>
        <GenreCards />
        <TrendingCards />
        <TopRatedCards />
        <PopularPeopleCards />
      </div>
    </>
  )
}

export default Home