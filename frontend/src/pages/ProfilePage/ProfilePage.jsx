import { useAuth } from "../../components/context/AuthContext.jsx";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <div>
      <h1>Welcome, {user.displayName || "User"}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};
export default ProfilePage;
