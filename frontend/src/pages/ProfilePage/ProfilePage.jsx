// import { useAuth } from "../../components/context/AuthContext.jsx";

// const ProfilePage = () => {
//   const { user, loading } = useAuth();

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <p>Please sign in to view your profile.</p>;

//   return (
//     <div>
//       <h1>Welcome, {user.displayName || "User"}!</h1>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// };
// export default ProfilePage;
import { useSelector } from "react-redux";
import { selectUser, selectIsLoading } from "../../redux/auth/selectors.js";

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectIsLoading);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div>
      <h1>
        Welcome, {user.name} {user.surname}!
      </h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Lessons Done: {user.lessons_done || 0}</p>
      <img
        src={user.avatar_url || "default-avatar.png"}
        alt="Profile"
        width="100"
      />
    </div>
  );
};

export default ProfilePage;
