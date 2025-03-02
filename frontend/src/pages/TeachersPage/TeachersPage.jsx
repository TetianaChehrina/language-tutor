import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../../redux/teachers/operations.js";
import { selectFilters, selectPage } from "../../redux/teachers/selectors.js";
import TeachersList from "../../components/Common/TeachersList/TeachersList.jsx";
import TeachersFilter from "../../components/Common/TeachersFilter/TeachersFilter.jsx";
import css from "./TeachersPage.module.css";
import Container from "../../components/Common/Container/Container.jsx";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchTeachers({ page, filters }));
  }, [dispatch, filters, page]);

  return (
    <Container>
      <div className={css.teacher_Page}>
        <TeachersFilter />
        <TeachersList />
      </div>
    </Container>
  );
};

export default TeachersPage;
