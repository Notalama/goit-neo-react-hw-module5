import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoResults from "../../components/NoResults/NoResults";
import { searchMovies } from "../../services/apiService";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setSearched(false);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await searchMovies(query);
        setMovies(response.results);
        setSearched(true);
      } catch {
        setError("Failed to search movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (newQuery) => {
    if (newQuery === query) return;

    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>

      <SearchForm onSubmit={handleSubmit} initialValue={query} />

      {isLoading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && searched && movies.length === 0 && (
        <NoResults
          message={`No movies found for "${query}". Try a different search.`}
        />
      )}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
