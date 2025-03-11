import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUser, selectIsLoading } from "../../redux/auth/selectors.js";
import { selectPlannedLessons } from "../../redux/lessons/selectors.js";
import { selectFavorites } from "../../redux/teachers/selectors.js";
import { fetchLessons } from "../../redux/lessons/operation.js";

import css from "./ProfilePage.module.css";
import Container from "../../components/Common/Container/Container.jsx";
import UserCard from "../../components/Common/UserCard/UserCard.jsx";
import PlannedLessonsList from "../../components/Common/PlannedLessonsList/PlannedLessonsList.jsx";
import TodayLessonsList from "../../components/Common/TodayLessonsList/TodayLessonsList.jsx";
import FavoriteTeachersList from "../../components/Common/FavoriteTeachersList/FavoriteTeachersList.jsx";
import Loader from "../../components/Common/Loader/Loader.jsx";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const plannedLessons = useSelector(selectPlannedLessons);
  const favoriteTeachers = useSelector(selectFavorites) || [];
  const loading = useSelector(selectIsLoading);
  const today = new Date().toISOString().split("T")[0];

  const todayLessons = plannedLessons.filter((lesson) =>
    lesson.date.startsWith(today)
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchLessons({ userId: user._id, role: user.role }));
    }
  }, [dispatch, user]);

  if (loading) return <Loader />;

  return (
    <Container>
      <div className={css.profile_Page_Container}>
        <div className={css.left_Section}>
          <UserCard user={user} />
        </div>
        <div className={css.right_Section}>
          <PlannedLessonsList plannedLessons={plannedLessons} />
          <TodayLessonsList todayLessons={todayLessons} />
          {favoriteTeachers.length > 0 && (
            <FavoriteTeachersList favoriteTeachers={favoriteTeachers} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
