import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { selectIsLoggedIn } from "../../../redux/auth/selectors.js";
import Logo from "../Header/Logo/Logo.jsx";
import Container from "../Container/Container";
import css from "./Header.module.css";
import { logoutUser } from "../../../redux/auth/operations.js";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <Container>
        <div className={css.header_container}>
          <NavLink to="/" className={css.logo}>
            <Logo />
          </NavLink>
          <button className={css.burger} onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiAlignJustify size={24} />}
          </button>
          <nav className={`${css.nav} ${isMenuOpen ? css.open : ""}`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? css.active : css.link)}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) => (isActive ? css.active : css.link)}
              onClick={closeMenu}
            >
              Teachers
            </NavLink>
          </nav>
          <div className={`${css.auth} ${isMenuOpen ? css.open : ""}`}>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? css.active : css.link
                  }
                  onClick={closeMenu}
                >
                  Profile
                </NavLink>
                <button
                  className={css.logout}
                  onClick={() => dispatch(logoutUser())}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? css.active : css.link
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? css.active : css.link
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
