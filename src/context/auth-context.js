/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { app, database } from "../firbaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();  
  const auth = getAuth();
  useEffect(() =>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserData(user);
            navigate("/home");
          } else {
            setUserData(user);
              navigate("/");
          }
        });
  },[]);
return(
  <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>);
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth must be used inside provider");
  }
  return context;
};

export { AuthProvider, useAuth };
