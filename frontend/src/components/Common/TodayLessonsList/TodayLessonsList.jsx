import TodayLessonCard from "../TodayLessonCard/TodayLessonCard";
import css from "./TodayLessonsList.module.css";

const TodayLessonsList = ({ todayLessons, userId, role }) => {
  return (
    <div className={css.today_Lessons_List}>
      <h2 className={css.title}>Today lessons</h2>
      {todayLessons.length > 0 ? (
        <ul className={css.list}>
          {todayLessons.map((lesson) => (
            <li key={lesson._id} className={css.card_Item}>
              <TodayLessonCard lesson={lesson} userId={userId} role={role} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons for today</p>
      )}
    </div>
  );
};

export default TodayLessonsList;
