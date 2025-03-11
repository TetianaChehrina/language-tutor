import RegistrationForm from "../../components/Authorization/RegistrationForm/RegistrationForm";
import Container from "../../components/Common/Container/Container";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <Container>
      <div className={css.page_Container}>
        <h1 className={css.title}>Registration</h1>
        <RegistrationForm />
      </div>
    </Container>
  );
};

export default RegistrationPage;
