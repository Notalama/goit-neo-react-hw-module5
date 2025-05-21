import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <li className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <h3 className={styles.author}>
          <span className={styles.authorLabel}>Author:</span> {review.author}
        </h3>
        {review.author_details?.rating && (
          <div className={styles.rating}>
            <span className={styles.ratingValue}>
              {review.author_details.rating}
            </span>
            /10
          </div>
        )}
      </div>
      <div className={styles.content}>
        <p>{review.content}</p>
      </div>
      <div className={styles.reviewFooter}>
        <span className={styles.date}>
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>
    </li>
  );
};

export default ReviewCard;
