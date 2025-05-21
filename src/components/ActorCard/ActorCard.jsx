import styles from "./ActorCard.module.css";

const ActorCard = ({ actor }) => {
  return (
    <li className={styles.actorItem}>
      <div className={styles.actorImage}>
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={styles.actorPhoto}
          />
        ) : (
          <div className={styles.noPhoto}>No photo</div>
        )}
      </div>
      <div className={styles.actorInfo}>
        <p className={styles.actorName}>{actor.name}</p>
        <p className={styles.character}>
          {actor.character ? `Character: ${actor.character}` : "Unknown role"}
        </p>
      </div>
    </li>
  );
};

export default ActorCard;
