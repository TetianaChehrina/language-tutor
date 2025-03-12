import { useNavigate } from "react-router-dom";
import Container from "../../components/Common/Container/Container";
import css from "./HomePage.module.css";
import { FcGlobe } from "react-icons/fc";
const HomePage = () => {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate("/register");
  };

  return (
    <section className={css.home}>
      <video className={css.videoBackground} autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container>
        <div className={css.overlay}>
          <h1 className={css.title}>Welcome to Language Tutor</h1>
          <h3 className={css.text}>
            <FcGlobe className={css.icon} /> Learn languages easily and
            effectively! Join our community and find the perfect tutor for your
            needs.
          </h3>
          <button className={css.btn} onClick={handleJoinUsClick}>
            Join us
          </button>
        </div>
      </Container>
    </section>
  );
};

export default HomePage;
