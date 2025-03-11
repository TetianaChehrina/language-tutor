import { useState } from "react";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import css from "./UserCard.module.css";

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={css.user_Card}>
      <div className={css.profile_Header}>
        <img className={css.avatar} src={user.avatar_url} alt="Profile" />
      </div>
      <h2>
        {user.name} {user.surname}
      </h2>
      <p>{user.email}</p>
      <button onClick={() => setIsEditing(!isEditing)}>Change Profile</button>
      {isEditing && <UpdateProfileForm onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default UserCard;
