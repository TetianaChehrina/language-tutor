import { useSelector, useDispatch } from "react-redux";
import { selectBusySlots } from "../../../redux/lessons/selectors.js";
import { selectUser } from "../../../redux/auth/selectors.js";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { toast } from "react-hot-toast";
import {
  bookLesson,
  fetchBusySlots,
} from "../../../redux/lessons/operation.js";

import { IoClose } from "react-icons/io5";
import css from "./BookLessonModal.module.css";

const BookLessonModal = ({ teacherId, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const busySlots = useSelector(selectBusySlots) || [];
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchBusySlots(teacherId));
    }
  }, [dispatch, teacherId]);

  const handleBookLesson = async () => {
    if (!date || !reason || !language) {
      toast.error("Please fill all fields.");
      return;
    }
    if (!user || !(user._id || user.id)) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      await dispatch(
        bookLesson({
          studentId: user._id,
          teacherId,
          date,
          duration: 60,
          reason,
          language,
        })
      ).unwrap();

      toast.success("Lesson successfully booked!");
      onClose();
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className={css.modal_Overlay}>
      <div className={css.modal_Content}>
        <button className={css.close_Button} onClick={onClose}>
          <IoClose />
        </button>
        <h2 className={css.modal_Title}>Book trial lesson</h2>
        <Flatpickr
          className={css.date_Picker}
          value={date}
          onChange={(selectedDates) => setDate(selectedDates[0])}
          options={{
            enableTime: true,
            dateFormat: "Y-m-d H:i",
            time_24hr: true,
            disable: busySlots.map((slot) => new Date(slot.date)),
          }}
        />
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
        <input
          type="text"
          placeholder="Lesson language"
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
