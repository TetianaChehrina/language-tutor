import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../../redux/teachers/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/teachers/slice";
import css from "./TeacherDetailCard.module.css";
import StarRating from "../StarRating/StarRating";

const TeacherDetailCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === teacher.id);

  const {
    avatar_url,
    name,
    surname,
    teaching_approach,
    price_per_hour,
    lessons_done,
    requirements = [],
    levels = [],
    reviews = [],
  } = teacher;

  const reviewsCount = reviews.length;
  const averageRating =
    reviewsCount > 0
      ? (
          reviews.reduce((acc, review) => acc + review.reviewer_rating, 0) /
          reviewsCount
        ).toFixed(1)
      : 0;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(teacher));
    } else {
      dispatch(addToFavorites(teacher));
    }
  };

  return (
    <div className={css.card_Container}>
      <div className={css.top_Info}>
        <p className={css.text}>📖 Lessons done: {lessons_done}</p>
        <div className={css.rating_Container}>
          <StarRating rating={Math.round(averageRating)} />
          <span className={css.rating_Text}>{averageRating}</span>
        </div>
        <p className={`${css.price} ${css.text}`}>
          Price: <span>{price_per_hour}$</span>
        </p>
        <button className={css.favorite} onClick={handleFavorite}>
          <IoHeartOutline
            width="26"
            height="24"
            style={{ stroke: isFavorite ? "red" : "gray" }}
          />
        </button>
      </div>

      <div className={css.main_Content}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.avatar}
        />
        <div className={css.teacher_Info}>
          <h3 className={css.text_Heading}>
            {name} {surname}
          </h3>
          <div className={css.languages}>
            {levels.map((level, index) => (
              <span key={index} className={css.language_Tag}>
                #{level}
              </span>
            ))}
          </div>
          <p className={css.text}>
            <strong className={css.text_Strong}>Teacher's approach:</strong>{" "}
            {teaching_approach}
          </p>

          {requirements.length > 0 && (
            <div className={css.requirements}>
              <strong className={css.text_Strong}>Requirements:</strong>
              <ul>
                {requirements.map((item, index) => (
                  <li key={index} className={css.text}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailCard;
