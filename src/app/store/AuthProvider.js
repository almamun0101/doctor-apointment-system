"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser, loadUserFromStorage } from "../store/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from "../firebase.config";
export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    // Load from localStorage first (avoids mismatch)
    dispatch(loadUserFromStorage());

    // Sync with Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
