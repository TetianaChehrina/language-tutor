// import { useDispatch, useSelector } from "react-redux";
// import { selectBusySlots } from "../../../redux/lessons/selectors.js";
// import { useEffect, useState } from "react";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_blue.css";
// import {
//   bookLesson,
//   fetchBusySlots,
// } from "../../../redux/lessons/operation.js";
// import css from "./BookLessonModal.module.css";

// const BookLessonModal = ({ teacherId, onClose }) => {
//   const dispatch = useDispatch();
//   const busySlots = useSelector(selectBusySlots);
//   const [date, setDate] = useState(null);
//   const [reason, setReason] = useState("");
//   const [language, setLanguage] = useState("");

//   useEffect(() => {
//     dispatch(fetchBusySlots(teacherId));
//   }, [dispatch, teacherId]);

//   const handleBookLesson = () => {
//     if (!date || !reason || !language) {
//       alert("Please fill all fields");
//       return;
//     }

//     dispatch(bookLesson({ teacherId, date, reason, language }));
//     onClose();
//   };

//   return (
//     <div className={css.modalOverlay}>
//       <div className={css.modalContent}>
//         <h2>Book trial lesson</h2>
//         <Flatpickr
//           value={date}
//           onChange={(selectedDates) => setDate(selectedDates[0])}
//           options={{
//             enableTime: true,
//             dateFormat: "Y-m-d H:i",
//           }}
//         />
//         <select value={reason} onChange={(e) => setReason(e.target.value)}>
//           <option value="">Select reason</option>
//           <option value="Career and business">Career and business</option>
//           <option value="Lesson for kids">Lesson for kids</option>
//           <option value="Living abroad">Living abroad</option>
//           <option value="Exams and coursework">Exams and coursework</option>
//           <option value="Culture, travel or hobby">
//             Culture, travel or hobby
//           </option>
//         </select>

//         <input
//           type="text"
//           placeholder="Lesson language"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         />

//         <button onClick={handleBookLesson}>Book</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default BookLessonModal;
import { useDispatch, useSelector } from "react-redux";
import { selectBusySlots } from "../../../redux/lessons/selectors.js";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {
  bookLesson,
  fetchBusySlots,
} from "../../../redux/lessons/operation.js";
import css from "./BookLessonModal.module.css";

const BookLessonModal = ({ teacherId, onClose }) => {
  const dispatch = useDispatch();
  const busySlots = useSelector(selectBusySlots) || [];
  const [date, setDate] = useState(null);
  const [reason, setReason] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchBusySlots(teacherId));
    }
  }, [dispatch, teacherId]);

  const handleBookLesson = () => {
    if (!date || !reason || !language) {
      alert("Please fill all fields");
      return;
    }

    dispatch(bookLesson({ teacherId, date, reason, language }));
    onClose();
  };

  return (
    <div className={css.modal_Overlay}>
      <div className={css.modal_Content}>
        <button className={css.close_Button} onClick={onClose}>
          ✖
        </button>
        <h2 className={css.modal_Title}>Book trial lesson</h2>
        <p className={css.modal_Description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacher_Info}>
          <img
            src="https://randomuser.me/api/portraits/women/6.jpg"
            alt="Teacher"
            className={css.teacher_Avatar}
          />
          <div>
            <p className={css.teacher_Label}>Your teacher</p>
            <p className={css.teacher_Name}>Jane Smith</p>
          </div>
        </div>

        <label className={css.label}>Select date and time</label>
        <Flatpickr
          className={css.date_Picker}
          value={date}
          onChange={(selectedDates) => setDate(selectedDates[0])}
          options={{
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            disable: busySlots.map((slot) => new Date(slot)),
          }}
        />

        <label className={css.label}>
          What is your main reason for learning language?
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={css.select}
        >
          <option value="">Select reason</option>
          <option value="Career and business">Career and business</option>
          <option value="Lesson for kids">Lesson for kids</option>
          <option value="Living abroad">Living abroad</option>
          <option value="Exams and coursework">Exams and coursework</option>
          <option value="Culture, travel or hobby">
            Culture, travel or hobby
          </option>
        </select>

        <label className={css.label}>Lesson language</label>
        <input
          type="text"
          placeholder="Enter lesson language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={css.input}
        />

        <button className={css.book_Button} onClick={handleBookLesson}>
          Book
        </button>
      </div>
    </div>
  );
};

export default BookLessonModal;
