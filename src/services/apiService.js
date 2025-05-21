import axios from "axios";
import { BASE_URL, ENDPOINTS, API_CONFIG, IMAGE_BASE_URL } from "./apiConfig";

const api = axios.create({
  baseURL: BASE_URL,
  ...API_CONFIG,
});

export const getImageUrl = (path) => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${path}`;
};

export const getTrendingMovies = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.TRENDING);
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const { data } = await api.get(ENDPOINTS.SEARCH, {
      params: {
        ...API_CONFIG.params,
        query,
        page,
      },
    });
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await api.get(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCast = async (movieId) => {
  try {
    const { data } = await api.get(
      `${ENDPOINTS.MOVIE_DETAILS}/${movieId}${ENDPOINTS.MOVIE_CREDITS}`
    );
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const { data } = await api.get(
      `${ENDPOINTS.MOVIE_DETAILS}/${movieId}${ENDPOINTS.MOVIE_REVIEWS}`
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};
