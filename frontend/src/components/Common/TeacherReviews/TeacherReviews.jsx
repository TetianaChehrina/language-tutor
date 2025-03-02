import { useSelector } from "react-redux";
import css from "./TeacherReviews.module.css";
import { selectTeacher } from "../../../redux/teachers/selectors.js";
import StarRating from "../StarRating/StarRating";

const TeacherReviews = () => {
  const teacher = useSelector(selectTeacher);
  const { reviews = [] } = teacher || {};

  return (
    <section className={css.reviewsContainer}>
      <h2 className={css.title}>Teacher Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={css.review}>
            <div className={css.reviewInfo}>
              <img
                src={review.reviewer_avatar || "default-avatar.png"}
                alt={review.reviewer_name || "Anonymous"}
                className={css.reviewAvatar}
              />
              <span className={css.reviewerName}>
                {review.reviewer_name || "Anonymous"}
              </span>
              <StarRating rating={review.reviewer_rating || 0} />
            </div>
            <p className={css.reviewText}>{review.comment || "No comment"}</p>
          </div>
        ))
      ) : (
        <p className={css.noReviews}>No reviews yet.</p>
      )}
    </section>
  );
};

export default TeacherReviews;
