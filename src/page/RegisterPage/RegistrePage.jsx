import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
// import Logo from "../../components/Logo/Logo";
import css from "./RegisterPage.module.css";
import SindUpForm from "../../components/SingUpForm/SingUpForm";

const RegisterPage = () => {
  return (
    <div className={css.container}>
      <SindUpForm />
      <AdvantagesSection />
    </div>
  );
};
export default RegisterPage;
