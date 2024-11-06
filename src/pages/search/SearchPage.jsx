import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchMovies, searchTVShows, searchPeople, getMoviePhotos, getGenres } from '../../services/MovieServices';

const SearchPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    actor: '',
    type: 'all' // 'all', 'movie', 'tv', 'person'
  });

  const fetchResults = async () => {
    try {
      const [moviesResponse, tvShowsResponse, peopleResponse] = await Promise.all([
        searchMovies(query),
        searchTVShows(query),
        searchPeople(query)
      ]);

      const combinedResults = [
        ...moviesResponse.results.map(movie => ({ ...movie, type: 'movie' })),
        ...tvShowsResponse.results.map(tv => ({ ...tv, type: 'tv' })),
        ...peopleResponse.results.map(person => ({ ...person, type: 'person' }))
      ];

      const resultsWithPhotos = await Promise.all(combinedResults.map(async item => {
        try {
          const photoResponse = await getMoviePhotos(item.id);
          const photoUrl = photoResponse.backdrops[0]?.file_path || item.backdrop_path || item.profile_path;
          return { ...item, photoUrl };
        } catch (error) {
          console.error('Error fetching photos:', error);
          return { ...item, photoUrl: item.poster_path || item.backdrop_path || item.profile_path };
        }
      }));

      resultsWithPhotos.sort((a, b) => b.vote_average - a.vote_average);
      setResults(resultsWithPhotos);
      setFilteredResults(resultsWithPhotos);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
    fetchResults();
  }, [query]);

  useEffect(() => {
    const applyFilters = () => {
      let resultsToFilter = [...results];

      if (filters.type !== 'all') {
        resultsToFilter = resultsToFilter.filter(item => item.type === filters.type);
      }

      if (filters.year) {
        resultsToFilter = resultsToFilter.filter(item => {
          const releaseYear = new Date(item.release_date || item.first_air_date).getFullYear();
          return releaseYear === parseInt(filters.year);
        });
      }

      if (filters.genre) {
        resultsToFilter = resultsToFilter.filter(item => item.genre_ids.includes(parseInt(filters.genre)));
      }

      if (filters.actor) {
        resultsToFilter = resultsToFilter.filter(item => item.type === 'person' && item.name.toLowerCase().includes(filters.actor.toLowerCase()));
      }

      setFilteredResults(resultsToFilter);
    };

    applyFilters();
  }, [results, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-3xl font-bold text-center pt-4 pb-8 text-white">
        Search Results for "{query}"
      </h1>
      <div className="flex flex-col w-full px-4 mb-4">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 rounded-lg"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
            <option value="person">People</option>
          </select>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
            className="p-2 rounded-lg"
          />
          <select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            className="p-2 rounded-lg"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
          <input
            type="text"
            name="actor"
            placeholder="Actor"
            value={filters.actor}
            onChange={handleFilterChange}
            className="p-2 rounded-lg"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-8 p-4 justify-around">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => (
            <Link
              to={`/${item.type === 'movie' ? 'movie' : item.type === 'tv' ? 'tv' : 'person'}/${item.id}`}
              key={index}
              className="w-[70%] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-[40%] flex-shrink-0 gap-3 cursor-pointer transition-all rounded-2xl flex flex-row items-start justify-center text-white font-semibold"
            >
              <img
                src={
                  item.photoUrl
                    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                    : 'https://wallpapers.com/images/featured/4k-laptop-car-tchphr7vwuc9w59w.jpg'
                }
                alt={item.title || item.name}
                className="w-full h-56 object-cover rounded-2xl"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="w-full pt-2 flex text-start px-2 text-md md:text-xl">
                  {item.title || item.name}
                </div>
                <div className="w-full pt-1.5 flex text-start px-2 text-xs font-extralight">
                  {item.vote_average} &nbsp;| &nbsp; {new Date(item.release_date || item.first_air_date).getFullYear()} &nbsp;
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
