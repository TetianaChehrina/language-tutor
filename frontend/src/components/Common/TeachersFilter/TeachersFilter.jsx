import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilters, setFilters } from "../../../redux/teachers/slice.js";
import css from "./TeachersFilter.module.css";

const TeachersFilter = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const handleFilter = () => {
    dispatch(setFilters({ search, language, level, price }));
  };

  const handleReset = () => {
    setSearch("");
    setLanguage("");
    setLevel("");
    setPrice("");
    dispatch(resetFilters());
  };

  return (
    <div className={css.filter_Container}>
      <input
        type="text"
        placeholder="Search by name or surname"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={css.filter_Input}
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={css.filter_Select}
      >
        <option value="">Languages</option>
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="Chinese">Chinese</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
        <option value="Italian">Italian</option>
      </select>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className={css.filter_Select}
      >
        <option value="">Level of knowledge</option>
        <option value="A1 Beginner">A1 Beginner</option>
        <option value="A2 Elementary">A2 Elementary</option>
        <option value="B1 Intermediate">B1 Intermediate</option>
        <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
        <option value="C1 Advanced">C1 Advanced</option>
      </select>
      <select
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className={css.filter_Select}
      >
        <option value="">Price</option>
        <option value="5">5$</option>
        <option value="10">10$</option>
        <option value="15">15$</option>
        <option value="20">20$</option>
        <option value="25">25$</option>
        <option value="30">30$</option>
        <option value="35">35$</option>
        <option value="40">40$</option>
        <option value="45">45$</option>
        <option value="50">50$</option>
        <option value="60">60$</option>
        <option value="65">65$</option>
        <option value="70">70$</option>
        <option value="75">75$</option>
        <option value="80">80$</option>
        <option value="85">85$</option>
        <option value="90">90$</option>
        <option value="95">95$</option>
        <option value="100">100$</option>
      </select>
      <button onClick={handleFilter} className={css.filter_Button}>
        Filter
      </button>
      <button onClick={handleReset} className={css.filter_Button}>
        Reset
      </button>
    </div>
  );
};

export default TeachersFilter;
