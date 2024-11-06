import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/details/MovieDetails";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/search/SearchPage";
import TvDetails from "./pages/TvDetails/TvDetails";
import ActorDetails from "./pages/actor/ActorDetails";
import MoviesByGenre from "./pages/genre/MoviesByGenre";
import Stats from "./pages/stats/Stats";
import { Toaster , toast } from "sonner";
import Manga from "./pages/manga/Manga";
import MangaInfo from "./pages/manga/MangaInfo";
import Read from "./pages/manga/Read";

const App = () => {
  return (
    <>
      <div className="glassbg"></div>
      <div className="flex flex-col w-full items-start justify-center backdrop-blur-lg h-full">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/genre/:genre_id" element={<MoviesByGenre />} />
          <Route path="/person/:id" element={<ActorDetails />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/manga/:id" element={<MangaInfo />} />
          <Route path="/manga/:id/chapter/:chapterId" element={<Read />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
};

export default App;
