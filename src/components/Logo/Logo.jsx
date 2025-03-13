import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";
import sprite from "../../image/sprite/sprite.svg";
export default function Logo() {
  return (
    <NavLink to="/" className={css.logo}>
      <svg className={css.svgGlass}>
        <use xlinkHref={`${sprite}#icon-Logo`} />
      </svg>
    </NavLink>
  );
}
