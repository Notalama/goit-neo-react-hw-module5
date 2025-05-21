import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../services/apiService";
import ActorCard from "../ActorCard/ActorCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoResults from "../NoResults/NoResults";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getMovieCast(movieId);
        setCast(data || []);
      } catch {
        setError("Failed to load cast information. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!cast.length) {
    return (
      <NoResults message="We don't have any cast information for this movie." />
    );
  }

  return (
    <div className={styles.castContainer}>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
