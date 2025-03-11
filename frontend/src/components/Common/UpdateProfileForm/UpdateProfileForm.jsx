import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/auth/operations.js";
import { selectUser } from "../../../redux/auth/selectors.js";
import toast, { Toaster } from "react-hot-toast";
import css from "./UpdateProfileForm.module.css";
import { useState } from "react";

const UpdateProfileForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      gender: user?.gender || "",
      languages: user?.languages?.join(", ") || "",
    },
  });

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      reset();
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      toast.error(error?.message || "Failed to update profile.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label>Name:</label>
        <input {...register("name")} placeholder="Enter new name" />

        <label>Surname:</label>
        <input {...register("surname")} placeholder="Enter new surname" />

        <label>Email:</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Enter new email"
        />

        <label>Old Password:</label>
        <input
          type="password"
          {...register("oldPassword")}
          placeholder="Enter old password"
        />

        <label>New Password:</label>
        <input
          type="password"
          {...register("newPassword")}
          placeholder="Enter new password"
        />

        <label>Gender:</label>
        <select {...register("gender")}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Languages:</label>
        <input
          {...register("languages")}
          placeholder="Enter languages (comma-separated)"
          onChange={(e) => setValue("languages", e.target.value)}
        />

        <label>Avatar:</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />

        <div className={css.button_Container}>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={onClose} className={css.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
