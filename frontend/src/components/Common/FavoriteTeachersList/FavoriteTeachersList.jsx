import css from "./FavoriteTeachersList.module.css";
import FavoriteTeacherCard from "../FavoriteTeacherCard/FavoriteTeacherCard";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../../redux/teachers/selectors";

const FavoriteTeachersList = () => {
  const favoriteTeachers = useSelector(selectFavorites);

  return (
    <div className={css.favorites_Container}>
      <h2 className={css.title}>Favorite teachers</h2>
      {favoriteTeachers.length > 0 ? (
        <ul className={css.list}>
          {favoriteTeachers.map((teacher) => (
            <li key={teacher.id} className={css.list_Item}>
              <FavoriteTeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite teachers yet.</p>
      )}
    </div>
  );
};

export default FavoriteTeachersList;
