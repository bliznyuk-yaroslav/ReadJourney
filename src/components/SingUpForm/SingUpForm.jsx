import Logo from "../Logo/Logo";
import css from "./SingUpForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches("^(?!.*@[^,]*,)", "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    )
    .matches("[a-zA-Z]", "Password can only contain Latin letters."),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Repeat Password is required"),
});
export default function SindUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  const onSubmit = async (data) => {
    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "manual",
        message: "Password do not match",
      });
      return;
    }

    const { repeatPassword, ...payload } = data;

    try {
      await dispatch(register(payload)).unwrap();
      toast.success("Successfully register!");
      reset();
      navigate("/singin");
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    }
  };
  const emailClassName = `${css.input} ${errors.email ? css.errorInput : ""} `;
  const passwordClassName = `${css.input} ${
    errors.password ? css.errorInput : ""
  }`;
  const repeatPasswordClassName = `${css.input} ${
    errors.repeatPassword ? css.errorInput : ""
  }`;
  return (
    <section className={css.advantages_section}>
      <Logo />
      <div className={css.form}>
        <h1 className={css.title}>
          Expand your mind, reading <span className={css.textBook}>a book</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h2 className={css.h2}>Sign Up</h2>
        <div className={css.container}>
          <label className={css.label}>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                className={emailClassName}
                placeholder="Enter your email"
                type="email"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className={css.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={css.container}>
          <label className={css.label}>Password</label>
          <div className={css.inputWrapper}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className={passwordClassName}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />

            <div
              className={css.iconeye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.password && (
            <span className={css.errorMessage}>{errors.password.message}</span>
          )}
        </div>
        <div className={css.container}>
          <label className={css.label}>Repeat Password</label>
          <div className={css.inputWrapper}>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <input
                  className={repeatPasswordClassName}
                  placeholder="Please repeat password"
                  type={showRepeatPassword ? "text" : "password"}
                  {...field}
                />
              )}
            />
            <div
              className={css.iconeye}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <FiEye /> : <FiEyeOff />}
            </div>
          </div>
          {errors.repeatPassword && (
            <span className={css.errorMessage}>
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <button className={css.button} disabled={isSubmitting} type="submit">
          Sign Up
        </button>
        <div className={css.box}>
          <p className={css.text}>Already have an account?</p>
          <Link to="/signin" className={css.link}>
            Sign In
          </Link>
        </div>
      </form>
    </section>
  );
}
