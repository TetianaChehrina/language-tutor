import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { useDispatch } from "react-redux";

import { registerUser } from "../../../redux/auth/operations";
import { useState } from "react";
import css from "./RegistrationForm.module.css";

// const schema = yup.object().shape({
//   name: yup.string().required("Name required"),
//   surname: yup.string().required("Прізвище обов'язкове"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password required"),
//   gender: yup
//     .string()
//     .oneOf(["male", "female"], "Choose gender")
//     .required("Гендер обов'язковий"),
//   role: yup
//     .string()
//     .oneOf(["user", "teacher"], "Choose a role")
//     .required("Role required"),
//   avatar: yup
//     .mixed()
//     .notRequired()
//     .test("fileSize", "file is too large (max. 2MB)", (value) => {
//       return value && value[0]?.size <= 2 * 1024 * 1024;
//     }),
// });

const RegistrationForm = () => {
  const dispatch = useDispatch();
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
      console.log("Selected file:", file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("role", data.role);

    console.log("Avatar data before appending:", data.avatar);

    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    } else {
      console.warn("Avatar is missing or not a file!");
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className={css.form}
    >
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Surname</label>
        <input {...register("surname")} />
        {errors.surname && <p>{errors.surname.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Gender</label>
        <select {...register("gender")}>
          <option value="">Choose...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label>Role</label>
        <select {...register("role")}>
          <option value="">Choose...</option>
          <option value="user">User</option>
          <option value="teacher">Teacher</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>

      <div>
        <label>Avatar</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {preview && <img src={preview} alt="Avatar preview" width="100" />}
        {errors.avatar && <p>{errors.avatar.message}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
