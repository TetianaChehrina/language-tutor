import LoginForm from "../../components/Authorization/LoginForm/LoginForm";
import Container from "../../components/Common/Container/Container.jsx";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={css.pageContainer}>
      <Container>
        <h1 className={css.title}>Login</h1>
        <LoginForm />
      </Container>
    </div>
  );
};
export default LoginPage;
