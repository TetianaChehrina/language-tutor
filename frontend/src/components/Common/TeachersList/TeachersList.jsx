import { useDispatch, useSelector } from "react-redux";
import {
  selectTeachers,
  selectIsError,
  selectIsLoading,
  selectPage,
  selectTotalPages,
} from "../../../redux/teachers/selectors.js";
import TeachersCard from "../TeacherCard/TeacherCard.jsx";
import { setPage } from "../../../redux/teachers/slice.js";
import Loader from "../Loader/Loader.jsx";
import css from "./TeachersList.module.css";

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={css.list_Container}>
      {isLoading && <Loader />}
      {isError && <p>Error fetching teachers. Please try again later.</p>}
      {!isLoading && teachers.length > 0 ? (
        <>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>
                <TeachersCard teacher={teacher} />
              </li>
            ))}
          </ul>
          {page < totalPages && (
            <button onClick={handleLoadMore} className={css.teacher_page_btn}>
              Load More
            </button>
          )}
        </>
      ) : (
        !isLoading && <h1>Teachers not found</h1>
      )}
    </div>
  );
};

export default TeachersList;
