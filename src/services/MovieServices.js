import axios from "axios";
import { api_key } from "./Constants";

const API_KEY = api_key
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`
  );
  return response.data;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
  );
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`
  );
  return response.data;
};

export const getMoviePhotos = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${api_key}`
  );
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`);
  return response.data;
};

export const searchTVShows = async (query) => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`);
  return response.data;
};

export const searchPeople = async (query) => {
  const response = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=${api_key}&query=${query}`);
  return response.data;
};


export const getGenres = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
  return response.data;
};

export const getCast = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`
  );
  return response.data;
};
export const getMoviesByGenre = async (genre_id , page) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre_id}&page=${page}`
  );
  return response.data;
};

export const getSimilarMovies = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}`
  );
  return response.data;
};



//person 

export const getPersonDetails = async (personId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${api_key}&language=en-US`);
  return response.data;
};

export const getPersonMovies = async (personId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${api_key}&language=en-US`);
  return response.data;
};

export const getPersonTVShows = async (personId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/tv_credits?api_key=${api_key}&language=en-US`);
  return response.data;
};

export const getPersonImages = async (personId) => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}/images?api_key=${api_key}`);
  return response.data;
};


export const getRandomMovie = async () => {
  try {
    // The maximum number of pages the API supports is 500
    const maxPages = 500;

    // Select a random page within the allowed range
    const randomPage = Math.floor(Math.random() * maxPages) + 1;

    // Fetch movies from the random page
    const moviesRes = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${randomPage}`);
    const movies = moviesRes.data.results;

    // Select a random movie from the page
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    // Return only the movie ID
    console.log(randomMovie.id)
    return randomMovie.id;
  } catch (error) {
    console.error('Error fetching random movie:', error);
    throw error;
  }
};


export const getPopularPeople = async () => {
  const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US&page=1`);
  return response.data;
};