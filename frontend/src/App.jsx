import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Common/Layout/Layout.jsx";
import Loader from "./components/Common/Loader/Loader.jsx";
import { refreshUser } from "../../frontend/src/redux/auth/operations.js";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../frontend/src/redux/auth/selectors.js";
import TeacherReviews from "./components/Common/TeacherReviews/TeacherReviews.jsx";

const HomePage = lazy(() =>
  import("../../frontend/src/pages/HomePage/HomePage.jsx")
);
const TeachersPage = lazy(() =>
  import("../../frontend/src/pages/TeachersPage/TeachersPage.jsx")
);
const TeachersDetailsPage = lazy(() =>
  import("./pages/TeachersDetailsPage/TeachersDetailsPage.jsx")
);

const RegistrationPage = lazy(() =>
  import("../../frontend/src/pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() =>
  import("../../frontend/src/pages/LoginPage/LoginPage.jsx")
);
const ProfilePage = lazy(() =>
  import("../../frontend/src/pages/ProfilePage/ProfilePage.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/:id" element={<TeachersDetailsPage />}>
            <Route path="reviews" element={<TeacherReviews />} />
          </Route>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
