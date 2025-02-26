import { useDispatch } from "react-redux";
import TeachersFilter from "../../components/Common/TeachersFilter/TeachersFilter.jsx";
import TeachersList from "../../components/Common/TeachersList/TeachersList.jsx";
import { fetchTeachers } from "../../redux/teachers/operations.js";
import { useEffect } from "react";
import css from "./TeachersPage.module.css";

export const TeachersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers({ page: 1, perPage: 5 }));
  }, [dispatch]);

  return (
    <div>
      <h1 className={css.title}> Teachers list</h1>
      <TeachersFilter />
      <TeachersList />
    </div>
  );
};

export default TeachersPage;
