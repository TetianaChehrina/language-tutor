import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import css from "./StarRating.module.css";

const StarRating = ({ rating }) => {
  const maxStars = 5;

  const stars = Array.from({ length: maxStars }, (_, index) => {
    if (index + 1 <= rating) {
      return <FaStar key={index} className={css.filled_Star} />;
    } else if (index + 0.5 === rating) {
      return <FaStarHalfAlt key={index} className={css.half_Star} />;
    } else {
      return <FaRegStar key={index} className={css.empty_Star} />;
    }
  });

  return <div className={css.star_Container}>{stars}</div>;
};

export default StarRating;
