import axios from "axios";
import { api_key } from "./Constants";

export const getTvDetails = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

export const getTvPhotos = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${api_key}`
  );
  return response.data;
};

export const getTvCast = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}`
  );
  return response.data;
};

export const getTvEpisodes = async (id, seasonNumber) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${api_key}&language=en-US`
  );
  return response.data;
};

export const getSimilarTvShows = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`
  );
  return response.data;
};
