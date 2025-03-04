import { Link } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import css from "./TeacherCard.module.css";
import StarRating from "../StarRating/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../../redux/teachers/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/teachers/slice";
import { useState } from "react";
import BookLessonModal from "../BookLessonModal /BookLessonModal";

const TeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === teacher.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    avatar_url,
    name,
    surname,
    reviews = [],
    levels = [],
    teaching_approach,
    price_per_hour,
    lessons_done,
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
        <img src={avatar_url} alt={`${name} ${surname}`} />
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
          <div className={css.btn_Container}>
            <Link
              to={`/teachers/${teacher.id}`}
              className={`${css.read_More} ${css.text_Button}`}
            >
              Read More
            </Link>
            <button
              className={`${css.booking_Btn} ${css.text_Button}`}
              onClick={() => setIsModalOpen(true)}
            >
              Book lesson
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookLessonModal
          teacher={teacher}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherCard;
