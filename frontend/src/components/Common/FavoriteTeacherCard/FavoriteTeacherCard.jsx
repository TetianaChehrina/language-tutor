import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectFavorites } from "../../../redux/teachers/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/teachers/slice";
import css from "./FavoriteTeacherCard.module.css";

const FavoriteTeacherCard = ({ teacher }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.some((fav) => fav.id === teacher.id);

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
    <div className={css.card}>
      <button className={css.favorite} onClick={handleFavorite}>
        <IoHeartOutline
          width="26"
          height="24"
          style={{ stroke: isFavorite ? "red" : "gray" }}
        />
      </button>
      <img src={teacher.avatar_url} alt={teacher.name} className={css.avatar} />
      <div className={css.info}>
        <h3 className={css.name}>
          {teacher.name} {teacher.surname}
        </h3>
        <p className={css.languages}>
          Languages: {teacher.languages.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default FavoriteTeacherCard;
