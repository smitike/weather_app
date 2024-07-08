import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// const AuthContex = React.createContext();

// export function useAuth(){
//     return useContext(AuthContex);
// }

// export function AuthProvider({ children }) {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userLoggedIn, setUserLoggedIn] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth, initializeUser);
//         return unsubscribe;
//     }, [])

//     async function initializeUser(user){ //if user is given, meaning logged in
//         if (user) {
//             setCurrentUser({ ...user });
//             setUserLoggedIn(true); //set logged in to true
//         } else { //if user was not given
//             setCurrentUser(null);
//             setUserLoggedIn(false);
//         }
//         setLoading(false);
//     }

//     const value = {
//         currentUser,
//         userLoggedIn,
//         loading
//     }
//     return ( //return value with that has the status
//         <AuthContex.Provider value={value}>
//             {!loading && children}
//         </AuthContex.Provider>
//     )
// }