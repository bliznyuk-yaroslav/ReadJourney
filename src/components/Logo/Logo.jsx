import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";
export default function Logo() {
  return (
    <NavLink to="/" className={css.logo}>
      <img src="../../image/sprite/icon.svg" alt="logo" />
    </NavLink>
  );
}
