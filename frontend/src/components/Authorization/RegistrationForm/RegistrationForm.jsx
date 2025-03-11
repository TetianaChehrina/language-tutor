import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../../../redux/auth/operations";

import { toast } from "react-hot-toast";
import css from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("avatar", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("gender", data.gender);
      formData.append("role", data.role);

      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      await dispatch(registerUser(formData)).unwrap();

      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();
      toast.success("Login successful!");
      navigate("/teachers");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error registering:", error);
    }
  };

  return (
    <div className={css.page_Container}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={css.input}
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
          })}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <label className={css.label} htmlFor="surname">
          Surname
        </label>
        <input
          id="surname"
          className={css.input}
          {...register("surname", {
            required: "Surname is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
          })}
        />
        {errors.surname && (
          <p className={css.error}>{errors.surname.message}</p>
        )}

        <label className={css.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={css.input}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <label className={css.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={css.input}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Must be at least 6 characters" },
          })}
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        <label className={css.label} htmlFor="gender">
          Gender
        </label>
        <select
          id="gender"
          className={css.select}
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="">Choose...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className={css.error}>{errors.gender.message}</p>}

        <label className={css.label} htmlFor="role">
          Role
        </label>
        <select
          id="role"
          className={css.select}
          {...register("role", { required: "Role is required" })}
        >
          <option value="">Choose...</option>
          <option value="user">User</option>
          <option value="teacher">Teacher</option>
        </select>
        {errors.role && <p className={css.error}>{errors.role.message}</p>}

        <label className={css.label} htmlFor="avatar">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className={css.input}
          onChange={handleAvatarChange}
        />
        {preview && <img src={preview} alt="Avatar preview" width="100" />}

        <button type="submit" className={css.submit_Button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
