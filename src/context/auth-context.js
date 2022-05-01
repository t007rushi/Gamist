import { createContext, useContext, useEffect, useState } from "react";
// import { app, database } from "../firbaseConfig";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  // const auth = getAuth();
  // useEffect(() =>{
  //     (onAuthStateChanged(auth, (user) => {
  //         if (user) {
  //           console.log(user)
  //         } else {
  //             console.log("Signed Out")
  //         }
  //       })());
  // },[auth]);

  <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth must be used inside provider");
  }
  return context;
};

export { AuthProvider, useAuth };
