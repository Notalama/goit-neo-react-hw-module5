export const API_KEY = import.meta.env.VITE_TMDB_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const ENDPOINTS = {
  TRENDING: "/trending/movie/day",
  SEARCH: "/search/movie",
  MOVIE_DETAILS: "/movie",
  MOVIE_CREDITS: "/credits",
  MOVIE_REVIEWS: "/reviews",
};

export const API_CONFIG = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
};
