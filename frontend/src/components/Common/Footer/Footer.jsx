import Container from "../Container/Container.jsx";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <p>© 2025, LanguageTutor</p>
      </Container>
    </footer>
  );
};

export default Footer;
