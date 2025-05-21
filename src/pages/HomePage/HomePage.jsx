import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoResults from "../../components/NoResults/NoResults";
import { getTrendingMovies } from "../../services/apiService";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch {
        setError("Failed to fetch trending movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>

      {isLoading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && movies.length === 0 && (
        <NoResults message="No trending movies found. Please try again later." />
      )}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
