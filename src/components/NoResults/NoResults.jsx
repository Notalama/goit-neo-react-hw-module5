import styles from "./NoResults.module.css";

const NoResults = ({ message }) => {
  return (
    <div className={styles.noResults}>
      <p>{message}</p>
    </div>
  );
};

export default NoResults;
