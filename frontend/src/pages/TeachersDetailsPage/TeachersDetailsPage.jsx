import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeachersById } from "../../redux/teachers/operations.js";
import { selectTeacher } from "../../redux/teachers/selectors.js";
import TeacherDetailCard from "../../components/Common/TeacherDetailCard/TeacherDetailCard.jsx";
import css from "./TeachersDetailsPage.module.css";
import Container from "../../components/Common/Container/Container.jsx";

const TeacherDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const teacher = useSelector(selectTeacher);
  const navigate = useNavigate();

  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    dispatch(fetchTeachersById(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate("/teachers");
  };

  const handleToggleReviews = () => {
    if (showReviews) {
      navigate(`/teachers/${id}`);
    } else {
      navigate(`/teachers/${id}/reviews`);
    }
    setShowReviews(!showReviews);
  };

  return (
    <Container>
      <section className={css.teacherPage}>
        <button onClick={handleGoBack} className={css.backButton}>
          ← Back to Teachers
        </button>
        <TeacherDetailCard teacher={teacher} />
        <nav className={css.detailsNav}>
          <button
            onClick={handleToggleReviews}
            className={`${css.link} ${showReviews ? css.active : ""}`}
          >
            Reviews
          </button>
        </nav>
        {showReviews && <Outlet />}
      </section>
    </Container>
  );
};

export default TeacherDetailsPage;
