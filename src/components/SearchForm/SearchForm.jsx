import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import styles from "./SearchForm.module.css";

const SearchForm = ({ onSubmit, initialValue = "" }) => {
  const formik = useFormik({
    initialValues: { query: initialValue },
    validationSchema: Yup.object({
      query: Yup.string()
        .trim()
        .min(2, "Search query must be at least 2 characters")
        .required("Please enter a search query"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      try {
        onSubmit(values.query);
      } catch (error) {
        toast.error(error.message || "Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (formik.errors.query) {
      toast.error(formik.errors.query);
    }
  }, [formik.errors]);

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="query"
          id="query"
          className={`${styles.input} ${
            formik.errors.query && formik.touched.query ? styles.inputError : ""
          }`}
          placeholder="Search movies..."
          aria-label="Search movies"
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchForm;
