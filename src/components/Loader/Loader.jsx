import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({ size = 50, color = "#3498db" }) => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color={color} size={size} aria-label="Loading" />
    </div>
  );
};

export default Loader;
