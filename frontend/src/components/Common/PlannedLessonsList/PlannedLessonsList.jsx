import PlannedLessonCard from "../PlannedLessonCard/PlannedLessonCard";
import css from "./PlannedLessonsList.module.css";

const PlannedLessonsList = ({ plannedLessons, userId, role }) => {
  return (
    <div className={css.planned_Lessons_List}>
      <h2 className={css.title}>Planned lessons</h2>
      {plannedLessons.length > 0 ? (
        <ul className={css.list}>
          {plannedLessons.map((lesson) => (
            <li key={lesson._id} className={css.card_Item}>
              <PlannedLessonCard lesson={lesson} userId={userId} role={role} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No planned lessons</p>
      )}
    </div>
  );
};

export default PlannedLessonsList;
