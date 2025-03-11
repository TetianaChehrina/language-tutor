import { auth, db, googleProvider } from "../config/firebase";
import { ref, set, get } from "firebase/database";
import { signOut, signInWithPopup } from "firebase/auth";

export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = ref(db, `users/${user.uid}`);
  const snapshot = await get(userRef);

  if (!snapshot.exists()) {
    const { email, displayName } = user;
    const createdAt = new Date().toISOString();

    await set(userRef, {
      displayName: additionalData.username || displayName,
      email,
      createdAt,
      ...additionalData,
    });
  }
};

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User:", result.user);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};
