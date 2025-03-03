// import { createContext, useState, useEffect, useContext } from "react";
// import { auth } from "../../config/firebase.js";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { logout } from "../../services/firebaseService.js";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // const logout = async () => {
//   //   await signOut(auth);
//   //   setUser(null);
//   // };

//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
