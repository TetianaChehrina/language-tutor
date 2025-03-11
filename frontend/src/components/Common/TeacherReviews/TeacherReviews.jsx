import { useSelector } from "react-redux";
import { selectTeacher } from "../../../redux/teachers/selectors.js";
import StarRating from "../StarRating/StarRating";
import css from "./TeacherReviews.module.css";

const TeacherReviews = () => {
  const teacher = useSelector(selectTeacher);
  const { reviews = [] } = teacher || {};

  return (
    <section className={css.reviews_Container}>
      <h2 className={css.title}>Teacher Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => {
          const name = review.reviewer_name || "Anonymous";
          const avatar = review.reviewer_avatar;
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={css.review}>
              <div className={css.review_Info}>
                {avatar ? (
                  <img src={avatar} alt={name} className={css.review_Avatar} />
                ) : (
                  <div className={css.avatarPlaceholder}>{firstLetter}</div>
                )}
                <span className={css.reviewer_Name}>{name}</span>
                <StarRating rating={review.reviewer_rating || 0} />
              </div>
              <p className={css.review_Text}>
                {review.comment || "No comment"}
              </p>
            </div>
          );
        })
      ) : (
        <p className={css.no_Reviews}>No reviews yet.</p>
      )}
    </section>
  );
};

export default TeacherReviews;
