import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../../redux/auth/operations";
import css from "./LoginForm.module.css";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success("Login successful!");
      navigate("/teachers");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.log("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.form_Group}>
        <label className={css.label}>
          Email
          <input
            type="email"
            className={css.input}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
        </label>
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.form_Group}>
        <label className={css.label}>
          Password
          <input
            type="password"
            className={css.input}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </label>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={css.submit_Button}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
