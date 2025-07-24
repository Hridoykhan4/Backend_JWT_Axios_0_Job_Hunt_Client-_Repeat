import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import app from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  const forgetPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const signInUserByEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateNameInRegister = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };
        axios
          .post("https://job-er-mare-salam-server.vercel.app/jwt", user, { withCredentials: true })
          .then(() => {
            // console.log(res.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("https://job-er-mare-salam-server.vercel.app/logout", {}, { withCredentials: true })
          .then(() => {
            // console.log(res.data);
            setLoading(false)
          })
          .catch((err) => console.log(err));
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    updateNameInRegister,
    signInUserByEmail,
    forgetPass,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
