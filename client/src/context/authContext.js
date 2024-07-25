import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
// });
const [currentUser, setCurrentUser] = useState(() => {
  const user = localStorage.getItem("user");
  // return user ? JSON.parse(user) : null;
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
});

  const login = async(inputs) => {
    //TO DO
   try{ const res= await axios.post("http://localhost:5500/api/auth/login",inputs,{
    withCredentials:true,
   });
   setCurrentUser(res.data);
  }catch(err)
  {
    console.log(err);
  }
};

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const currentUserString = JSON.stringify(currentUser);
    if (storedUser !== currentUserString) {
      localStorage.setItem("user", currentUserString);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};