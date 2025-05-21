import { useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} location={location} />
      ))}
    </ul>
  );
};

export default MovieList;
