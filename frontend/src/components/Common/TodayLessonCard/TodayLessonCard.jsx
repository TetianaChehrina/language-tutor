import { useDispatch } from "react-redux";
import { deleteLesson } from "../../../redux/lessons/operation.js";
import { toast } from "react-hot-toast";
import css from "./TodayLessonCard.module.css";

const TodayLessonCard = ({ lesson }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteLesson(lesson._id)).unwrap();
      toast.success(`Lesson "${lesson.reason}" deleted successfully!`);
    } catch (error) {
      toast.error("Failed to delete lesson. Please try again.");
    }
  };

  return (
    <div className={css.card}>
      <h3 className={css.title}>{lesson.reason}</h3>
      <p className={css.date}>
        Time: {new Date(lesson.date).toLocaleTimeString()}
      </p>
      <p className={css.language}>Language: {lesson.language}</p>
      <button onClick={handleDelete} className={css.delete_Btn}>
        Delete
      </button>
    </div>
  );
};

export default TodayLessonCard;
