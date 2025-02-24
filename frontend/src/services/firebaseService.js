import { auth, db, googleProvider } from "../config/firebase"; // db - референс до Realtime Database
import { ref, set, get } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

// export const createUserDocument = async (user, additionalData = {}) => {
//   if (!user) return;

//   const userRef = ref(db, `users/${user.uid}`);

//   const snapshot = await get(userRef);
//   if (!snapshot.exists()) {
//     const { email, displayName } = user;
//     const createdAt = new Date().toISOString();

//     try {
//       await set(userRef, {
//         displayName: additionalData.username || displayName,
//         email,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.error("Error creating user document:", error);
//     }
//   }
// };

// export const signUpWithEmail = async (
//   email,
//   password,
//   username,
//   role = "user"
// ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     await updateProfile(user, { displayName: username });

//     await createUserDocument(user, { username, role });
//   } catch (error) {
//     console.error("Error during email sign-up:", error.message);
//     throw error;
//   }
// };

// export const signInWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error during email sign-in:", error.message);
//     throw error;
//   }
// };
// export const logout = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out successfully.");
//   } catch (error) {
//     console.error("Error logging out:", error.message);
//     throw error;
//   }
// };

// Вхід через Google
// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     const isNewUser = getAdditionalUserInfo(result).isNewUser;
//     if (isNewUser) {
//       await createUserDocument(user);
//     }
//     console.log("User signed in with Google:", user);
//   } catch (error) {
//     console.error("Google sign-in error:", error.message);
//     throw error;
//   }
// };

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

// export const signUpWithEmail = async (
//   email,
//   password,
//   username,
//   role = "user"
// ) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     await updateProfile(user, { displayName: username });
//     await createUserDocument(user, { username, role });
//   } catch (error) {
//     console.error("Sign-up error:", error.message);
//     throw error;
//   }
// };

// export const signInWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     return userCredential.user;
//   } catch (error) {
//     console.error("Sign-in error:", error.message);
//     throw error;
//   }
// };

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
