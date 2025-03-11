import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { IoHeartOutline } from "react-icons/io5";
import StarRating from "../StarRating/StarRating";
import { selectFavorites } from "../../../redux/teachers/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/teachers/slice";
import BookLessonModal from "../BookLessonModal /BookLessonModal";
import css from "./TeacherCard.module.css";

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
    languages = [],
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
      toast.success(`${teacher.name} removed from favorites`);
    } else {
      dispatch(addToFavorites(teacher));
      toast.success(`${teacher.name} added to favorites`);
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
          <p className={css.languages_Text}>
            <strong>Languages:</strong> {languages.join(", ")}
          </p>
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
          teacherId={teacher._id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherCard;
