import { Link } from "react-router-dom";
import css from "./TeacherCard.module.css";
const TeacherCard = ({ teacher }) => {
  return (
    <div className={css.card_Container}>
      <img
        src={teacher.avatar_url}
        alt={`${teacher.name} ${teacher.surname}`}
      />
      <h3>
        {teacher.name} {teacher.surname}
      </h3>
      <p>Price: {teacher.price_per_hour} $</p>
      <p>Rating: {teacher.rating}</p>
      <Link to={`/teachers/${teacher.id}`}>Read More</Link>
    </div>
  );
};

export default TeacherCard;
