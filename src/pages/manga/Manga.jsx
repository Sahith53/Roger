import React from "react";
import Carousel from "../../components/manga/Home/Carousel";
import ContinueReading from "../../components/manga/Home/ContinueReading";
import GenreCards from "../../components/GenreCards";
import TrendingCards from "../../components/Trending/TrendingCards";
import TopRatedCards from "../../components/Trending/TopRatedCards";
import TrendingManga from "../../components/manga/Home/Trending";

const Manga = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full md:flex-nowrap flex-row-reverse  flex-wrap md:h-[32rem] items-start flex md:flex-row-reverse justify-between md:py-10 gap-8 px-14">
          <ContinueReading />
          <Carousel />
        </div>
        <GenreCards />
        <TrendingManga />
        {/* <TopRatedCards /> */}
        {/* <TrendingCards /> */}
      </div>
    </>
  );
};

export default Manga;
