import styles from "./MovieDetails.module.css";

const MovieDetails = ({ movie }) => {
  const { title, poster_path, vote_average, overview, genres, release_date } =
    movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "Unknown";

  const userScore = vote_average ? Math.round(vote_average * 10) : 0;

  return (
    <div className={styles.movieInfo}>
      <div className={styles.posterContainer}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className={styles.poster}
          />
        ) : (
          <div className={styles.noPoster}>No poster available</div>
        )}
      </div>

      <div className={styles.details}>
        <h2 className={styles.title}>
          {title} ({releaseYear})
        </h2>

        <p className={styles.score}>User Score: {userScore}%</p>

        <h3 className={styles.sectionHeading}>Overview</h3>
        <p className={styles.overview}>
          {overview || "No overview available."}
        </p>

        <h3 className={styles.sectionHeading}>Genres</h3>
        <p className={styles.genres}>
          {genres && genres.length > 0
            ? genres.map((genre) => genre.name).join(", ")
            : "No genres available."}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
