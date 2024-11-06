import React, { useEffect, useState } from "react";
import { Search, Shuffle } from "lucide-react";
import Avatar from "boring-avatars";
import { SlArrowDown } from "react-icons/sl";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, provider } from "../lib/appwrite/config";
import { signInWithPopup } from "firebase/auth";
import { getUserWatchlist } from "../services/apiService";
import { getRandomMovie } from "../services/MovieServices";

const NavbarLink = ({ name, url, onClick }) => {
  const { pathname } = useLocation();
  return (
    <Link to={url} onClick={onClick}>
      <h1
        className={`py-2 px-4 text-sm tracking-wide rounded-full ${
          pathname === url ? "bg-zinc-300/40 text-white" : "text-zinc-50"
        }`}
      >
        {name}
      </h1>
    </Link>
  );
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const [user, setUser] = useState(null);
  const loginwithgoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user);
      localStorage.setItem("ui", JSON.stringify(data.user));
      localStorage.setItem("user", JSON.stringify(data.user.email));
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("ui");
    if (user) {
      setUser(JSON.parse(user));
      getUserWatchlist();
    }
  }, []);

  const links = [
    { name: "Movies", url: "/movies" },
    { name: "Series", url: "/series" },
    { name: "Manga", url: "/manga" },
    { name: "God Stuff", url: "/GodStuff" },
    { name: "Stats", url: "/stats" },
  ];

  const gotoRandom = async () => {
    const movie = await getRandomMovie();
    navigate(`/movie/${movie}`);
  };

  return (
    <div className="w-full sticky top-0 bg-transparent backdrop-blur-md z-50 flex flex-col md:flex-row items-center justify-between p-4">
      <form
        onSubmit={handleSearch}
        className="w-full md:w-auto flex items-center border bg-zinc-700/80 text-zinc-50 border-zinc-300/30 backdrop-blur-sm shadow group py-2 focus:ring-2 rounded-full gap-2 px-4 mx-10 mb-4 md:mb-0"
      >
        <Search />
        <input
          type="text"
          className="bg-transparent text-sm focus:outline-none w-full md:w-auto"
          placeholder="Search anything"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="hidden xl:flex flex-wrap gap-2 md:gap-4 text-zinc-200 items-center font-semibold justify-center">
        {links.map((link, index) => (
          <NavbarLink key={index} name={link.name} url={link.url} />
        ))}
      </div>
      <div className="flex items-center justify-between lg:w-[30%] w-full gap-3 mt-4 md:mt-0">
        <div className="flex items-center gap-3">
          <div onClick={gotoRandom} className="relative cursor-pointer">
            <div
              onClick={gotoRandom}
              className="bg-zinc-700/80 border flex gap-2 items-center px-6 p-2.5 text-zinc-300 border-zinc-500 text-xl rounded-full"
            >
              <p className="text-sm">Random</p>
              <Shuffle className="w-6 h-6" />
            </div>
          </div>
          <div
            onClick={loginwithgoogle}
            className="flex items-center cursor-pointer bg-zinc-700/80 border text-zinc-200 border-zinc-600 rounded-full gap-2 px-5 py-2"
          >
            <Avatar size={30} name="Bankai" variant="beam" />
            <div className="flex items-start flex-col">
              <h1 className="font-semibold text-sm">{`Bankai`}</h1>
            </div>
            <SlArrowDown className="ml-4 text-sm" />
          </div>
        </div>

        <div className="lg:hidden flex items-center justify-between w-">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-white" />
            ) : (
              <FaBars className="text-white" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="flex flex-col items-center justify-center w-full bg-zinc-700/80 text-zinc-50 rounded-lg overflow-hidden md:hidden"
          >
            {links.map((link, index) => (
              <NavbarLink
                key={index}
                name={link.name}
                url={link.url}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
