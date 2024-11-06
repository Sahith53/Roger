export const posterBase = "https://image.tmdb.org/t/p/original";

export const api_key = "21958744bdcd83994642863edf06f583";

export const constructPosterUrl = (path) => {
  return `${posterBase}${path}`;
};
