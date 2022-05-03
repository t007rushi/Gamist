import React from "react";
import { useAuth } from "../../context/auth-context";

export const Home = () => {
  
  const {userData} = useAuth();

  return (
    <div>
      {userData.displayName} you are
      Authorized in succesfully and {userData.email} is verified
    </div>
  );
};
