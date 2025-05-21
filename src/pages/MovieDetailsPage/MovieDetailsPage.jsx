import { useState, useEffect, useRef } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMovieDetails } from "../../services/apiService";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch {
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movieDetails) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        &larr; Go back
      </Link>

      <MovieDetails movie={movieDetails} />

      <div className={styles.additionalInfo}>
        <h3 className={styles.sectionHeading}>Additional information</h3>

        <ul className={styles.infoLinks}>
          <li>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.infoLink
              }
            >
              Cast
            </NavLink>
          </li>

          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.infoLink
              }
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
