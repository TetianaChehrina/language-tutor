import { useDispatch } from "react-redux";
import {
  completeLesson,
  deleteLesson,
} from "../../../redux/lessons/operation.js";
import { toast } from "react-hot-toast";
import css from "./PlannedLessonCard.module.css";

const PlannedLessonCard = ({ lesson }) => {
  const dispatch = useDispatch();

  const handleComplete = async () => {
    try {
      await dispatch(completeLesson(lesson._id)).unwrap();
      toast.success("Lesson marked as completed!");
    } catch (error) {
      console.error("Complete lesson error:", error);
      toast.error("Failed to complete lesson. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteLesson(lesson._id)).unwrap();
      toast.success("Lesson successfully deleted!");
    } catch (error) {
      console.error("Delete lesson error:", error);
      toast.error("Failed to delete lesson. Please try again.");
    }
  };

  return (
    <div className={css.card}>
      <h3>{lesson.reason}</h3>
      <p className={css.date}>Date: {new Date(lesson.date).toLocaleString()}</p>
      <p className={css.duration}>Duration: {lesson.duration} minutes</p>
      <button onClick={handleComplete} className={css.complete_Btn}>
        Complete
      </button>
      <button onClick={handleDelete} className={css.delete_Btn}>
        Delete
      </button>
    </div>
  );
};

export default PlannedLessonCard;
