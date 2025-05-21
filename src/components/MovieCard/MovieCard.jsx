import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/apiService";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, location }) => {
  return (
    <li className={styles.movieItem}>
      <Link
        to={`/movies/${movie.id}`}
        state={{ from: location }}
        className={styles.movieLink}
      >
        <div className={styles.moviePoster}>
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.posterImage}
            />
          ) : (
            <div className={styles.noPoster}>No poster available</div>
          )}
        </div>
        <div className={styles.movieInfo}>
          <h3 className={styles.movieTitle}>{movie.title}</h3>
          <p className={styles.movieDate}>
            {movie.release_date && new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
