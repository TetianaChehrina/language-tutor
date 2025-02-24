import Container from "../../components/Common/Container/Container";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={css.home}>
      <video className={css.videoBackground} autoPlay loop muted playsInline>
        <source src="../../../public/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Container>
        <div className={css.overlay}>
          <h1 className={css.title}>Welcome to Language Tutor</h1>
        </div>
        <div>
          <button>Try</button>
        </div>
      </Container>
    </section>
  );
};
export default HomePage;
